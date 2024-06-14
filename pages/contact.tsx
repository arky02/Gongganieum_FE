import { useForm } from 'react-hook-form';

interface FormValues {
  password: string;
  newPassword: string;
  newPasswordCheck: string;
}

const Contact = () => {
  return (
    <main className='flex h-screen w-screen items-center justify-center'>
      <form className='border p-24'>
        <h1 className='text-4xl'>고객 문의</h1>
        <div className=''>
          <label htmlFor='contact-name' className='text-xl'>
            이름
          </label>
          <input
            id='contact-name'
            placeholder='이름'
            className='w-full rounded-lg border border-gray-300 p-8'
          />
        </div>
        <div className=''>
          <label htmlFor='contact-name' className='text-xl'>
            휴대폰 번호
          </label>
          <input
            id='contact-name'
            placeholder='휴대폰 번호'
            className='w-full rounded-lg border border-gray-300 p-8'
          />
        </div>
        <div className=''>
          <label htmlFor='contact-name' className='text-xl'>
            이메일
          </label>
          <input
            id='contact-name'
            placeholder='이메일'
            className='w-full rounded-lg border border-gray-300 p-8'
          />
        </div>
        <div className=''>
          <label htmlFor='contact-name' className='text-xl'>
            문의 내용
          </label>
          <input
            id='contact-name'
            placeholder='문의 내용'
            className='w-full rounded-lg border border-gray-300 p-8'
          />
        </div>
      </form>
    </main>
  );
};

export default Contact;
