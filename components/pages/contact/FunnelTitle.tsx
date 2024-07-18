const FunnelTitle = (props: { name: string }) => {
  const { name } = props;
  return (
    <div className='h-72'>
      <h1 className='pb-8 text-32 font-800'>고객 문의</h1>
      <p className='text-16 font-500 text-gray-300'>
        {name} 에 대한 문의를 작성하고 있습니다.
      </p>
    </div>
  );
};

export default FunnelTitle;
