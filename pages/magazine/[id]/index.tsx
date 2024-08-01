import { useQuery } from '@tanstack/react-query';
import DOMPurify from 'dompurify';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import { getAllMagazines, getMagazineContent } from 'apis/api';
import { MagazineType } from 'types/client.types';
import MetaTag from 'components/commons/MetaTag';

const MagazineDescriptionPage = () => {
  const router = useRouter();
  const pageId = Number(router.query.id);

  const { data: magazinesData } = useQuery<MagazineType[]>({
    queryKey: ['magazine'],
    queryFn: () => getAllMagazines(),
  });

  const { data: magazineContent } = useQuery<string>({
    queryKey: ['magazineDescription'],
    queryFn: () => getMagazineContent(pageId),
  });
  console.log(magazineContent);

  const magazine = magazinesData?.find((el) => el._id === pageId);

  const ref = useRef(false);

  useEffect(() => {
    ref.current = true;
  }, []);

  return (
    <>
      <MetaTag title='공간이음 | 매거진' />
      <div className='flex w-full flex-col'>
        {/* 히어로 배너 */}
        <div className='relative bg-[#000]'>
          {/* 오버레이 */}
          <div className='absolute inset-0 z-base bg-[#000] opacity-50'></div>
          {/* 사진 영역 */}
          <div
            className={`relative flex min-h-800 flex-col  items-center justify-center text-white md:min-h-[80dvh]`}
          >
            <img
              src={magazine?.img}
              alt='magazine'
              className='absolute left-0 top-0 h-full w-full object-cover'
            />
            <div className='z-base flex flex-col items-center justify-center gap-32 md:gap-20 md:p-24'>
              <span className='text-20 font-600'>{magazine?.cate}</span>
              <h1 className='text-[70px] font-700 md:text-24'>
                {magazine?.title}
              </h1>
              <span className='text-18 opacity-70'>
                {`${magazine?.date} | ${magazine?.writer}`}
              </span>
              {/* <p className='max-w-700 text-pretty text-center text-14 leading-10 md:min-w-full'>
                {
                  '매끄러운 메탈릭 골드 케이스와 대담한 컬러 팔레트 그리고 독창적인 텍스처. 입생로랑 뷰티 ‘루쥬 쀠르 꾸뛰르’와 뉴진스 민지는 여성이 더 아름답고, 강인하고, 담대하게 느끼도록 이끈다.'
                }
              </p> */}
            </div>
          </div>
        </div>
        {/* 상세 설명 */}
        <div className='my-28 flex min-h-1000 w-full flex-col items-center gap-40 md:px-20'>
          {/* 본문 */}
          {ref.current && (
            <div className='flex min-h-200 w-900 flex-col gap-20 text-16 leading-10 text-[#525559] md:w-full'>
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(magazineContent as string),
                }}
                className='text-16 leading-10'
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MagazineDescriptionPage;
