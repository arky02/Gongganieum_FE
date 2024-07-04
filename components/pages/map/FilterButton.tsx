import { CATEGORY_ICON } from 'constants/common';
import { useRouter } from 'next/router';
import { CategoryType } from 'types/client.types';

const FilterButton = (props: { category: CategoryType }) => {
  const { category } = props;

  const router = useRouter();
  const handleClick = () => {
    router.push(
      `/map?as=지역명&q=&order=&cate=${category == 'F&B' ? 'F%26B' : category}&isours=false`,
    );
  };

  return (
    <button
      type='button'
      onClick={handleClick}
      className='flex h-full items-center justify-center gap-8 rounded-full bg-white py-12 pl-16 pr-20 text-16 font-600 shadow-xl'
    >
      {CATEGORY_ICON[category]}
      {category}
    </button>
  );
};

export default FilterButton;
