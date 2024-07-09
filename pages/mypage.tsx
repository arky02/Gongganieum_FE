import { useQuery } from '@tanstack/react-query';
import { getLikeBuildings, getMyInfo } from 'apis/api';
import { BuildingType } from 'types/client.types';
import BuildingCard from 'components/commons/BuildingCard';
import MypageProfile from 'components/pages/mypage/MypageProfile';

const Mypage = () => {
  const userId = 1; // test ID

  const { data: userInfo } = useQuery({
    queryKey: ['userInfo', userId],
    queryFn: () => getMyInfo(userId),
  });

  const { data: likeBuildings }: { data?: BuildingType[] } = useQuery({
    queryKey: ['likeBuilding', userId],
    queryFn: () => getLikeBuildings(userId),
  });

  return (
    <div className='mx-auto my-76 flex max-w-1232 flex-col items-center md:my-56'>
      <MypageProfile
        nickname={userInfo?.nickname}
        email={userInfo?.email}
        introduction={userInfo?.description}
      />
      <div className='flex w-full flex-col gap-24 px-16 md:my-28'>
        <h1 className='mb-24 text-32 font-800'>내 찜 목록</h1>
        {/* 찜하기 카드 리스트 */}
        <div className='grid min-h-300 grid-cols-3 gap-x-24 gap-y-48 md:grid-cols-2 md:gap-x-8 md:gap-y-36'>
          {likeBuildings &&
            likeBuildings.length > 0 &&
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
          <BuildingCard
            mode='like'
            key={0}
            _id={0}
            name={'울집'}
            address={'경기도 과천'}
            isours={true}
            cate={'패션'}
            tag={'과천, 돈가스, 서울랜드'}
            latest_end_date={''}
          />
          <BuildingCard
            mode='like'
            key={0}
            _id={0}
            name={'울집'}
            address={'경기도 과천'}
            isours={true}
            cate={'패션'}
            tag={'과천, 돈가스, 서울랜드'}
            latest_end_date={''}
          />
        </div>
      </div>
    </div>
  );
};

export default Mypage;
