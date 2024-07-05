import HomeBanner from 'components/pages/home/HomeBanner';
import HomeCardSlider from 'components/pages/home/HomeCardSlider';
import HomeEditorRecommend from 'components/pages/home/HomeEditorRecommend';
import HomeMagazineSlider from 'components/pages/home/HomeMagazineSlider';
import HomeSliderWithPagination from 'components/pages/home/HomeSliderWithPagination';

const Home = () => {
  return (
    <div className='mb-76 mt-76 flex  flex-col items-center justify-center gap-76 md:mt-0'>
      <HomeSliderWithPagination mode='hero' />
      {/* <div>
        <h1 className='mb-24 text-32 font-800'>이번 주 핫한 건물</h1>
        <HomeCardSlider />
      </div> */}
      <HomeBanner />
      {/* <div>
        <h1 className='mb-24 text-32 font-800'>서울 성동구 인기 건물</h1>
        <HomeCardSlider />
      </div> */}
      <div className='grid h-760 w-full grid-cols-2 md:flex md:flex-col'>
        <HomeEditorRecommend />
        <HomeSliderWithPagination mode='recommend' />
      </div>
      {/* <div>
        <h1 className='mb-24 text-32 font-800'>인기 매거진 소개</h1>
        <HomeMagazineSlider />
      </div> */}
    </div>
  );
};

export default Home;
