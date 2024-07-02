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
