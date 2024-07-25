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

  const [editorValue, setEditorValue] = useState('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // CSR에서만 ReactQuill을 불러옴
  const ReactQuill = isClient ? require('react-quill') : () => false;

  // TODO: 출간하기 버튼 만들기
  return (
    <div className='mx-auto my-40 flex min-h-[70dvh] max-w-1000 flex-col items-center gap-20'>
      {/* 제목 입력란 */}
      <input
        placeholder='제목을 입력해주세요'
        spellCheck={false}
        className='h-80 w-full border-gray-200 text-[36px] font-700 placeholder:opacity-20 focus:border-gray-300 focus:outline-none'
      />
      {/* 작성자, 카테고리, 작성일 입력란*/}
      <div className='flex w-full items-center justify-between gap-24'>
        <input
          placeholder='작성자를 입력해주세요'
          spellCheck={false}
          className='h-32 w-1/2 rounded-12 text-[20px] font-500  placeholder:opacity-20 focus:border-gray-300 focus:outline-none'
        />
        <select className='rounded-12 border-r-8 border-transparent bg-[#f5f5f5] px-20 py-12 font-500 focus:outline-none'>
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
            theme='snow'
            formats={formats}
            modules={modules}
            value={editorValue}
            onChange={setEditorValue}
            placeholder='글을 작성해 주세요.'
            // style={{
            //   backgroundColor: '#fde8c99c',
            //   color: '#000',
            //   fonSize: 20,
            //   border: '1px solid transparent',
            //   minHeight: 400,
            //   borderRadius: 15,
            // }}
          />
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default EditorPage;
