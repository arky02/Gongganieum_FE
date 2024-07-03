import { AsType, CategoryType } from 'types/client.types';
import {
  IconBeauty,
  IconCharacter,
  IconEntertainment,
  IconEtc,
  IconFashion,
  IconFood,
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
  패션: <IconFashion />,
  뷰티: <IconBeauty />,
  'F&B': <IconFood />,
  캐릭터: <IconCharacter />,
  미디어: <IconEntertainment />,
  기타: <IconEtc />,
};

export const NO_IMAGE_URL = '/images/no-image.jpg';

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
