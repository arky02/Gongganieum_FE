import { ReactNode } from 'react';
import Footer from './Footer';
import Header from './Header';

const Layout = (props: { children: ReactNode }) => {
  const { children } = props;

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
