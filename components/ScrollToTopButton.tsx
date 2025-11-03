
import React, { useState, useEffect } from 'react';

export const ScrollToTopButton: React.FC = React.memo(() => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    className="flex h-14 w-14 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-primary text-white shadow-lg hover:bg-primary/90 transition-all duration-300 transform hover:scale-110"
                    aria-label="Scroll to top"
                >
                    <span className="material-symbols-outlined text-2xl">arrow_upward</span>
                </button>
            )}
        </div>
    );
});
