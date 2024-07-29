import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { postNewBuildingData } from 'apis/admin';
import { BuildingType } from 'types/client.types';
import RequiredStar from 'components/commons/RequiredStar';
import ImageInput from '../ImgInput';
import TextInput from '../TextInput';

type postBuildingType = Omit<
  BuildingType,
  '_id' | 'latest_end_date' | 'popups' | 'img'
>;

const CreateBuilding = () => {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<postBuildingType>();
  const [imgData, setImgData] = useState<File[] | null>(null);
  const [isFormValid, setIsFormValid] = useState(false);

  const handleFormSubmit: SubmitHandler<postBuildingType> = async (data) => {
    if (!isFormValid) return;
    const newBuildingFormData = new FormData();
    imgData?.map((el) => newBuildingFormData.append('file', el));
    newBuildingFormData.append('bodyFormData', JSON.stringify(data));

    try {
      const response = await postNewBuildingData(newBuildingFormData);
      if (response.status === 200)
        toast.success('성공적으로 건물을 등록하였습니다!');

      queryClient.invalidateQueries({ queryKey: ['buildingInfos'] });
    } catch {
      toast.error('문제가 발생하였습니다!');
    }
  };

  const validateForm = () => {
    if (!isValid || !imgData) {
      toast.error('필수 입력 필드 값을 모두 입력해주세요!');
      setIsFormValid(false);
      return;
    }
    setIsFormValid(true);
  };

  return (
    <div>
      <form
        className='flex w-600 flex-col'
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <div className='flex flex-col gap-28'>
          <TextInput
            register={{ ...register('name', { required: true }) }}
            label='건물 이름'
            isRequired
          />
          <TextInput
            register={{ ...register('address', { required: true }) }}
            label='건물 주소'
            isRequired
          />
          <TextInput
            register={{ ...register('coord', { required: true }) }}
            label='건물 좌표'
            isRequired
          />
          <TextInput
            register={{ ...register('tag') }}
            label='주요 팝업 이력 태그'
            placeholder='해당 건물의 주요 팝업 이력 입력 (ex: 젠틀몬스터, 무신사, 애플)'
          />
          <div className='flex w-full justify-between'>
            <div className='flex gap-4'>
              <h3 className='text-20 font-600'>직영 건물 여부</h3>
              <RequiredStar />
            </div>
            <div className='flex items-center'>
              <input
                {...register('is_ours', { required: true })}
                type='radio'
                value={'true'}
                id='is_ours_true'
                className='mr-8 h-20 w-20'
              />
              <label htmlFor='is_ours_true' className='text-16 font-600'>
                예
              </label>
              <input
                {...register('is_ours', { required: true })}
                type='radio'
                value={'false'}
                id='is_ours_false'
                className='ml-20 mr-8 h-20 w-20'
                checked
              />
              <label htmlFor='is_ours_false' className='text-16 font-600'>
                아니요
              </label>
            </div>
          </div>

          <div className='flex w-full justify-between'>
            <div className='flex gap-4'>
              <h3 className='text-20 font-600'>카테고리</h3>
              <RequiredStar />
            </div>
            <select
              {...register('cate', { required: true })}
              className='h-44 w-200 rounded-8 border-[2px] border-[#e7e7e7] px-12'
            >
              <option value=''>카테고리 선택</option>
              <option value='패션'>패션</option>
              <option value='뷰티'>뷰티</option>
              <option value='F&B'>F&B</option>
              <option value='캐릭터'>캐릭터</option>
              <option value='미디어'>미디어</option>
              <option value='기타'>기타</option>
            </select>
          </div>
          <div>
            <div className='-mb-32 flex gap-4'>
              <h3 className=' text-20 font-600'>건물 이미지</h3>
              <RequiredStar />
            </div>
            <ImageInput setImgFormData={setImgData} />
          </div>
          <button
            title='건물 저장'
            type='submit'
            className='flex h-44 w-full cursor-pointer items-center justify-center rounded-12 bg-black px-[15px] py-[12px] text-center text-18 font-500 text-white'
            onClick={validateForm}
          >
            건물 저장하기
          </button>
        </div>
      </form>
    </div>
  );
};
export default CreateBuilding;
