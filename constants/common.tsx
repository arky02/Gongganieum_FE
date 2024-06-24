import { AsType, CategoryType } from 'types/client.types';
import {
  IconArt,
  IconBeauty,
  IconCharacter,
  IconEntertainment,
  IconEtc,
  IconFashion,
  IconFinance,
  IconFood,
  IconIt,
  IconLife,
} from 'public/icons';

export const SEARCH_AS = ['지역명', '빌딩명', '팝업명'] as AsType[];

export const CATEGORY: CategoryType[] = [
  '패션',
  '뷰티',
  'F&B',
  '캐릭터',
  '미디어',
  '금융',
  '예술',
  '생활',
  'IT',
  '기타',
];

export const CATEGORY_ICON = {
  패션: <IconFashion />,
  뷰티: <IconBeauty />,
  'F&B': <IconFood />,
  캐릭터: <IconCharacter />,
  미디어: <IconEntertainment />,
  금융: <IconFinance />,
  예술: <IconArt />,
  생활: <IconLife />,
  IT: <IconIt />,
  기타: <IconEtc />,
};
