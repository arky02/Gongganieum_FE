import MypageProfile from 'components/pages/mypage/MypageProfile';

const Mypage = () => {
  return (
    <div className='mx-auto flex max-w-1232 flex-col items-center'>
      <MypageProfile
        nickname='민혁'
        email='songww1997@naver.com'
        introduction='처한 상황에 따라 변하는게 좋을 수 있다!
'
      />
      <div>내 찜 목록</div>
    </div>
  );
};

export default Mypage;
