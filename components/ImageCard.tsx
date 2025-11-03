
import React from 'react';
import { Image } from '../types';

interface ImageCardProps {
    image: Image;
    onImageClick: (image: Image) => void;
}

export const ImageCard: React.FC<ImageCardProps> = React.memo(({ image, onImageClick }) => {
    const handleClick = () => {
        onImageClick(image);
    };

    return (
        <div 
            className="group relative overflow-hidden rounded-lg cursor-pointer shadow-md hover:shadow-xl transition-shadow duration-300"
            onClick={handleClick}
        >
            <img 
                className="h-auto w-full object-cover transition-transform duration-300 group-hover:scale-105" 
                src={image.src}
                alt={image.alt}
                loading="lazy"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center">
                <span className="material-symbols-outlined text-white text-4xl mb-2">zoom_in</span>
                <p className="text-white text-sm font-medium">{image.alt}</p>
            </div>
        </div>
    );
});
