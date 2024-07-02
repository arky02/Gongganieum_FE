import HomeSlider from 'components/pages/home/HomeSlider';

export default function Home() {
  return (
    <div className='flex items-center justify-center'>
      {/* <Banner /> */}
      <div className=''>
        <h1 className='mb-24 text-32 font-800'>이번 주 핫한 건물</h1>
        <HomeSlider />
      </div>
    </div>
  );
}
