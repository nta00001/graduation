import React from 'react';
import { Page } from '../types';

interface HeaderProps {
    currentPage: Page;
    onNavigate: (page: Page) => void;
}

export const Header: React.FC<HeaderProps> = React.memo(({ currentPage, onNavigate }) => {
    const linkClasses = "px-4 py-2 text-sm font-semibold transition-colors rounded-md";
    const inactiveClasses = "text-subtle-light dark:text-subtle-dark hover:text-primary dark:hover:text-primary";
    const activeClasses = "text-primary dark:text-primary bg-primary/10";

    return (
        <header className="sticky top-0 z-50 w-full bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm border-b border-border-light dark:border-border-dark">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <button onClick={() => onNavigate('home')} className="flex items-center gap-3 cursor-pointer" aria-label="Go to homepage">
                        <span className="material-symbols-outlined text-primary text-2xl">school</span>
                        <h1 className="text-lg font-bold text-text-light dark:text-text-dark hidden sm:block">Chúc mừng tốt nghiệp!</h1>
                    </button>
                    <nav className="hidden md:flex items-center gap-2">
                        <button onClick={() => onNavigate('home')} className={`${linkClasses} ${currentPage === 'home' ? activeClasses : inactiveClasses}`}>
                            Trang chủ
                        </button>
                         <button onClick={() => onNavigate('gallery')} className={`${linkClasses} ${currentPage === 'gallery' ? activeClasses : inactiveClasses}`}>
                            Thư viện ảnh
                        </button>
                    </nav>
                    <div className="flex items-center gap-4">
                        <button className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors" aria-label="Share page">
                            <span className="material-symbols-outlined text-xl">share</span>
                        </button>
                        <button className="md:hidden flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors" aria-label="Open menu">
                            <span className="material-symbols-outlined text-xl">menu</span>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
});
