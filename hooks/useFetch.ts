import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { getFilteredBuildings } from 'apis/api';
import { AsType, CategoryType, OrderType } from 'types/client.types';
import useMarkers from './map/useMarkers';

const useFetch = (props: {
  as?: AsType;
  q?: string;
  order?: OrderType;
  cate?: CategoryType;
  isours?: boolean;
  mapFlag?: boolean;
}) => {
  const { as, q, order, cate, isours, mapFlag } = props;

  const { data: searchResult, refetch } = useQuery({
    queryKey: ['search', as, q, order, cate, isours],
    queryFn: () => getFilteredBuildings({ as, q, order, cate, isours }),
    enabled: !!q,
  });

  const { createMarkers, deleteMarkers } = useMarkers();

  const handleFetch = async () => {
    if (mapFlag) {
      deleteMarkers();
    }
    if (mapFlag && !q) {
      return;
    }

    const res = await refetch();
    const data = res.data;

    if (mapFlag && q) {
      createMarkers(data);
    }
  };

  useEffect(() => {
    handleFetch();
  }, [as, q, order, cate, isours]);

  return { searchResult, refetch: handleFetch };
};

export default useFetch;
