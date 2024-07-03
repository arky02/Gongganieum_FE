import HomeBanner from 'components/pages/home/HomeBanner';
import HomeCardCarousel from 'components/pages/home/HomeCardCarousel';
import HomeEditorRecommend from 'components/pages/home/HomeEditorRecommend';
import HomeMagazineSlider from 'components/pages/home/HomeMagazineSlider';
import HomeSlider from 'components/pages/home/HomeSlider';

export default function Home() {
  return (
    <div className='mb-76 mt-76 flex flex-col items-center justify-center gap-76'>
      <HomeSlider mode='hero' />
      <div>
        <h1 className='mb-24 text-32 font-800'>이번 주 핫한 건물</h1>
        <HomeCardCarousel />
      </div>
      <HomeBanner />
      <div>
        <h1 className='mb-24 text-32 font-800'>서울 성동구 인기 건물</h1>
        <HomeCardCarousel />
      </div>
      <div className='grid w-full grid-cols-2'>
        <HomeEditorRecommend />
        <HomeSlider mode='recommend' />
      </div>
      <div>
        <h1 className='mb-24 text-32 font-800'>인기 매거진 소개</h1>
        <HomeMagazineSlider />
      </div>
    </div>
  );
}
