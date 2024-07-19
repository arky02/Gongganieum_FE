import { AsType, CategoryType } from 'types/client.types';
import {
  IconBeauty,
  IconCharacter,
  IconEtc,
  IconFashion,
  IconFood,
  IconMedia,
} from 'public/icons';

export const SEARCH_AS = ['지역명', '빌딩명', '팝업명'] as AsType[];

export const CATEGORY: CategoryType[] = [
  '패션',
  '뷰티',
  'F&B',
  '캐릭터',
  '미디어',
  '기타',
];

export const CATEGORY_ICON = {
  패션: <IconFashion fill='#343E4B' />,
  뷰티: <IconBeauty fill='#343E4B' />,
  'F&B': <IconFood fill='#343E4B' />,
  캐릭터: <IconCharacter fill='#343E4B' />,
  미디어: <IconMedia fill='#343E4B' />,
  기타: <IconEtc fill='#343E4B' />,
};

export const CATEGORY_ICON_WHITE = {
  패션: <IconFashion fill='#fff' />,
  뷰티: <IconBeauty fill='#fff' />,
  'F&B': <IconFood fill='#fff' />,
  캐릭터: <IconCharacter fill='#fff' />,
  미디어: <IconMedia fill='#fff' />,
  기타: <IconEtc fill='#fff' />,
};

export const MARKER_ICON_SRC = {
  패션: {
    default: '/icons/fashion-pin.svg',
    popup: '/icons/fashion-popup-pin.svg',
    isours: '/icons/fashion-isours-pin.svg',
    search: '/icons/fashion-search-pin.svg',
  },
  뷰티: {
    default: '/icons/beauty-pin.svg',
    popup: '/icons/beauty-popup-pin.svg',
    isours: '/icons/beauty-isours-pin.svg',
    search: '/icons/beauty-search-pin.svg',
  },
  'F&B': {
    default: '/icons/food-pin.svg',
    popup: '/icons/food-popup-pin.svg',
    isours: '/icons/food-isours-pin.svg',
    search: '/icons/food-search-pin.svg',
  },
  캐릭터: {
    default: '/icons/character-pin.svg',
    popup: '/icons/character-popup-pin.svg',
    isours: '/icons/character-isours-pin.svg',
    search: '/icons/character-search-pin.svg',
  },
  미디어: {
    default: '/icons/media-pin.svg',
    popup: '/icons/media-popup-pin.svg',
    isours: '/icons/media-isours-pin.svg',
    search: '/icons/media-search-pin.svg',
  },
  기타: {
    default: '/icons/etc-pin.svg',
    popup: '/icons/etc-popup-pin.svg',
    isours: '/icons/etc-isours-pin.svg',
    search: '/icons/etc-search-pin.svg',
  },
};

export const NO_IMAGE_URL = '/images/no-image.png';

export const EMPTY_LIST_URL = '/images/listpage-empty-cart.png';

export const NOT_FOUND_PAGE_IMAGE_URL = '/images/404.png';

export const ROOT_IMAGE_URL =
  'https://poppop-bucket.s3.ap-northeast-2.amazonaws.com/';

export const BASE_URL = 'https://neul-pum.vercel.app/';
