import React, { useEffect, useMemo, useState } from 'react';
import 'react-quill/dist/quill.snow.css';

const formats = [
  'font',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'align',
  'color',
  'background',
  'size',
  'h1',
];

const EditorPage = () => {
  const modules = useMemo(
    () => ({
      toolbar: [
        [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
        [{ header: [1, 2, 3, 4, 5, 6, false] }],

        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'link', 'image'],

        [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],

        [{ color: [] }, { background: [] }], // dropdown with defaults from theme
        [{ align: [] }],

        ['clean'], // remove formatting button
      ],
    }),
    [],
  );

  const [value, setValue] = useState({
    title: '',
    writer: '',
    category: '',
  });
  const [editorValue, setEditorValue] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setValue((prevValue) => ({
      ...prevValue,
      [e.target.name]: e.target.value,
    }));
  };

  const [isClient, setIsClient] = useState(false);

  // CSR에서만 ReactQuill을 불러옴
  useEffect(() => {
    setIsClient(true);
  }, []);

  const ReactQuill = isClient ? require('react-quill') : () => false;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.title || !value.writer || !value.category || !editorValue) {
      alert('모든 항목을 입력해주세요.');
      return;
    }
    console.log(value);
    console.log(editorValue);
  };

  // TODO: 출간하기 버튼 만들기
  return (
    <div className='mx-auto my-40 flex min-h-[70dvh] max-w-1000 flex-col items-center gap-20'>
      {/* 제목 입력란 */}
      <div className='flex w-full items-center justify-between'>
        <input
          name='title'
          value={value.title}
          onChange={handleChange}
          placeholder='제목을 입력해주세요'
          spellCheck={false}
          className='h-80 w-full border-gray-200 text-[36px] font-700 placeholder:opacity-20 focus:border-gray-300 focus:outline-none'
        />
        <button
          onClick={handleSubmit}
          className='h-full whitespace-nowrap rounded-10 bg-black px-16 py-12 text-14 font-600 text-white'
        >
          작성하기
        </button>
      </div>
      {/* 작성자, 카테고리, 작성일 입력란*/}
      <div className='flex w-full items-center justify-between gap-24'>
        <input
          name='writer'
          value={value.writer}
          onChange={handleChange}
          placeholder='작성자를 입력해주세요'
          spellCheck={false}
          className='h-32 w-1/2 rounded-12 text-[20px] font-500  placeholder:opacity-20 focus:border-gray-300 focus:outline-none'
        />
        <select
          name='category'
          value={value.category}
          onChange={handleChange}
          className='rounded-12 border-r-8 border-transparent bg-[#f5f5f5] px-20 py-12 font-500 focus:outline-none'
        >
          <option>카테고리를 선택해주세요</option>
          <option>팝업 매거진</option>
          <option>공간 매거진</option>
          <option>인물 매거진</option>
        </select>
      </div>
      {/* 에디터 */}
      {isClient ? (
        <div className='min-w-1000 max-w-1232 pt-40'>
          <ReactQuill
            name='editor'
            theme='snow'
            formats={formats}
            modules={modules}
            value={editorValue}
            onChange={setEditorValue}
            placeholder='글을 작성해 주세요.'
          />
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};
export default EditorPage;
