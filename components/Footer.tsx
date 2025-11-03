
import React from 'react';

export const Footer: React.FC = React.memo(() => {
    const copyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
    };

    return (
        <footer className="w-full bg-background-light dark:bg-background-dark border-t border-border-light dark:border-border-dark mt-auto">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-subtle-light dark:text-subtle-dark text-center sm:text-left">© 2024 Chúc mừng tốt nghiệp. All rights reserved.</p>
                    <div className="group relative">
                        <button className="flex items-center gap-2 rounded-lg bg-primary/10 px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary/20">
                            <span className="material-symbols-outlined text-xl">share</span>
                            <span>Chia sẻ</span>
                        </button>
                        <div className="absolute bottom-full mb-2 right-0 w-48 origin-bottom-right rounded-lg bg-background-light dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 transition-all scale-95 opacity-0 pointer-events-none group-hover:scale-100 group-hover:opacity-100 group-hover:pointer-events-auto group-focus-within:scale-100 group-focus-within:opacity-100 group-focus-within:pointer-events-auto">
                            <div className="py-1">
                                <a className="flex items-center gap-3 px-4 py-2 text-sm text-text-light dark:text-text-dark hover:bg-gray-100 dark:hover:bg-gray-700" href="#">
                                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20"><path clipRule="evenodd" d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" fillRule="evenodd"></path></svg>
                                    <span>Facebook</span>
                                </a>
                                <button onClick={copyLink} className="flex w-full items-center gap-3 px-4 py-2 text-sm text-text-light dark:text-text-dark hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <span className="material-symbols-outlined text-xl">link</span>
                                    <span>Sao chép link</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
});
