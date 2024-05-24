import { GunguType } from 'constants/regions';

export interface PopupType {
  name: string;
  date: string;
  address: string;
  gungu: GunguType;
}

export const POPUP_MOCK_DATA: PopupType[] = [
  {
    name: '서울국제소싱페어',
    date: '23.11.29 - 23.12.01',
    address: '서울특별시 강남구 영동대로 513 코엑스 C홀',
    gungu: '강남구',
  },
  {
    name: '낼나 팝업스토어',
    date: '23.08.04 - 23.08.25',
    address: '서울특별시 마포구 동교로25길 54 데스커 디자인 스토어 1층',
    gungu: '마포구',
  },
  {
    name: '최고심: 고심약국',
    date: '23.03.01 - 23.04.30',
    address: '서울특별시 마포구 와우산로35길 13 오브젝트 서교점 1층',
    gungu: '마포구',
  },
  {
    name: 'YOZM 팝업 카페',
    date: '23.04.14 - 23.05.08',
    address: '서울특별시 성동구 연무장길 101-1, Cafe oude',
    gungu: '성동구',
  },
  {
    name: '라코스테 1933 팝업',
    date: '24.05.15 - 24.05.19',
    address: '서울특별시 성동구 연무장길 106 Platz2',
    gungu: '성동구',
  },
];
