import { BASE_URL } from 'constants/common';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import useLike from 'hooks/useLike';
import useOutsideClick from 'hooks/useOutsideClick';
import useSession from 'hooks/useSession';
import {
  IconGrayLike,
  IconKakaoLogo,
  IconLink,
  IconMarker,
  IconRedLike,
  IconShare,
} from 'public/icons';

const ContactBox = (props: {
  name: string;
  address: string;
  id: number;
  initialIsLiked: boolean;
}) => {
  const { name, address, id, initialIsLiked } = props;

  const { getSession } = useSession();
  const session = getSession();

  const router = useRouter();
  const url = BASE_URL + router.asPath;

  const ref = useRef(null);
  const [isShareVisible, setIsShareVisible] = useOutsideClick(ref, false);

  const handleShareWithKakao = () => {
    window.Kakao.Share.sendDefault({
      objectType: 'text',
      text: '공간이음에서 팝업 건물을 찾아보세요!',
      link: {
        webUrl: url,
      },
    });
    setIsShareVisible(false);
  };

  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY);
    }
  }, []);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
    } catch (err) {
      console.error(err);
      return;
    }
    setIsShareVisible(false);
  };

  const { isLiked, handleLike } = useLike({ id, initialIsLiked });

  return (
    <div
      ref={ref}
      className='sticky top-92 z-nav h-172 w-400 shrink-0 rounded-16 border border-[rgba(0,0,0,0.06)] bg-white p-24 shadow-lg md:fixed md:bottom-0 md:left-0 md:right-0 md:top-auto md:h-92 md:w-screen md:rounded-none'
    >
      <div className='h-44 pb-8 text-24 font-800 md:hidden'>{name}</div>
      <div className='flex h-40 items-center gap-8 pb-16 text-16 font-500 text-gray-400 md:hidden'>
        <IconMarker />
        {address}
      </div>
      <div className='flex h-44 gap-8'>
        <button
          onClick={handleLike}
          className='flex shrink-0 items-center justify-center rounded-full border border-[rgba(0,0,0,0.2)]'
        >
          {isLiked ? <IconRedLike /> : <IconGrayLike />}
        </button>
        <button
          onClick={() => setIsShareVisible((prev) => !prev)}
          className='flex h-44 w-44 shrink-0 items-center justify-center rounded-full border border-[rgba(0,0,0,0.2)]'
        >
          <IconShare />
        </button>
        <Link
          href={session ? `/contact/${id}` : '/login'}
          className='flex h-full w-full items-center justify-center rounded-8 bg-black text-16 font-700 text-white'
        >
          문의하기
        </Link>
      </div>
      {isShareVisible && (
        <div className='absolute -bottom-80 flex h-88 w-160 items-center justify-center gap-20 rounded-8 border border-[rgba(0,0,0,0.06)] bg-white p-12 pb-8 shadow-lg md:-top-76'>
          <button
            onClick={handleShareWithKakao}
            className='flex flex-col items-center gap-4 text-12 text-gray-300'
          >
            <div className='flex h-36 w-36 items-center justify-center rounded-8 bg-[#FEE500]'>
              <IconKakaoLogo />
            </div>
            카카오톡
          </button>
          <button
            onClick={handleCopyLink}
            className='flex flex-col items-center gap-4 text-12 text-gray-300'
          >
            <div className='flex h-36 w-36 items-center justify-center rounded-8 border border-gray-200 bg-gray-100'>
              <IconLink />
            </div>
            링크 복사
          </button>
        </div>
      )}
    </div>
  );
};

export default ContactBox;
