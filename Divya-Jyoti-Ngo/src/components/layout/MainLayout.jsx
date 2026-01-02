import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const MainLayout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col bg-neutral-50 font-sans text-neutral-900">
            <Navbar />
            <main className="flex-grow">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;
