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

export default function Home({
  userRole,
  accessToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const isSignUpNeeded = userRole?.user_role === 'GUEST';

  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(isSignUpNeeded);
  const [signUpStatus, setSignUpStatus] = useState('welcome');

  const onNextClick = () => {
    setSignUpStatus(() => 'signUp');
  };
  // return
  return (
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
  );
}
