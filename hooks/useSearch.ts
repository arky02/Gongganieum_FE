import { SEARCH_AS } from 'constants/common';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { AsType, CategoryType, OrderType } from 'types/client.types';

const useSearch = () => {
  const router = useRouter();

  const getQuery = () => {
    const q = Array.isArray(router.query['q'])
      ? router.query['q'][0]
      : router.query['q'] ?? '';

    const unparsedAs = Array.isArray(router.query['as'])
      ? router.query['as'][0]
      : router.query['as'] ?? '';
    const as = (SEARCH_AS as ReadonlyArray<string>).includes(unparsedAs)
      ? unparsedAs
      : SEARCH_AS[0];

    const order = Array.isArray(router.query['order'])
      ? router.query['order'][0]
      : router.query['order'] ?? '';

    const cate = Array.isArray(router.query['cate'])
      ? router.query['cate'][0]
      : router.query['cate'] ?? '';

    const unparsedIsours = Array.isArray(router.query['isours'])
      ? router.query['isours'][0]
      : router.query['isours'];
    const isours = unparsedIsours === 'true' ? true : false;

    const unparsedIsCurrent = Array.isArray(router.query['iscurrent'])
      ? router.query['iscurrent'][0]
      : router.query['iscurrent'];
    const iscurrent = unparsedIsCurrent === 'true' ? true : false;

    const unparsedIsLiked = Array.isArray(router.query['isliked'])
      ? router.query['isliked'][0]
      : router.query['isliked'];
    const isliked = unparsedIsLiked === 'true' ? true : false;

    const page = Array.isArray(router.query['page'])
      ? router.query['page'][0]
      : router.query['page'] ?? '';

    return { q, as, order, cate, isours, iscurrent, isliked, page } as {
      q: string;
      as: AsType;
      order: OrderType;
      cate: CategoryType | '전체';
      isours: boolean;
      iscurrent: boolean;
      isliked: boolean;
      page: string;
    };
  };

  const initialQuery = getQuery();

  const [q, setQ] = useState(initialQuery.q);
  const [as, setAs] = useState<AsType>(initialQuery.as);
  const [order, setOrder] = useState<OrderType>(initialQuery.order);
  const [cate, setCate] = useState<CategoryType | '전체'>(initialQuery.cate);
  const [isours, setIsours] = useState<boolean>(initialQuery.isours);
  const [iscurrent, setIscurrent] = useState<boolean>(initialQuery.iscurrent);
  const [isliked, setIsliked] = useState<boolean>(initialQuery.isliked);
  const [page, setPage] = useState<string>(initialQuery.page);

  useEffect(() => {
    if (!router.isReady || router.query['building']) {
      return;
    }
    router.push({
      query: { as, q, order, cate, isours, iscurrent, isliked, page },
    });
  }, [as, q, order, cate, isours, iscurrent, isliked, page]);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    const query = getQuery();
    setQ(query.q);
    setAs(query.as);
    setOrder(query.order);
    setCate(query.cate);
    setIsours(query.isours);
    setIscurrent(query.iscurrent);
    setIsliked(query.isliked);
    setPage(query.page);
  }, [router.query]);

  return {
    q,
    setQ,
    as,
    setAs,
    order,
    setOrder,
    cate,
    setCate,
    isours,
    setIsours,
    iscurrent,
    setIscurrent,
    isliked,
    setIsliked,
    page,
    setPage,
  };
};

export default useSearch;
