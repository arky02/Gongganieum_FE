import MagazineBanner from 'components/pages/magazine/MagazineBanner';
import MagazineCategory from 'components/pages/magazine/MagazineCategory';

const magazine = () => {
  return (
    <div className='my-48 flex flex-col items-center justify-center gap-40'>
      {/* 카테고리 */}
      <MagazineCategory />
      {/* 메인 배너 */}
      <MagazineBanner />
      {/* 매거진 리스트 그리드 형태 */}

      {/* 슬라이드 리스트 */}

      {/* 피플 나우 리스트 */}
    </div>
  );
};

export default magazine;
