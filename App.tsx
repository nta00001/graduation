import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { GalleryPage } from './components/GalleryPage';
import { Footer } from './components/Footer';
import { ScrollToTopButton } from './components/ScrollToTopButton';
import { Page } from './types';

const App: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<Page>('home');

    const handleNavigate = useCallback((page: Page) => {
        // Scroll to top for a better page transition experience
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setCurrentPage(page);
    }, []);

    return (
        <div className="relative flex min-h-screen w-full flex-col">
            <Header currentPage={currentPage} onNavigate={handleNavigate} />
            <main className="flex-grow">
                {currentPage === 'home' && <HomePage onNavigate={handleNavigate} />}
                {currentPage === 'gallery' && <GalleryPage />}
            </main>
            <Footer />
            <ScrollToTopButton />
        </div>
    );
};

export default App;
