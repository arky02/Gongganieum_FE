import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { getFilteredBuildings } from 'apis/api';
import { AsType } from 'types/client.types';
import useMarkers from './useMarkers';

const useFetch = (props: { as: AsType; q: string; mapFlag?: boolean }) => {
  const { as, q, mapFlag } = props;

  const { data: searchResult, refetch } = useQuery({
    queryKey: ['search', as, q],
    queryFn: () => getFilteredBuildings({ as, q }),
    enabled: !!q,
  });

  const { createMarkers, deleteMarkers } = useMarkers();

  const handleFetch = async () => {
    if (mapFlag) deleteMarkers();
    if (!q) {
      return;
    }

    const res = await refetch();
    const data = res.data;
    if (mapFlag) createMarkers(data);
  };

  useEffect(() => {
    handleFetch();
  }, [as, q]);

  return { searchResult, refetch: handleFetch };
};

export default useFetch;
