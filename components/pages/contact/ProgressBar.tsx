import { IconCheck } from 'public/icons';

const STYLE = {
  current: 'bg-black',
  done: 'bg-green',
  todo: 'bg-gray-400/35',
};

const ProgressBar = (props: { index: number }) => {
  const { index } = props;

  const getStyle = (step: number) => {
    if (step === index) {
      return STYLE.current;
    } else if (step > index) {
      return STYLE.todo;
    } else {
      return STYLE.done;
    }
  };

  return (
    <div className='flex w-full items-center gap-8'>
      <div className='flex shrink-0 items-center gap-8'>
        <div
          className={`flex h-24 w-24 items-center justify-center rounded-full text-white ${getStyle(0)}`}
        >
          {index > 0 ? <IconCheck /> : '1'}
        </div>
        <div className='text-16 font-700'>문의자 정보</div>
      </div>
      <Bar filled={index >= 1} />
      <div className='flex shrink-0 items-center gap-8'>
        <div
          className={`flex h-24 w-24 items-center justify-center rounded-full text-white ${getStyle(1)}`}
        >
          {index > 1 ? <IconCheck /> : '2'}
        </div>
        <div className='text-16 font-700'>사용 정보</div>
      </div>
      <Bar filled={index >= 2} />
      <div className='flex shrink-0 items-center gap-8'>
        <div
          className={`flex h-24 w-24 items-center justify-center rounded-full text-white ${getStyle(2)}`}
        >
          {index > 2 ? <IconCheck /> : '3 '}
        </div>
        <div className='text-16 font-700'>기타 정보</div>
      </div>
    </div>
  );
};

export default ProgressBar;

const Bar = (props: { filled: boolean }) => {
  const { filled } = props;
  return (
    <div className='h-[1.5px] w-full bg-gray-200'>
      <div
        className={`h-full transition-all duration-700 ${filled ? 'w-full bg-green/50' : 'w-0'}`}
      />
    </div>
  );
};
