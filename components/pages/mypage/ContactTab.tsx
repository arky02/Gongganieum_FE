import { useQuery } from '@tanstack/react-query';
import { getUserContact } from 'apis/api';
import MyContact from './MyContact';

const ContactTab = () => {
  const { data: contacts } = useQuery({
    queryKey: ['user', 'contact'],
    queryFn: getUserContact,
  });

  return (
    <div className='grid min-h-400 w-full grid-cols-2 gap-12'>
      {contacts?.map((contact) => (
        <MyContact key={contact._id} contact={contact} />
      ))}
    </div>
  );
};

export default ContactTab;
