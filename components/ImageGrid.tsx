
import React from 'react';
import { ImageCard } from './ImageCard';
import { Image } from '../types';

interface ImageGridProps {
    images: Image[];
    onImageClick: (image: Image) => void;
    onImageDelete?: (id: string) => void;
}

const distributeImages = (images: Image[], numColumns: number): Image[][] => {
    const columns: Image[][] = Array.from({ length: numColumns }, () => []);
    images.forEach((image, index) => {
        columns[index % numColumns].push(image);
    });
    return columns;
};

export const ImageGrid: React.FC<ImageGridProps> = ({ images, onImageClick, onImageDelete }) => {
    // This is a simplified approach for masonry-like layout with Tailwind.
    // We split images into columns.
    const columns = [
        distributeImages(images, 4)[0],
        distributeImages(images, 4)[1],
        distributeImages(images, 4)[2],
        distributeImages(images, 4)[3],
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {columns.map((column, colIndex) => (
                <div key={colIndex} className="grid gap-4">
                    {column.map((image) => (
                        <ImageCard 
                            key={image.id}
                            image={image}
                            onImageClick={onImageClick}
                            onDelete={onImageDelete}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};
