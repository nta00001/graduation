
import React, { useEffect } from 'react';
import { Image } from '../types';

interface ModalProps {
    image: Image | null;
    onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({ image, onClose }) => {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        if (image) {
            document.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'auto';
        };
    }, [image, onClose]);

    if (!image) return null;

    return (
        <div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100] backdrop-blur-sm p-4 animate-fade-in"
            onClick={onClose}
        >
            <div 
                className="relative bg-background-light dark:bg-background-dark rounded-lg shadow-2xl max-w-4xl max-h-[90vh] flex flex-col overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-auto object-contain flex-shrink"
                    style={{ maxHeight: 'calc(90vh - 4rem)' }}
                />
                <p className="p-4 text-center bg-white/50 dark:bg-black/20 text-text-light dark:text-text-dark font-semibold">
                    {image.alt}
                </p>
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 flex items-center justify-center h-10 w-10 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                    aria-label="Close image view"
                >
                    <span className="material-symbols-outlined">close</span>
                </button>
            </div>
            <style>{`
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .animate-fade-in {
                    animation: fade-in 0.3s ease-out;
                }
            `}</style>
        </div>
    );
};
