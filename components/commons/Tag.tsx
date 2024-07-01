import { CATEGORY_ICON } from 'constants/common';
import { CategoryType } from 'types/client.types';
import { IconBuilding, IconFlag } from 'public/icons';

const TAG_STYLE = {
  일반: 'border border-gray-200 bg-white text-gray-300 font-500',
  직영: 'bg-black text-white font-700',
  팝업진행중: 'bg-green-light text-green font-700',
  카테고리: 'border border-gray-200 bg-[#F3F5F8] text-gray-400 font-700',
};

type TagType = '일반' | '직영' | '팝업진행중' | '카테고리';

const Tag = (props: { type?: TagType; text?: string }) => {
  const { type = '일반', text } = props;

  const renderText = () => {
    switch (type) {
      case '직영':
        return (
          <>
            <IconBuilding />
            <span>직영 건물</span>
          </>
        );
      case '팝업진행중':
        return (
          <>
            <IconFlag />
            <span>팝업 진행 중</span>
          </>
        );
      case '카테고리':
        const parsedText = ((text !== 'NULL' ? text : '기타') ??
          '기타') as CategoryType;
        return (
          <>
            {CATEGORY_ICON[(parsedText as CategoryType) ?? '기타']}
            <span>{parsedText}</span>
          </>
        );
      case '일반':
      default:
        return `#${text}`;
    }
  };

  return (
    <div
      className={`flex h-24 w-fit flex-shrink-0 items-center justify-center gap-4 rounded-4 px-4 text-12 ${TAG_STYLE[type]}`}
    >
      {renderText()}
    </div>
  );
};

export default Tag;
