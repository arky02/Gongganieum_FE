import * as cookie from 'cookie';
import { GetServerSidePropsContext } from 'next';

export const getCookieContent = (props: {
  context: GetServerSidePropsContext;
  name: string;
}) => {
  const { context, name } = props;
  if (!context.req.headers.cookie) return null;
  const cookieString = cookie.parse(context.req.headers.cookie);

  if (!cookieString[name]) return null;

  return cookieString[name];
};
