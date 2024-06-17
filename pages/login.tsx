import LoginBoxContainer from 'components/pages/login/LoginBoxContainer';

const login = () => {
  return (
    <div className="relative h-screen w-screen bg-[url('/images/LoginBackgroundImage.png')] bg-cover">
      <div className='h-full w-full bg-black opacity-70'></div>
      <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform'>
        <LoginBoxContainer />
      </div>
    </div>
  );
};

export default login;
