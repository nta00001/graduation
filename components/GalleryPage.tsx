import React, { useState, useCallback, lazy, Suspense } from 'react';
import { ImageUploader } from './ImageUploader';
import { ImageGrid } from './ImageGrid';
import { generateCaption } from '../services/geminiService';
import { Image } from '../types';

const Modal = lazy(() => import('./Modal').then(module => ({ default: module.Modal })));

const initialImages: Image[] = [
    { id: '1', src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZqNekz89pygJxcPQyLvBlFrKPJxKkJVKUHC5JKhtEglYXGLmP5bFcLb_mwaExJiaJbIJ_MRlaaMJk-LTj5hdM2K1WlOpeZy60-LE1xXsU3EhToo9mFOGHOf2w2JaEUcGi2iFYnSzqCxXOrbGLDCMDRnigvCrRMhQTL2sbJd_2mjZE6j1OkhrS_3SIh62HIWaygSLmnF2Sa8N1HOoGRwjI8cKz9bHRqgFvYwuwn63Xi6p1UiBIJd2g4kf1mVviZDRLtlmSJ5sO4hwC', alt: 'Student in graduation gown smiling with a diploma.' },
    { id: '2', src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuApOzlR0afgQ5pAfzi9XDgi0ipJIODVz0cr-MtfEufdDd49sThlDW66Oq2qjm5dHR8ZrGHL91qz5Hs-MCQnw7a4hVsMlsr1G3cBmxsAMtUYJptuekyDM_PlGMEPoC2exRQuy0gcJGWJRk8qb1sAWCT7i33qca12Ld5xpDYpz600Nfk6iWzhA3i6O5WObmzIPnybKn4L3kmQ-2Uquys93L05HdynuoiZtruH-LGVzfA0ZKd7e8hdD-NjOpMoHb7u8XzQRg-aVEE4zQJv', alt: 'Graduates throwing caps in the air.' },
    { id: '3', src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAVCLmXa5bVFd9C0jGUH-doHuZrnkFgXq5g5F72ba_wxpYNRQrMlQA9ajp_vlmnMfRoQ2ImHy1fmgzeZrTB0bnBXmBS7Z9jw6QQeLIkaW9LliaC68FVCdjd98dNTF-Th6z_hKjKQ-zz4eFF805IEHcAkZ-CVQDp389eQRUYS1BFU6HOaaJjT0bDvKll2Fk2qetp84KIpV7eNgoW5__1srYl9PtzNMopUHiml-6Zeg3LGR92KHZIn4MNTKR8-_lGXSkUkKzWjkwBeTmG', alt: 'A group of students in graduation gowns posing for a photo.' },
    { id: '4', src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBSOY97QY9xL5Iy3rMHEotUrckjkKs_SJbduvlMSMXQoRvgMF3Z2GVhSlPKFpqLAr9iz3nLCzIgfxg3ZVbsTX0WB4GmHUrNq0gKlgF7QY89Xx_sv64AF-yANX4IJrVEMRpdBcyRm6qRxUwjjzwYygKg7OADjqHiGB1DGyBHkFj7fbwiEjXR63LvwFoyn2SATA8m_giDRSEoxYgNwnZDRndu_mxsbkjrbxYzrmCGS7j8QVZ7qgKbqdt2YajTZEKWnmxIYQpL6FOa0BMT', alt: 'Student studying in a library, a moment of dedication.' },
    { id: '5', src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCbggRI5dT_67ks4vqKUPoMwFlDojT1xJfWsLaoJONH81hFceYXXeykS4jhAi13TIK7QtUDRLWQKe2P7Es2hXFfxgP-Pncu3C-ckMfV-0vLYT6BWzVGQaTaCPUpXcPnrtdSR1a4Ohrm5_6rRg9A8yKM7pXq_9GD-XXiaawSsf-JnOF95mfiJDUGq6uHwy0vocIjib8anDiu87NYKUQV1EFeXR4YfZ3au4T2wUJ_UbAT_Uo47O5mjR95jd6eMMJGHTAwSLQt2zf9w-BC', alt: 'Friends celebrating graduation together outdoors.' },
    { id: '6', src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuClMVqt9snf2Vrke9HrZTK-TOGmuih6IvYcKcEFKAlyzgyjpB5wQjTpkn4LC-_h9NJ6O11kF6yjOW3Kj4yxjK7wkvQFh0WaPXW_w20MCYo_gEYK76cQRgr-ldFkwduN8BZPCyBFM9JFszlBM21gV3GvW7FFxFQR5_jbbQXKUNHgvkQfIz2ydHfRpjQpe04t_rrSJTMHSRFgyYvWY3p4GZj3CWObgy-0pXV0XF_wNALEWE88xiQnRftUGUN0BI6UgmdooPlWfpEshJVM', alt: 'Close-up of a graduation diploma and cap.' },
    { id: '7', src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDHMjzVElOQxp7TPnbrTDAA7kYMG8yGjefUHbgBq67hDTpE-ZkTq4t-5xdqAelEDSW6NsAI-59hs04xuDaSKJfx18D8f5mhUnIab7nDyOs93XNrHl9mTiRaJ6nfx8EEMlN1C1IeoLfX-HNhvFF1Ibr2aQJhyTh140uPpRTLjBoXLUR_LeSj4RMjJT74a98qgf5_ly4Jz9yErz7-AftBVpwOVZMRgG5vRxhkcOMkIAMc0u3eSvKZWeglay592kXgl_Wf21mgOS_USTZc', alt: 'Graduate hugging a family member in a heartfelt moment.' },
    { id: '8', src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDRdVJRhBFKPqYhFOGXdis8SoGDAanzJCgednUi5aqNjFzZePd-ExX_GjXnIs3gzB6iBQCEB5WafgyUuSaZxd8kvyH8rkMjtavQV0r1AZiQCj2axiFo2hZH150vT2O4cgecsPl4JtxHyMRREf-o5YjspThPRggPi1vHuf725mCMJUd0PBF8530ESY9mi43Ln8QxFoXbGH2yWdb233MmCubAdbhooG5HCBrNAASqCFxlTnrgk4knAqRkebkkqcJ1u3J52CXntLvi_Bwy', alt: 'A beautiful cake celebrating the graduation milestone.' },
];


export const GalleryPage: React.FC = () => {
    const [images, setImages] = useState<Image[]>(initialImages);
    const [selectedImage, setSelectedImage] = useState<Image | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleImageUpload = useCallback(async (file: File) => {
        setIsLoading(true);
        setError(null);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = async () => {
            try {
                const base64String = (reader.result as string).split(',')[1];
                if (!base64String) {
                    throw new Error("Failed to read file.");
                }

                const caption = await generateCaption(base64String, file.type);
                const newImage: Image = {
                    id: new Date().toISOString(),
                    src: URL.createObjectURL(file),
                    alt: caption,
                };
                setImages(prev => [newImage, ...prev]);
            } catch (err) {
                console.error("Error processing image:", err);
                setError("Couldn't generate a caption. Please try another image.");
                const newImage: Image = {
                    id: new Date().toISOString(),
                    src: URL.createObjectURL(file),
                    alt: "A newly uploaded graduation memory.",
                };
                setImages(prev => [newImage, ...prev]);
            } finally {
                setIsLoading(false);
            }
        };
        reader.onerror = () => {
             console.error("Error reading file.");
             setError("There was an error reading the file.");
             setIsLoading(false);
        };
    }, []);

    const handleImageClick = useCallback((image: Image) => {
        setSelectedImage(image);
    }, []);

    const handleCloseModal = useCallback(() => {
        setSelectedImage(null);
    }, []);

    return (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <div className="text-center mb-10">
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-text-light dark:text-text-dark">Khoảnh khắc đáng nhớ</h2>
                <p className="mt-3 max-w-2xl mx-auto text-base text-subtle-light dark:text-subtle-dark">Hành trình đại học khép lại, mở ra một chương mới rực rỡ.</p>
            </div>
            <ImageUploader onImageUpload={handleImageUpload} isLoading={isLoading} />
            {error && <p className="text-center text-red-500 my-4">{error}</p>}
            <ImageGrid images={images} onImageClick={handleImageClick} />
            <Suspense fallback={null}>
                <Modal image={selectedImage} onClose={handleCloseModal} />
            </Suspense>
        </div>
    );
};
