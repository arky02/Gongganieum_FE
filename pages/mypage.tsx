import { useQuery } from '@tanstack/react-query';
import { getLikeBuildings } from 'apis/api';
import { BuildingType } from 'types/client.types';
import BuildingCard from 'components/commons/BuildingCard';
import MypageProfile from 'components/pages/mypage/MypageProfile';

const Mypage = () => {
  // TODO: userId 넣기
  const { data: likeBuildings } = useQuery({
    queryKey: ['likeBuilding'], // userId 추가 예정
    queryFn: () => getLikeBuildings(1),
  });

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
          {/* {likeBuildings?.map((building: BuildingType) => (
            <BuildingCard
              key={building._id}
              mode='like'
              _id={building._id}
              name={building.name}
              address={building.address}
              isours={true}
              cate={building.cate}
              latest_end_date={building.latest_end_date}
            />
          ))} */}
        </div>
      </div>
    </div>
  );
};

export default Mypage;
