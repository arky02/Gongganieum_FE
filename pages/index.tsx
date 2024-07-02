import HomeBanner from 'components/pages/home/HomeBanner';
import HomeCardSlider from 'components/pages/home/HomeCardSlider';
import HomeEditorRecommend from 'components/pages/home/HomeEditorRecommend';
import HomeHeroSlider from 'components/pages/home/HomeHeroSlider';
import HomeMagazineSlider from 'components/pages/home/HomeMagazineSlider';

export default function Home() {
  return (
    <div className='mt-76 flex flex-col items-center justify-center gap-76'>
      <HomeHeroSlider />
      <div>
        <h1 className='mb-24 text-32 font-800'>이번 주 핫한 건물</h1>
        <HomeCardSlider />
      </div>
      <HomeBanner />
      <div>
        <h1 className='mb-24 text-32 font-800'>서울 성동구 인기 건물</h1>
        <HomeCardSlider />
      </div>
      <div className='flex w-full'>
        <HomeEditorRecommend />
        <HomeEditorRecommend />
      </div>
      <div>
        <h1 className='mb-24 text-32 font-800'>인기 매거진 소개</h1>
        <HomeMagazineSlider />
      </div>
    </div>
  );
}
