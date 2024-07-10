import { SubmitHandler, useForm } from 'react-hook-form';
import ConsentCheckBox from 'components/commons/ConsentCheckbox';
import Input from 'components/commons/Input';

interface FormValues {
  name: string;
  phoneNumber: string;
  email: string;
  content: string;
  agreed: boolean;
}

const Contact = () => {
  const { handleSubmit, control } = useForm<FormValues>({
    defaultValues: {
      name: '',
      phoneNumber: '',
      email: '',
      content: '',
      agreed: false,
    },
    mode: 'onBlur',
  });

  const submitContactUs: SubmitHandler<FormValues> = (formData) => {
    console.log(formData);
  };

  return (
    <main className='flex h-screen w-screen items-center justify-center'>
      <form onSubmit={handleSubmit(submitContactUs)} className='border p-24'>
        <h1 className='text-4xl'>고객 문의</h1>
        <Input name='name' placeholder='홍길동' control={control}>
          이름
        </Input>
        <Input name='phoneNumber' placeholder='010-1234-5678' control={control}>
          전화번호
        </Input>
        <Input name='email' placeholder='neulpum@gmail.com' control={control}>
          이메일
        </Input>
        <Input
          name='content'
          placeholder='문의 내용을 입력해주세요.'
          control={control}
        >
          문의 내용
        </Input>
        <ConsentCheckBox name='agreed' control={control} />
        <button className='border-gray-500 w-full border text-center'>
          제출하기
        </button>
      </form>
    </main>
  );
};

export default Contact;
