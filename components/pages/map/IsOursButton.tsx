import { useRouter } from 'next/router';

const IsOursButton = () => {
  const router = useRouter();
  const selected = router.query['isours'] === 'true';

  const handleClick = () => {
    const { q, as, cate } = router.query;
    if (selected) {
      router.push(`/map?as=${as}&q=${q}&order=&cate=${cate}&isours=false`);
    } else {
      router.push(`/map?as=${as}&q=${q}&order=&cate=${cate}&isours=true`);
    }
  };

  return (
    <button type='button' onClick={handleClick} className='h-full w-100 bg-red'>
      직영 건물
    </button>
  );
};

export default IsOursButton;
