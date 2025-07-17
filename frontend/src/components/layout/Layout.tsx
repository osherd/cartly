import Header from '../header/Header';
import Footer from '../footer/Footer';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      <div className='--pad' style={{ minHeight: '80vh' }}>
        {children}
      </div>
      <Footer />
    </>
  );
};

export default Layout;
