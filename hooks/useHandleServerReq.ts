import { useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { NextRouter } from 'next/router';
import toast from 'react-hot-toast';

const useHandleServerReq = ({ router }: { router: NextRouter }) => {
  const queryClient = useQueryClient();

  const handleServerReq = async ({
    reqFunc,
    toastMsg,
    toastErrorMsg,
    queryKey,
  }: {
    reqFunc: () => Promise<AxiosResponse<any, any>>;
    toastMsg: string;
    toastErrorMsg?: string;
    queryKey: string[];
  }) => {
    try {
      const response = await reqFunc();

      if (response.status !== 200) throw new Error();

      toast.success(toastMsg);
      queryClient.invalidateQueries({ queryKey });

      const returnBackConfirmed = confirm(
        '변경 사항이 성공적으로 반영되었습니다. 확인을 누르면 뒤로 이동합니다.',
      );
      if (returnBackConfirmed) router.back();
    } catch {
      toast.error(toastErrorMsg ?? '서버 오류가 발생하였습니다!');
    }
  };

  return { handleServerReq };
};

export default useHandleServerReq;
