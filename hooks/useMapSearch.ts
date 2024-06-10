import { SEARCH_AS } from 'constants/dropdown';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const useMapSearch = () => {
  const router = useRouter();

  const getQuery = () => {
    const q = Array.isArray(router.query['q'])
      ? router.query['q'][0]
      : router.query['q'] ?? '';

    const unparsedAs = Array.isArray(router.query['as'])
      ? router.query['as'][0]
      : router.query['as'] ?? '';
    const as = SEARCH_AS.includes(unparsedAs) ? unparsedAs : SEARCH_AS[0];

    return { q, as };
  };

  const initialQuery = getQuery();

  const [q, setQ] = useState(initialQuery.q);
  const [as, setAs] = useState<(typeof SEARCH_AS)[number]>(initialQuery.as);

  useEffect(() => {
    if (router.query['building']) {
      return;
    }
    router.push({ query: { as, q } });
  }, [as, q]);

  useEffect(() => {
    const query = getQuery();
    setQ(query.q);
    setAs(query.as);
  }, [router.query['q'], router.query['as']]);

  return { q, setQ, as, setAs };
};

export default useMapSearch;
