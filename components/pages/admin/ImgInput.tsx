import Image from 'next/image';
import {
  ChangeEvent,
  Dispatch,
  DragEvent,
  SetStateAction,
  useRef,
  useState,
} from 'react';
import CameraImg from 'public/images/add-image.png';

type ImageType = {
  name: string;
  url: string;
};

const ImageInput = (props: {
  setImgFormData: Dispatch<SetStateAction<File[] | null>>;
}) => {
  const { setImgFormData } = props;
  const [isDragging, setIsDragging] = useState(false);
  const [showImages, setShowImages] = useState<ImageType[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (files: FileList | null) => {
    const formData = new FormData();
    const fileList: File[] = [];
    if (!files) {
      console.log('선택된 파일이 없습니다');
      return;
    }
    for (let i = 0; i < files.length; i++) {
      // 중복된 사진은 무시
      if (!showImages.some((el) => el.name === files[i].name)) {
        // 이미지 프리뷰 설정
        setShowImages((prev) => [
          ...prev,
          { name: files[i].name, url: URL.createObjectURL(files[i]) },
        ]);
        console.log(files[i]);

        // FormData에 이미지 Append
        formData.append('file', files[i]);
        fileList.push(files[i]);
      }
    }
    setImgFormData(fileList);
  };

  const selectFile = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    handleFiles(files);
  };

  const deleteFile = (idx: number) => {
    setShowImages((prev) => prev.filter((_, i) => i !== idx));
    console.log(idx);
    // remove(idx);
  };

  const handleDragEnter = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDragOver = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    setIsDragging(true);
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleDrop = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    handleFiles(files);
  };

  return (
    <div className='flex w-full items-end justify-between'>
      <div className='mb-8 w-fit'>
        <input
          type='file'
          id='imageUpload'
          style={{ display: 'none' }}
          multiple={true}
          accept='image/*'
          onChange={selectFile}
          ref={inputRef}
        />
        <button
          role='button'
          className={`border-gray-20 tablet:h-131 tablet:w-full tablet:border-dashed tablet:border-black flex w-fit items-center justify-center rounded-10 border px-12 py-4 ${
            isDragging && 'bg-gray-30'
          }`}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => {
            inputRef.current?.click();
          }}
          type='button'
        >
          <Image
            src={CameraImg}
            alt='cameraIcon'
            className='mr-8'
            height={30}
            width={30}
          />
          <div className='pointer-events-none whitespace-nowrap'>
            {isDragging ? '이곳에 드롭해주세요' : '파일 드롭 혹은 선택'}
          </div>
        </button>
      </div>
      {/* Img Preview Section */}
      <div className='mt-8 flex h-[90px] max-w-400 gap-8 overflow-x-scroll'>
        {showImages.map((el, idx) => (
          <div className='rounded-lg max-w-90 relative aspect-square' key={idx}>
            <button
              className='bg-gray-900 z-10 absolute right-0 top-0 flex size-24 cursor-pointer items-center justify-center rounded-full text-white'
              onClick={() => deleteFile(idx)}
              type='button'
            >
              {/* <DeleteIcon /> */}
            </button>
            <Image
              draggable={false}
              src={el.url}
              alt={el.name}
              sizes='75px'
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageInput;
