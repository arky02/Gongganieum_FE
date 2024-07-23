import MagazineBanner from 'components/pages/magazine/MagazineBanner';
import MagazineCategory from 'components/pages/magazine/MagazineCategory';
import MagazineGridList from 'components/pages/magazine/MagazineGridList';

const magazine = () => {
  return (
    <div className='my-48 flex w-[100dvw] flex-col items-center justify-center gap-40 px-20'>
      {/* 카테고리 */}
      <MagazineCategory />
      {/* 메인 배너 */}
      <MagazineBanner />
      {/* 매거진 리스트 그리드 형태 */}
      <MagazineGridList />
      {/* 슬라이드 리스트 */}

      {/* 피플 나우 리스트 */}
    </div>
  );
};

export default magazine;
