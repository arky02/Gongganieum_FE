// TODO: 체크박스 패칭 함수 props으로 받아오기
const ListCheckBoxs = () => {
  return (
    <div className='flex gap-[10px] py-8'>
      <CheckBoxInput text='진행중인 팝업' />
      <CheckBoxInput text='직영 건물' />
    </div>
  );
};

export default ListCheckBoxs;

const CheckBoxInput = ({ text }: { text: string }) => (
  <div className='flex items-center justify-center gap-8'>
    <input
      type='checkbox'
      className='h-16	w-16 appearance-none rounded-4 border border-solid bg-gray-100 checked:border-0 checked:bg-[url("/icons/black-check.svg")] checked:bg-auto checked:bg-center checked:bg-no-repeat'
    />
    <span className='text-14 font-500'>{text}</span>
  </div>
);
