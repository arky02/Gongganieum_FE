import { useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import toast from 'react-hot-toast';

const useHandleServerReq = () => {
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
    } catch {
      toast.error(toastErrorMsg ?? '서버 오류가 발생하였습니다!');
    }
  };

  return { handleServerReq };
};

export default useHandleServerReq;
