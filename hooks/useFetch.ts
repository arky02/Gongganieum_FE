import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { getFilteredBuildings } from 'apis/api';
import { AsType, CategoryType, OrderType } from 'types/client.types';
import useMarkers from './map/useMarkers';

const useFetch = (props: {
  as?: AsType;
  q?: string;
  order?: OrderType;
  cate?: CategoryType | '전체';
  isours?: boolean;
  iscurrent?: boolean;
  page?: string;
  mapFlag?: boolean;
}) => {
  const { as, q, order, cate, isours, iscurrent, page, mapFlag } = props;

  const { createMarkers, deleteMarkers } = useMarkers();

  const router = useRouter();
  const handleFetch = async () => {
    const showDefaultMarkers =
      !q && (cate === '전체' || !cate) && isours === false;

    if (mapFlag && !router.query['building']) {
      deleteMarkers();
    }
    if (mapFlag && showDefaultMarkers) {
      return;
    }

    const data = await getFilteredBuildings({
      as,
      q,
      order,
      cate,
      isours,
      iscurrent,
      page,
    });

    if (mapFlag && !showDefaultMarkers) {
      createMarkers(data.result);
    }

    return data;
  };

  const { data: searchResult } = useQuery({
    queryKey: ['search', as, q, order, cate, isours, iscurrent, page],
    queryFn: handleFetch,
    enabled: !!cate,
  });

  return { searchResult };
};

export default useFetch;
