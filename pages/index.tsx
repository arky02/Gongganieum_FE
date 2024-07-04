import { QueryClient, dehydrate } from '@tanstack/react-query';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { getAccessTokenFromCookie } from 'utils/getAccessTokenFromCookie';
import { getUserRole } from 'apis/auth';
import PortalModal from 'components/commons/PortalModal';
import ProfileModal from 'components/modals/ProfileModal';
import WelcomeModal from 'components/modals/WelcomeModal';
import HomeBanner from 'components/pages/home/HomeBanner';
import HomeCardSlider from 'components/pages/home/HomeCardSlider';
import HomeEditorRecommend from 'components/pages/home/HomeEditorRecommend';
import HomeMagazineSlider from 'components/pages/home/HomeMagazineSlider';
import HomeSliderWithPagination from 'components/pages/home/HomeSliderWithPagination';

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  try {
    const accessToken = getAccessTokenFromCookie(context) ?? '';
    const queryClient = new QueryClient();

    let userRole: { user_role: string } = { user_role: '' };
    if (accessToken) {
      userRole = await queryClient.fetchQuery(getUserRole(accessToken));
    }

    return {
      props: { userRole, accessToken, dehydratedState: dehydrate(queryClient) },
    };
  } catch {
    return { notFound: true };
  }
};

const Home = ({
  userRole,
  accessToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const isSignUpNeeded = userRole?.user_role === 'GUEST';

  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(isSignUpNeeded);
  const [signUpStatus, setSignUpStatus] = useState('welcome');

  const onNextClick = () => {
    setSignUpStatus(() => 'signUp');
  };

  return (
    <div className='mb-76 mt-76 flex flex-col items-center justify-center gap-76'>
      <HomeSliderWithPagination mode='hero' />
      <div>
        <h1 className='mb-24 text-32 font-800'>이번 주 핫한 건물</h1>
        <HomeCardSlider />
      </div>
      <HomeBanner />
      <div>
        <h1 className='mb-24 text-32 font-800'>서울 성동구 인기 건물</h1>
        <HomeCardSlider />
      </div>
      <div className='grid w-full grid-cols-2'>
        <HomeEditorRecommend />
        <HomeSliderWithPagination mode='recommend' />
      </div>
      <div>
        <h1 className='mb-24 text-32 font-800'>인기 매거진 소개</h1>
        <HomeMagazineSlider />
      </div>
      <PortalModal openStatus={isSignUpModalOpen}>
        {signUpStatus === 'welcome' ? (
          <WelcomeModal handleNextClick={onNextClick}></WelcomeModal>
        ) : (
          <ProfileModal
            accessToken={accessToken}
            setIsModalOpen={setIsSignUpModalOpen}
          ></ProfileModal>
        )}
      </PortalModal>
    </div>
  );
};

export default Home;
