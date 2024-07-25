import { useRouter } from 'next/router';

const Footer = () => {
  const router = useRouter();
  const isVisible = router.pathname !== '/map';

  return (
    <>
      {isVisible && (
        <footer className='h-full w-full overflow-hidden border-t border-[#000]/5 bg-gray-100 py-60 md:py-20'>
          <div className='mx-auto max-w-1224 px-24 text-12 text-gray-300'>
            <div className='mb-12 flex gap-24 md:mb-32 md:flex-col md:gap-4'>
              <span>(주) 늘품내진이앤씨</span>
              <span className='text-nowrap'>
                주소: 강원도 춘천시 시청길10번길 4-2, 5층 (늘품내진이앤씨,
                성림빌딩)
              </span>
              <span>사업자등록번호: 398-87-01872</span>
            </div>
            <div className='flex gap-24 md:flex-col md:gap-4'>
              <span>대표번호: 033-242-9995/9996</span>
              <span>E-mail: songww1989@naver.com</span>
              <span>Blog: blog.naver.com/neulpumenc</span>
            </div>
          </div>
        </footer>
      )}
    </>
  );
};

export default Footer;
