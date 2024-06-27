const ListSortingButton = (props: {
  onSelected: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) => {
  const { onSelected } = props;
  return (
    <div className='px-16 py-8'>
      <select id='sort' className='outline-none' onChange={onSelected}>
        <option value='new'>최신순</option>
        <option value='popular'>인기순</option>
        <option value='likes'>관심순</option>
      </select>
    </div>
  );
};

export default ListSortingButton;
