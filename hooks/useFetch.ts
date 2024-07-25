import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { getIsDefaultMarkersVisible } from 'utils/getIsDefaultMarkersVisible';
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
  isliked?: boolean;
  page?: string;
  mapFlag?: boolean;
}) => {
  const { as, q, order, cate, isours, iscurrent, isliked, page, mapFlag } =
    props;

  const { createMarkers, deleteMarkers } = useMarkers();

  const router = useRouter();
  const handleFetch = async () => {
    if (mapFlag && !router.query['building']) {
      deleteMarkers();
    }
    const isDefaultVisible = getIsDefaultMarkersVisible({
      q,
      cate: cate ?? '전체',
      isours: isours ? String(isours) : 'false',
      iscurrent: iscurrent ? String(iscurrent) : 'false',
      isliked: isliked ? String(isliked) : 'false',
    });
    if (mapFlag && isDefaultVisible) {
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

    if (mapFlag && !isDefaultVisible) {
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
