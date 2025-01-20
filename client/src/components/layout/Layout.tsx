import React from 'react';
import { LayoutProps } from '../../models/layout';
import Header from './Header';
import Footer from './Footer';


const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div>
        <Header />
        <main style={{ minHeight: '80vh', padding: '20px' }}>{children}</main>
        <Footer />
        </div>
    );
};

export default Layout;