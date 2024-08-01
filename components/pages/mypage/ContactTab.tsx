import { useQuery } from '@tanstack/react-query';
import { EMPTY_LIST_URL } from 'constants/common';
import Image from 'next/image';
import { getUserContact } from 'apis/api';
import MyContact from './MyContact';

const ContactTab = () => {
  const { data: contacts } = useQuery({
    queryKey: ['user', 'contact'],
    queryFn: getUserContact,
  });

  return (
    <>
      {contacts?.length !== 0 ? (
        <div className='grid min-h-400 w-full grid-cols-2 gap-12'>
          {contacts?.map((contact) => (
            <MyContact key={contact._id} contact={contact} />
          ))}
        </div>
      ) : (
        <div className='flex h-[40dvh] w-full flex-col items-center justify-center gap-24'>
          <div className='relative h-152 w-152'>
            <Image
              src={EMPTY_LIST_URL}
              alt='비어있는 리스트 이미지'
              fill
              className='object-cover'
            />
          </div>
          <div className='flex flex-col items-center justify-center text-18'>
            <span>문의 내역이 없습니다.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default ContactTab;
