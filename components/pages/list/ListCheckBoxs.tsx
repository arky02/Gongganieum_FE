const ListCheckBoxs = (props: {
  onClickIsPopup: () => void;
  onClickOurs: () => void;
}) => {
  const { onClickIsPopup, onClickOurs } = props;
  return (
    <div className='flex gap-[10px] py-8'>
      <CheckBoxInput text='진행중인 팝업' onChange={onClickIsPopup} />
      <CheckBoxInput text='직영 건물' onChange={onClickOurs} />
    </div>
  );
};

export default ListCheckBoxs;

const CheckBoxInput = (props: { text: string; onChange: () => void }) => {
  const { text, onChange } = props;
  return (
    <div className='flex items-center justify-center gap-8'>
      <input
        type='checkbox'
        onChange={onChange}
        className='h-16	w-16 appearance-none rounded-4 border border-solid bg-gray-100 checked:border-0 checked:bg-[url("/icons/black-check.svg")] checked:bg-auto checked:bg-center checked:bg-no-repeat'
      />
      <span className='text-14 font-500'>{text}</span>
    </div>
  );
};
