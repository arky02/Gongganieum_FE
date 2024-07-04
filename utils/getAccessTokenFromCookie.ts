import * as cookie from 'cookie';
import { GetServerSidePropsContext } from 'next';

export const getAccessTokenFromCookie = (
  context: GetServerSidePropsContext,
) => {
  if (!context.req.headers.cookie) return null;
  const cookieString = cookie.parse(context.req.headers.cookie);

  if (!cookieString.access_token) return null;

  return cookieString.access_token;
};
