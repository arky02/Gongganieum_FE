import ListBuildingCard from 'components/pages/list/ListBuildingCard';
import MypageProfile from 'components/pages/mypage/MypageProfile';

const Mypage = () => {
  return (
    <div className='mx-auto my-76 flex max-w-1232 flex-col items-center'>
      <MypageProfile
        nickname='민혁'
        email='songww1997@naver.com'
        introduction='처한 상황에 따라 변하는게 좋을 수 있다!'
      />
      <div className='flex w-full flex-col gap-24 px-16'>
        <h1 className='mb-24 text-32 font-800'>내 찜 목록</h1>
        {/* 찜하기 카드 리스트 */}
        <div className='grid grid-cols-3 gap-x-24 gap-y-48'>
          {/* TODO: 카드컴포넌트 공용으로 빼기 */}
          <ListBuildingCard
            id={0}
            name={'노송 오재'}
            address={'전라도 전주시'}
            isours={true}
            cate={'뷰티'}
            latest_end_date={''}
          />
          <ListBuildingCard
            id={0}
            name={'노송 오재'}
            address={'전라도 전주시'}
            isours={true}
            cate={'뷰티'}
            latest_end_date={''}
          />
          <ListBuildingCard
            id={0}
            name={'노송 오재'}
            address={'전라도 전주시'}
            isours={true}
            cate={'뷰티'}
            latest_end_date={''}
          />
          <ListBuildingCard
            id={0}
            name={'노송 오재'}
            address={'전라도 전주시'}
            isours={true}
            cate={'뷰티'}
            latest_end_date={''}
          />
          <ListBuildingCard
            id={0}
            name={'노송 오재'}
            address={'전라도 전주시'}
            isours={true}
            cate={'뷰티'}
            latest_end_date={''}
          />
          <ListBuildingCard
            id={0}
            name={'노송 오재'}
            address={'전라도 전주시'}
            isours={true}
            cate={'뷰티'}
            latest_end_date={''}
          />
        </div>
      </div>
    </div>
  );
};

export default Mypage;
