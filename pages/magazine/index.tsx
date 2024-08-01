import { useQuery } from '@tanstack/react-query';
import { getAllMagazines } from 'apis/api';
import { MagazineType } from 'types/client.types';
import MetaTag from 'components/commons/MetaTag';
import MagazineBanner from 'components/pages/magazine/MagazineBanner';
import MagazineMainBanner from 'components/pages/magazine/MagazineMainBanner';
import MagazinePeopleList from 'components/pages/magazine/MagazinePeopleList';
import MagazinePopupList from 'components/pages/magazine/MagazinePopupList';
import MagazineSpaceList from 'components/pages/magazine/MagazineSpaceList';

const Magazine = () => {
  const { data: magazineData } = useQuery<MagazineType[]>({
    queryKey: ['magazine'],
    queryFn: () => getAllMagazines(),
  });

  // console.log(magazineData);

  const popupMagazine = magazineData
    ?.filter((el) => el.cate === '팝업 매거진')
    .slice(0, 5);
  const spaceMagazine = magazineData
    ?.filter((el) => el.cate === '공간 매거진')
    .slice(0, 4);
  const peopleMagazine = magazineData
    ?.filter((el) => el.cate === '인물 매거진')
    .slice(0, 3);

  console.log('popupMagazine', popupMagazine);
  console.log('spaceMagazine', spaceMagazine);
  console.log('peopleMagazine', peopleMagazine);

  return (
    <>
      <MetaTag title='공간이음 | 매거진' />
      <div className='mb-48 mt-20 flex w-[100dvw] flex-col items-center justify-center gap-60 md:mb-0 md:mt-0 md:w-[calc(100%)] md:gap-24'>
        {/* 카테고리 */}
        {/* <MagazineCategory /> */}
        {/* 메인 배너 */}
        <MagazineMainBanner />
        {/* 매거진 리스트 그리드 형태 */}
        <MagazinePopupList popupMagazine={popupMagazine} />
        {/* 배너 및 슬라이드 리스트 */}
        <MagazineBanner />
        <MagazineSpaceList spaceMagazine={spaceMagazine} />
        {/* 피플 나우 리스트 */}
        <MagazinePeopleList peopleMagazine={peopleMagazine} />
      </div>
    </>
  );
};

export default Magazine;
