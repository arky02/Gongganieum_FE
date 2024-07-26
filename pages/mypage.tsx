import { useQuery } from '@tanstack/react-query';
import { EMPTY_LIST_URL } from 'constants/common';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useSession from 'hooks/useSession';
import { getBuildings, getLikeBuildingIds, getMyInfo } from 'apis/api';
import { BuildingType, UserDataType } from 'types/client.types';
import BuildingCard from 'components/commons/BuildingCard';
import MetaTag from 'components/commons/MetaTag';
import PortalModal from 'components/commons/PortalModal';
import ProfileEditModal from 'components/commons/modals/ProfileEditModal';
import MypageProfile from 'components/pages/mypage/MypageProfile';

const Mypage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: userInfo }: { data?: UserDataType } = useQuery({
    queryKey: ['user', 'userInfo'],
    queryFn: () => getMyInfo(),
  });

  const { data: likeBuildingIds }: { data?: number[] } = useQuery({
    queryKey: ['user', 'likeBuildingIds'],
    queryFn: () => getLikeBuildingIds(),
  });

  const { data: buildings }: { data?: BuildingType[] } = useQuery({
    queryKey: ['buildings'],
    queryFn: () => getBuildings(),
  });

  const likeBuildings = buildings?.filter((el) => {
    return likeBuildingIds?.includes(el._id);
  });

  const handleClick = () => setIsModalOpen(!isModalOpen);

  const router = useRouter();
  const { getSession } = useSession();
  const session = getSession();

  useEffect(() => {
    if (!session) {
      router.push('/login');
    }
  }, []);

  console.log(likeBuildings);

  return (
    <>
      <MetaTag title='공간이음 | 마이페이지' />
      <div className='mx-auto my-76 flex max-w-1232 flex-col items-center md:my-56'>
        <MypageProfile
          profileImage={userInfo?.img as string}
          nickname={userInfo?.nickname}
          email={userInfo?.email}
          description={userInfo?.description}
          onClick={handleClick}
        />
        {/* 찜하기 카드 리스트 */}
        <div className='flex w-full flex-col gap-24 px-16 md:my-28'>
          <h1 className='mb-24 text-32 font-800'>내 찜 목록</h1>
          {likeBuildings?.length !== 0 ? (
            <div className='grid min-h-300 grid-cols-3 gap-x-24 gap-y-48 md:grid-cols-2 md:gap-x-8 md:gap-y-36'>
              {likeBuildings?.map((building: BuildingType) => (
                <BuildingCard
                  mode='like'
                  key={building._id}
                  _id={building._id}
                  building={building}
                  isLiked={likeBuildingIds?.includes(building._id)}
                />
              ))}
            </div>
          ) : (
            <div className='flex h-[40dvh] w-full flex-col items-center justify-center gap-24'>
              <div className='relative h-152 w-152'>
                <Image
                  src={EMPTY_LIST_URL}
                  alt='비어있는 리스트 이미지'
                  fill
                  className='object-cover'
                />
              </div>
              <div className='flex flex-col items-center justify-center text-18'>
                <span>아직 찜한 건물이 없습니다.</span>
              </div>
            </div>
          )}
        </div>
        <PortalModal openStatus={isModalOpen}>
          <ProfileEditModal
            setIsModalOpen={setIsModalOpen}
            userInfo={userInfo}
          />
        </PortalModal>
      </div>
    </>
  );
};

export default Mypage;
