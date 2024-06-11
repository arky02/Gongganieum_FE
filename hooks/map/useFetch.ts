import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { getSearchResult } from 'apis/api';
import { AsType } from 'types/client.types';

interface Props {
  as: AsType;
  q: string;
}

const useFetch = ({ as, q }: Props) => {
  const { data: searchResult, refetch } = useQuery({
    queryKey: ['search', as, q],
    queryFn: () => getSearchResult(as, q),
    enabled: !!q,
  });

  useEffect(() => {
    if (!q) {
      return;
    }
    refetch();
  }, [as, q]);

  return { searchResult };
};

export default useFetch;
