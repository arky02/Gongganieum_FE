import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/react';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { getBuildings } from 'apis/api';
import { instance } from 'apis/config/default';
import Button from 'components/commons/Button';
import ImagesInput from 'components/pages/admin/ImgInput';
import { IconArrowDown } from 'public/icons';

interface BdlgIDNameDictType {
  id: number;
  address: string;
}

const Admin = () => {
  const [imgFormData, setImgFormData] = useState<FormData | null>(null);
  const [bdlgIDNameDict, setBdlgIDNameDict] = useState<BdlgIDNameDictType[]>();
  const [selectedBdlg, setSelectedBdlg] = useState<BdlgIDNameDictType>({
    id: 0,
    address: '',
  });
  const [query, setQuery] = useState('');

  const filteredBuildingList =
    query === ''
      ? bdlgIDNameDict
      : bdlgIDNameDict?.filter((bdlg) => {
          return bdlg.address.toLowerCase().includes(query.toLowerCase());
        });

  const { data: buildingInfos } = useQuery({
    queryKey: ['buildingInfos'],
    queryFn: getBuildings,
  });

  const uploadFile = ({ file, id }: { file: FormData; id: number }) => {
    try {
      const result = instance.post(
        `/admin/edit/building?type=img&id=${id}`,
        file,
      );
      return result;
    } catch (e) {
      console.log(e);
    }
  };

  const handleSaveClick = async () => {
    const buildingId = selectedBdlg.id;
    if (!imgFormData) {
      console.log('No imgFormData!');
      return;
    }
    const res = await uploadFile({ file: imgFormData, id: buildingId });
    const imgCount = res?.data.img.split(',').length;
    if (res?.status === 200) {
      console.log('이미지 저장 성공!');
      toast.success(
        `${selectedBdlg.address} 건물 에 ${imgCount}개의 이미지를 성공적으로 저장하였습니다!`,
      );
    }

    console.log(`이미지 url list: ${res?.data.img}`);
    console.log(`업로드 한 이미지 개수: ${res?.data.img.split(',').length}`);
  };

  useEffect(() => {
    const bdlgIDNameDictTemp = buildingInfos?.map((buildingInfo) => ({
      id: buildingInfo._id,
      address: buildingInfo.address,
    }));

    setBdlgIDNameDict(bdlgIDNameDictTemp);
  }, [buildingInfos]);

  return (
    <div className='my-200 flex w-full flex-col items-center gap-[50px]'>
      <h1 className='text-[30px] font-700'>관리자 페이지</h1>
      <section>
        <div className='mb-20 flex items-center gap-[19px]'>
          <h3 className='text-[16px] font-600'>수정할 건물 선택</h3>
          <Combobox
            value={selectedBdlg}
            onChange={(value) =>
              setSelectedBdlg(value ?? { id: 0, address: '' })
            }
            onClose={() => setQuery('')}
          >
            <div className='relative'>
              <ComboboxInput
                className={
                  'rounded-md w-[300px] border-[2px] border-black px-20 py-8 text-[16px]'
                }
                style={{ borderRadius: 20 }}
                aria-label='Assignee'
                displayValue={(bdlg: BdlgIDNameDictType) => bdlg?.address}
                onChange={(event) => setQuery(event.target.value)}
              />
              <ComboboxButton className='px-2.5 group absolute inset-y-0 right-0'>
                <IconArrowDown className='size-4 fill-white/60 group-data-[hover]:fill-white' />
              </ComboboxButton>
            </div>
            <ComboboxOptions
              anchor='bottom'
              transition
              className={
                'rounded-xl p-1 w-[var(--input-width)] border border-white/5 bg-white/5 [--anchor-gap:var(--spacing-1)] empty:invisible'
              }
            >
              {filteredBuildingList?.map((bdlg) => (
                <ComboboxOption
                  key={bdlg.id}
                  value={bdlg}
                  className='gap-2 rounded-lg group flex cursor-default select-none items-center border-b-[1px] border-black bg-white px-8 py-4'
                >
                  <div className='text-sm/6'>{bdlg.address}</div>
                </ComboboxOption>
              ))}
            </ComboboxOptions>
          </Combobox>
        </div>
        <div className='mb-80 flex gap-20'>
          <h3 className='whitespace-nowrap text-[16px] font-600'>
            건물 이미지 첨부
          </h3>
          <ImagesInput setImgFormData={setImgFormData}></ImagesInput>
        </div>
      </section>
      <Button onClick={handleSaveClick}>서버 DB에 저장</Button>
    </div>
  );
};

export default Admin;
