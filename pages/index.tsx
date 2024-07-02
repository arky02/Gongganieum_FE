import HomeBanner from 'components/pages/home/HomeBanner';
import HomeSlider from 'components/pages/home/HomeSlider';

export default function Home() {
  return (
    <div className='flex flex-col items-center justify-center gap-76'>
      <div>
        <h1 className='mb-24 text-32 font-800'>이번 주 핫한 건물</h1>
        <HomeSlider />
      </div>
      <HomeBanner />
      <div>
        <h1 className='mb-24 text-32 font-800'>서울 성동구 인기 건물</h1>
        <HomeSlider />
      </div>
    </div>
  );
}
