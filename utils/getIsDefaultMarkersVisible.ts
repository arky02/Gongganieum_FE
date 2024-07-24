import { ParsedUrlQuery } from 'querystring';

export const getIsDefaultMarkersVisible = (query: ParsedUrlQuery) => {
  const isVisible =
    (!query['q'] &&
      (query['cate'] === '전체' || !query['cate']) &&
      query['isours'] === 'false' &&
      query['isliked'] === 'false') ||
    (query['building'] &&
      query['cate'] === '전체' &&
      !query['q'] &&
      query['isliked'] === 'false');

  return !!isVisible;
};
