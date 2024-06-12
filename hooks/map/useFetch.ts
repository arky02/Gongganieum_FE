import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { getSearchResult } from 'apis/api';
import { AsType } from 'types/client.types';
import useMarkers from './useMarkers';

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

  const { createMarkers, deleteMarkers } = useMarkers();

  const handleFetch = async () => {
    deleteMarkers();
    if (!q) {
      return;
    }

    const res = await refetch();
    const data = res.data;
    createMarkers(data);
  };

  useEffect(() => {
    handleFetch();
  }, [as, q]);

  return { searchResult, refetch: handleFetch };
};

export default useFetch;
