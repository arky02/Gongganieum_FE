import { useQuery } from '@tanstack/react-query';
import { getBuildings, getLikeBuildingIds, getMyInfo } from 'apis/api';
import { BuildingType } from 'types/client.types';
import BuildingCard from 'components/commons/BuildingCard';
import MypageProfile from 'components/pages/mypage/MypageProfile';

const Mypage = () => {
  const userId = 118; // test ID

  const { data: userInfo } = useQuery({
    queryKey: ['userInfo', userId],
    queryFn: () => getMyInfo(userId),
  });

  const { data: likeBuildingIds }: { data?: number[] } = useQuery({
    queryKey: ['likeBuildingIds', userId],
    queryFn: () => getLikeBuildingIds(userId),
  });

  const { data: buildings }: { data?: BuildingType[] } = useQuery({
    queryKey: ['buildings'],
    queryFn: () => getBuildings(),
  });

  const likeBuildings = buildings?.filter((el) => {
    return likeBuildingIds?.includes(el._id);
  });

  return (
    <div className='mx-auto my-76 flex max-w-1232 flex-col items-center md:my-56'>
      <MypageProfile
        nickname={userInfo?.nickname}
        email={userInfo?.email}
        introduction={userInfo?.description}
      />
      {/* 찜하기 카드 리스트 */}
      <div className='flex w-full flex-col gap-24 px-16 md:my-28'>
        <h1 className='mb-24 text-32 font-800'>내 찜 목록</h1>
        <div className='grid min-h-300 grid-cols-3 gap-x-24 gap-y-48 md:grid-cols-2 md:gap-x-8 md:gap-y-36'>
          {likeBuildings &&
            likeBuildings?.map((building: BuildingType) => (
              <BuildingCard
                mode='like'
                key={building._id}
                _id={building._id}
                name={building.name}
                address={building.address}
                isours={true}
                cate={building.cate}
                latest_end_date={building.latest_end_date}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Mypage;
