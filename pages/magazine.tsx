import MagazineBanner from 'components/pages/magazine/MagazineBanner';
import MagazineCategory from 'components/pages/magazine/MagazineCategory';
import MagazineGridList from 'components/pages/magazine/MagazineGridList';
import MagazineListWithBackground from 'components/pages/magazine/MagazineListWithBackground';
import MagazineMainBanner from 'components/pages/magazine/MagazineMainBanner';
import MagazineSlideList from 'components/pages/magazine/MagazineSlideList';

const magazine = () => {
  return (
    <div className='my-48 flex w-[100dvw] flex-col items-center justify-center gap-40'>
      {/* 카테고리 */}
      <MagazineCategory />
      {/* 메인 배너 */}
      <MagazineMainBanner />
      {/* 매거진 리스트 그리드 형태 */}
      <MagazineGridList />
      {/* 배너 및 슬라이드 리스트 */}
      <MagazineBanner />
      <MagazineSlideList />
      {/* 피플 나우 리스트 */}
      <MagazineListWithBackground />
    </div>
  );
};

export default magazine;
