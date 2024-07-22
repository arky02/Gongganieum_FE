import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { MouseEvent, useState } from 'react';
import { postLikeToggle } from 'apis/api';
import { ERROR_TYPE } from 'types/client.types';
import useSession from './useSession';

const QUERY_KEY = 'likeBuildingIds';

const useLike = (props: { initialIsLiked: boolean; id: number }) => {
  const { initialIsLiked, id } = props;
  const queryClient = useQueryClient();
  const { removeSession } = useSession();
  const [isLiked, setIsLiked] = useState(initialIsLiked);

  const likeMutation = useMutation({
    mutationFn: () => postLikeToggle(id),
    onMutate: async () => {
      const prevStatus = queryClient.getQueryData([QUERY_KEY]);

      console.log(prevStatus);

      return;

      if (prevStatus) {
        await queryClient.cancelQueries({
          queryKey: [QUERY_KEY],
        });

        // queryClient.setQueryData(
        //   [QUERY_KEY],
        //   (prev: Res_Get_Type['eventLike']) => ({
        //     status: !prev.status,
        //     likeCount: prev.status ? prev.likeCount - 1 : prev.likeCount + 1,
        //   }),
        // );

        return prevStatus;
      }

      return { status: initialLike, likeCount: initialLikeCount };
    },
    onError: (error: AxiosError<{ error: ERROR_TYPE }>) => {
      const errorMessage = error.response?.data.error;
      if (errorMessage === 'USER_SESSION_EXPIRED') {
        removeSession({
          redirectUri: '/login',
          toastMessage: '세션이 만료되었습니다. 다시 로그인해주세요',
          toastType: 'error',
        });
      } else {
        removeSession({
          redirectUri: '/login',
          toastMessage: '로그인이 필요한 기능입니다.',
          toastType: 'error',
        });
      }
    },
  });

  const handleLike = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
    likeMutation.mutate();
  };

  return { isLiked, handleLike };
};

export default useLike;
