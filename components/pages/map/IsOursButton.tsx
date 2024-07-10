import { useRouter } from 'next/router';

const IsOursButton = () => {
  const router = useRouter();
  const selected = router.query['isours'] === 'true';

  const handleClick = () => {
    const { q = '', as = '지역명', cate = '전체' } = router.query;
    router.push(`/map?as=${as}&q=${q}&order=&cate=${cate}&isours=${!selected}`);
  };

  return (
    <button type='button' onClick={handleClick} className='h-full w-100 bg-red'>
      직영 건물
    </button>
  );
};

export default IsOursButton;
