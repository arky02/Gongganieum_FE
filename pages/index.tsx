import { useEffect, useState } from 'react';
import { requestUserRole } from 'apis/auth';
import PortalModal from 'components/commons/PortalModal';
import ProfileModal from 'components/modals/ProfileModal';
import WelcomeModal from 'components/modals/WelcomeModal';
import HomeBanner from 'components/pages/home/HomeBanner';
import HomeCardSlider from 'components/pages/home/HomeCardSlider';
import HomeEditorRecommend from 'components/pages/home/HomeEditorRecommend';
import HomeMagazineSlider from 'components/pages/home/HomeMagazineSlider';
import HomeMobileBuildingCardSlider from 'components/pages/home/HomeMobileBuildingCardSlider';
import HomeMobileMagazineSlider from 'components/pages/home/HomeMobileMagazineSlider';
import HomeSliderWithPagination from 'components/pages/home/HomeSliderWithPagination';

const Home = () => {
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [signUpStatus, setSignUpStatus] = useState('welcome');

  const onNextClick = () => {
    setSignUpStatus(() => 'signUp');
  };

  useEffect(() => {
    const reqUserRole = async () => {
      const roleRes = await requestUserRole();

      // roleRes = "GUEST" | "USER" | "SIGNED_OUT"
      const isSignUpNeeded = roleRes === 'GUEST';

      setIsSignUpModalOpen(isSignUpNeeded);
    };

    reqUserRole();
  }, []);

  return (
    <div className='mb-76 mt-76 flex  flex-col items-center justify-center gap-76 md:mb-24 md:mt-0 md:items-start md:gap-24'>
      <HomeSliderWithPagination mode='main_banner' />
      <div className='md:mx-24'>
        <h1 className='mb-24 text-32 font-800 md:mb-16 md:text-24'>
          이번 주 핫한 건물
        </h1>
        <HomeCardSlider mode='primary' />
        <HomeMobileBuildingCardSlider mode='primary' />
      </div>
      <HomeBanner />
      <div className='md:mx-24'>
        <h1 className='mb-24 text-32 font-800 md:mb-16 md:text-24'>
          서울 성동구 인기 건물
        </h1>
        <HomeCardSlider mode='secondary' />
        <HomeMobileBuildingCardSlider mode='secondary' />
      </div>
      <div className='grid h-full w-full grid-cols-2 md:flex md:flex-col'>
        <HomeEditorRecommend />
        <HomeSliderWithPagination mode='recommend_banner' />
      </div>
      <div className='md:mx-24'>
        <h1 className='mb-24 text-32 font-800 md:mb-16 md:text-24'>
          인기 매거진 소개
        </h1>
        <HomeMagazineSlider />
        <HomeMobileMagazineSlider />
      </div>
      <PortalModal openStatus={isSignUpModalOpen}>
        {signUpStatus === 'welcome' ? (
          <WelcomeModal handleNextClick={onNextClick}></WelcomeModal>
        ) : (
          <ProfileModal setIsModalOpen={setIsSignUpModalOpen} />
        )}
      </PortalModal>
    </div>
  );
};

export default Home;
