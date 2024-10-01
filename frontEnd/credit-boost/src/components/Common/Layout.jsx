import React from 'react';
import Footer from './Footer';
import Header from './Navbar';

const Layout = ({ children }) => {
    return (
        <div className="bg-white dark:bg-gray-900">
            <Header />
            {children}
            <Footer />

        </div>

    );
};

export default Layout;
