import { UserContactType } from 'types/client.types';

const MyContactModal = (props: {
  buildingName: string | undefined;
  addedDate: string;
  contact: UserContactType;
}) => {
  const { buildingName, addedDate, contact } = props;
  return (
    <div className='flex h-440 w-600 flex-col gap-24 overflow-y-auto rounded-24 bg-white p-32 md:w-[90dvw] md:min-w-360 md:p-24'>
      {buildingName && (
        <div className='flex items-end gap-12'>
          <span className='text-24 font-600'>{buildingName} 문의내역</span>
          <span className='pb-4 text-12 text-gray-300'>{addedDate}</span>
        </div>
      )}
      <div className='flex flex-col gap-4'>
        <ContactItem title='이름' value={contact?.name} />
        <ContactItem title='휴대폰 번호' value={contact?.phone} />
        <ContactItem title='이메일' value={contact?.email} />
        <ContactItem title='회사명/단체명' value={contact?.company} />
        <ContactItem title='일정' value={contact?.date1} />
        <ContactItem
          title='차순위 일정'
          value={contact?.date2 === ' ~ ' ? undefined : contact?.date2}
        />
        <ContactItem title='사용 목적' value={contact?.reason} />
        <ContactItem title='희망 면적' value={contact?.size} />
        <ContactItem title='희망 지역' value={contact?.areaList} />
        <ContactItem title='요청사항' value={contact?.requests} />
      </div>
    </div>
  );
};

export default MyContactModal;

const ContactItem = (props: { title: string; value?: string }) => {
  const { title, value } = props;
  return (
    <div className='flex'>
      <div className='w-160 text-16 font-500'>{title}:</div>
      <div className='ml-auto w-full'>
        {value && value.length > 0 ? value : '-'}
      </div>
    </div>
  );
};
