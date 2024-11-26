import React from 'react';
import Footer from './Footer';
import Navbar from './Navbar';

const Layout = ({ children }) => {
    return (
        <div className="bg-white dark:bg-gray-900">            
            <Navbar />
            {children}
            <Footer />

        </div>

    );
};

export default Layout;
