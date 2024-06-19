import { CATEGORY, CATEGORY_ICON } from 'constants/common';
import { CategoryType, PopupType } from 'types/client.types';
import DescriptionCard from './DescriptionCard';

const PopupRankingCard = (props: { popups: PopupType[] }) => {
  const { popups } = props;
  const ranking = getPopupRanking(popups);

  return (
    <DescriptionCard title='팝업 히스토리 순위'>
      <div className='flex flex-col gap-16'>
        {ranking.map((el, i) => (
          <Ranking key={i} data={el} rank={i} />
        ))}
      </div>
    </DescriptionCard>
  );
};

export default PopupRankingCard;

const Ranking = (props: { data: [CategoryType, number]; rank: number }) => {
  const { data, rank } = props;
  return (
    <div className='flex items-center gap-8'>
      <div className='flex h-24 w-28 items-center justify-center rounded-[0.6rem] bg-[#000] bg-opacity-10 text-12 font-700'>
        {rank + 1}위
      </div>
      <div className='flex items-center gap-4'>
        {CATEGORY_ICON[data[0]]}
        <span className='text-16 font-500'>{data[0]}</span>
      </div>
      <div className='ml-auto text-gray-300'>{data[1]}%</div>
    </div>
  );
};

const getPopupRanking = (popups: PopupType[]) => {
  const typeRatio = getTypeRatio(popups);
  const ranking = getRanking(typeRatio);
  return ranking as [CategoryType, number][];
};

const getTypeRatio = (popups: PopupType[]) => {
  const typeRatio: { [type: string]: number } = {};

  popups.forEach((popup) => {
    let type = popup.type;
    switch (type) {
      case 'it':
        type = 'IT';
        break;
      case '게임':
      case '완구':
        type = '생활';
        break;
      case '화장품':
        type = '뷰티';
        break;
      case '미술':
        type = '예술';
        break;
      case '만화':
        type = '캐릭터';
        break;
    }
    if (!CATEGORY.includes(type as CategoryType)) {
      type = '기타';
    }

    typeRatio[type] ? typeRatio[type]++ : (typeRatio[type] = 1);
  });

  return typeRatio;
};

const getRanking = (typeRatio: { [type: string]: number }) => {
  let totalCnt = 0;
  const sorted: [string, number][] = [];

  for (const type in typeRatio) {
    sorted.push([type, typeRatio[type]]);
    totalCnt += typeRatio[type];
  }

  sorted.sort((a, b) => b[1] - a[1]);

  const ranking = sorted
    .slice(0, 3)
    .map((el) => [el[0], Math.round((el[1] / totalCnt) * 100)]);

  return ranking;
};
