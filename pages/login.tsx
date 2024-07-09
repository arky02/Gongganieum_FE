import LoginBox from 'components/pages/login/LoginBox';

const Login = () => {
  return (
    <div className="relative h-screen w-screen bg-[url('/images/login-background-image.png')] bg-cover">
      <div className='h-full w-full bg-black opacity-70'></div>
      <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform'>
        <LoginBox />
      </div>
    </div>
  );
};

export default Login;
