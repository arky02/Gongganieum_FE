import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect } from 'react';
import { AsType } from 'types/client.types';

interface Props {
  as: AsType;
  q: string;
}

const useFetch = ({ as, q }: Props) => {
  const queryClient = useQueryClient();

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
  const res = await axios(
    `http://ec2-3-23-49-89.us-east-2.compute.amazonaws.com:8080/api/building/search?as=${as}q=${q}`,
  );

  return res.data;
};
