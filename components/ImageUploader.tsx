
import React, { useRef, useState, useCallback } from 'react';

interface ImageUploaderProps {
    onImageUpload: (file: File) => void;
    isLoading: boolean;
}

export const ImageUploader: React.FC<ImageUploaderProps> = React.memo(({ onImageUpload, isLoading }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleFileSelect = (files: FileList | null) => {
        if (files && files[0]) {
            if (files[0].type.startsWith('image/')) {
                onImageUpload(files[0]);
            } else {
                alert("Please upload an image file.");
            }
        }
    };

    const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    }, []);

    const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        handleFileSelect(e.dataTransfer.files);
    }, [onImageUpload]);

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const baseClasses = "mb-10 p-6 border-2 border-dashed rounded-xl bg-white/50 dark:bg-black/20 text-center cursor-pointer hover:bg-primary/5 dark:hover:bg-primary/10 transition-all duration-300";
    const draggingClasses = "border-primary dark:border-primary scale-105 shadow-lg";
    const idleClasses = "border-border-light dark:border-border-dark hover:border-primary dark:hover:border-primary";

    return (
        <div 
            className={`${baseClasses} ${isDragging ? draggingClasses : idleClasses}`}
            onClick={handleClick}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={(e) => handleFileSelect(e.target.files)}
            />
            {isLoading ? (
                 <div className="flex flex-col items-center justify-center space-y-4 h-28">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                    <p className="font-semibold text-primary dark:text-primary">Generating caption...</p>
                 </div>
            ) : (
                <div className="flex flex-col items-center justify-center space-y-4 h-28">
                    <span className="material-symbols-outlined text-5xl text-primary">cloud_upload</span>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                        <p className="font-semibold text-text-light dark:text-text-dark">Kéo và thả ảnh của bạn vào đây</p>
                        <p className="text-subtle-light dark:text-subtle-dark">hoặc</p>
                    </div>
                    <button type="button" className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 transition-colors">Chọn tệp từ máy tính</button>
                </div>
            )}
        </div>
    );
});
