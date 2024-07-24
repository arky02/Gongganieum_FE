import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useLikedMarkers from 'hooks/map/useLikedMarkers';
import useSession from 'hooks/useSession';
import { BuildingType } from 'types/client.types';
import { IconHeart } from 'public/icons';

const LikedButton = (props: { buildings: BuildingType[] }) => {
  const { buildings } = props;
  const router = useRouter();
  const selected = router.query['isliked'] === 'true';
  const { getSession } = useSession();
  const session = getSession();

  const handleClick = () => {
    if (!session) {
      router.push('/login');
      return;
    }
    router.push(
      `/map?as=지역명&q=&order=&cate=전체&isours=false&iscurrent=false&isliked=${!selected}&page=`,
    );
  };

  useLikedMarkers(buildings);

  useEffect(() => {
    if (!session) {
      const { as, q, cate, isours } = router.query;
      router.push(
        `/map?as=${as ?? '지역명'}&q=${q ?? ''}&order=&cate=${cate ?? '전체'}&isours=${isours ?? 'false'}&iscurrent=false&isliked=false&page=`,
      );
    }
  }, []);

  return (
    <button
      type='button'
      onClick={handleClick}
      className={`flex h-full shrink-0 items-center gap-8 rounded-full pl-16 pr-20 text-16 font-600 shadow-lg md:pl-12 md:pr-16 md:text-14 ${selected ? 'bg-black text-white' : 'bg-white text-black'}`}
    >
      <IconHeart fill='red' />
      찜한 건물
    </button>
  );
};

export default LikedButton;
