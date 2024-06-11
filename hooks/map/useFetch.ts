import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { instance } from 'apis/config/default';
import { AsType } from 'types/client.types';

interface Props {
  as: AsType;
  q: string;
}

const useFetch = ({ as, q }: Props) => {
  const { data: searchResult, refetch } = useQuery({
    queryKey: ['search', as, q],
    queryFn: () => getSearchResult(as, q),
  });

  useEffect(() => {
    refetch();
  }, [as, q]);

  return { searchResult };
};

export default useFetch;

const getSearchResult = async (as: AsType, q: string) => {
  const res = await instance.get('/building/search', {
    params: {
      as,
      q,
    },
  });

  return res.data;
};
