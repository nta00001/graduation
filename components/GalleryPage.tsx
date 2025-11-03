import React, { useState, useCallback, lazy, Suspense, useEffect } from 'react';
import { ImageUploader } from './ImageUploader';
import { ImageGrid } from './ImageGrid';
import { generateCaption } from '../services/geminiService';
import { Image } from '../types';

const Modal = lazy(() => import('./Modal').then(module => ({ default: module.Modal })));

const initialImages: Image[] = [
    { id: '1', src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZqNekz89pygJxcPQyLvBlFrKPJxKkJVKUHC5JKhtEglYXGLmP5bFcLb_mwaExJiaJbIJ_MRlaaMJk-LTj5hdM2K1WlOpeZy60-LE1xXsU3EhToo9mFOGHOf2w2JaEUcGi2iFYnSzqCxXOrbGLDCMDRnigvCrRMhQTL2sbJd_2mjZE6j1OkhrS_3SIh62HIWaygSLmnF2Sa8N1HOoGRwjI8cKz9bHRqgFvYwuwn63Xi6p1UiBIJd2g4kf1mVviZDRLtlmSJ5sO4hwC', alt: 'Sinh viên mặc áo tốt nghiệp cười rạng rỡ với bằng tốt nghiệp.' },
    { id: '2', src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuApOzlR0afgQ5pAfzi9XDgi0ipJIODVz0cr-MtfEufdDd49sThlDW66Oq2qjm5dHR8ZrGHL91qz5Hs-MCQnw7a4hVsMlsr1G3cBmxsAMtUYJptuekyDM_PlGMEPoC2exRQuy0gcJGWJRk8qb1sAWCT7i33qca12Ld5xpDYpz600Nfk6iWzhA3i6O5WObmzIPnybKn4L3kmQ-2Uquys93L05HdynuoiZtruH-LGVzfA0ZKd7e8hdD-NjOpMoHb7u8XzQRg-aVEE4zQJv', alt: 'Các tân khoa tung mũ lên trời.' },
    { id: '3', src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAVCLmXa5bVFd9C0jGUH-doHuZrnkFgXq5g5F72ba_wxpYNRQrMlQA9ajp_vlmnMfRoQ2ImHy1fmgzeZrTB0bnBXmBS7Z9jw6QQeLIkaW9LliaC68FVCdjd98dNTF-Th6z_hKjKQ-zz4eFF805IEHcAkZ-CVQDp389eQRUYS1BFU6HOaaJjT0bDvKll2Fk2qetp84KIpV7eNgoW5__1srYl9PtzNMopUHiml-6Zeg3LGR92KHZIn4MNTKR8-_lGXSkUkKzWjkwBeTmG', alt: 'Một nhóm sinh viên mặc áo tốt nghiệp chụp ảnh cùng nhau.' },
    { id: '4', src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBSOY97QY9xL5Iy3rMHEotUrckjkKs_SJbduvlMSMXQoRvgMF3Z2GVhSlPKFpqLAr9iz3nLCzIgfxg3ZVbsTX0WB4GmHUrNq0gKlgF7QY89Xx_sv64AF-yANX4IJrVEMRpdBcyRm6qRxUwjjzwYygKg7OADjqHiGB1DGyBHkFj7fbwiEjXR63LvwFoyn2SATA8m_giDRSEoxYgNwnZDRndu_mxsbkjrbxYzrmCGS7j8QVZ7qgKbqdt2YajTZEKWnmxIYQpL6FOa0BMT', alt: 'Sinh viên chăm chỉ học trong thư viện, khoảnh khắc nỗ lực.' },
    { id: '5', src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCbggRI5dT_67ks4vqKUPoMwFlDojT1xJfWsLaoJONH81hFceYXXeykS4jhAi13TIK7QtUDRLWQKe2P7Es2hXFfxgP-Pncu3C-ckMfV-0vLYT6BWzVGQaTaCPUpXcPnrtdSR1a4Ohrm5_6rRg9A8yKM7pXq_9GD-XXiaawSsf-JnOF95mfiJDUGq6uHwy0vocIjib8anDiu87NYKUQV1EFeXR4YfZ3au4T2wUJ_UbAT_Uo47O5mjR95jd6eMMJGHTAwSLQt2zf9w-BC', alt: 'Bạn bè cùng nhau ăn mừng tốt nghiệp ngoài trời.' },
    { id: '6', src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuClMVqt9snf2Vrke9HrZTK-TOGmuih6IvYcKcEFKAlyzgyjpB5wQjTpkn4LC-_h9NJ6O11kF6yjOW3Kj4yxjK7wkvQFh0WaPXW_w20MCYo_gEYK76cQRgr-ldFkwduN8BZPCyBFM9JFszlBM21gV3GvW7FFxFQR5_jbbQXKUNHgvkQfIz2ydHfRpjQpe04t_rrSJTMHSRFgyYvWY3p4GZj3CWObgy-0pXV0XF_wNALEWE88xiQnRftUGUN0BI6UgmdooPlWfpEshJVM', alt: 'Cận cảnh bằng tốt nghiệp và mũ tốt nghiệp.' },
    { id: '7', src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDHMjzVElOQxp7TPnbrTDAA7kYMG8yGjefUHbgBq67hDTpE-ZkTq4t-5xdqAelEDSW6NsAI-59hs04xuDaSKJfx18D8f5mhUnIab7nDyOs93XNrHl9mTiRaJ6nfx8EEMlN1C1IeoLfX-HNhvFF1Ibr2aQJhyTh140uPpRTLjBoXLUR_LeSj4RMjJT74a98qgf5_ly4Jz9yErz7-AftBVpwOVZMRgG5vRxhkcOMkIAMc0u3eSvKZWeglay592kXgl_Wf21mgOS_USTZc', alt: 'Tân khoa ôm chầm người thân trong khoảnh khắc xúc động.' },
    { id: '8', src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDRdVJRhBFKPqYhFOGXdis8SoGDAanzJCgednUi5aqNjFzZePd-ExX_GjXnIs3gzB6iBQCEB5WafgyUuSaZxd8kvyH8rkMjtavQV0r1AZiQCj2axiFo2hZH150vT2O4cgecsPl4JtxHyMRREf-o5YjspThPRggPi1vHuf725mCMJUd0PBF8530ESY9mi43Ln8QxFoXbGH2yWdb233MmCubAdbhooG5HCBrNAASqCFxlTnrgk4knAqRkebkkqcJ1u3J52CXntLvi_Bwy', alt: 'Chiếc bánh mừng tốt nghiệp đẹp mắt.' },
];


export const GalleryPage: React.FC = () => {
    const [images, setImages] = useState<Image[]>(initialImages);
    const [selectedImage, setSelectedImage] = useState<Image | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Load saved images from localStorage (persist uploaded images)
    useEffect(() => {
        try {
            const saved = localStorage.getItem('galleryImages');
            if (saved) {
                const parsed: Image[] = JSON.parse(saved);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    setImages(parsed);
                }
            }
        } catch (e) {
            console.warn('Could not parse saved gallery images', e);
        }
    }, []);

    const handleImageUpload = useCallback(async (file: File) => {
        setIsLoading(true);
        setError(null);

        // Read file as base64 for caption generation
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = async () => {
            try {
                const dataUrl = reader.result as string;
                const base64String = dataUrl.split(',')[1] || '';

                // Try to generate caption (optional)
                let caption = 'Khoảnh khắc tốt nghiệp mới vừa được tải lên.';
                try {
                    if (base64String) {
                        const generated = await generateCaption(base64String, file.type);
                        if (generated) caption = generated;
                    }
                } catch (captionErr) {
                    console.warn('Caption generation failed', captionErr);
                }

                // Upload to Cloudinary (unsigned preset)
                const meta: any = import.meta;
                const cloudName = meta.env?.VITE_CLOUDINARY_CLOUD_NAME;
                const uploadPreset = meta.env?.VITE_CLOUDINARY_UPLOAD_PRESET;

                if (!cloudName || !uploadPreset) {
                    throw new Error('Cloudinary not configured. Please set VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET in your .env file.');
                }

                const form = new FormData();
                form.append('file', file);
                form.append('upload_preset', uploadPreset);

                const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
                    method: 'POST',
                    body: form,
                });

                if (!res.ok) {
                    const text = await res.text();
                    throw new Error(`Cloudinary upload failed: ${res.status} ${text}`);
                }

                const json = await res.json();
                const secureUrl = json.secure_url as string | undefined;
                const publicId = json.public_id as string | undefined;
                console.log('CLOUD', (import.meta as any).env?.VITE_CLOUDINARY_CLOUD_NAME, (import.meta as any).env?.VITE_CLOUDINARY_UPLOAD_PRESET);
                if (!secureUrl) {
                    throw new Error('Cloudinary response did not include secure_url.');
                }

                const newImage: Image = {
                    id: publicId || new Date().toISOString(),
                    src: secureUrl,
                    alt: caption,
                };

                setImages(prev => {
                    const next = [newImage, ...prev];
                    try { localStorage.setItem('galleryImages', JSON.stringify(next)); } catch (e) { console.warn('Could not persist gallery images', e); }
                    return next;
                });
            } catch (err) {
                console.error('Error uploading image:', err);
                setError((err as Error).message || "Couldn't upload image. Try again.");

                // Fallback: show locally so user sees the image immediately
                const fallbackImage: Image = {
                    id: new Date().toISOString(),
                    src: URL.createObjectURL(file),
                    alt: 'Khoảnh khắc tốt nghiệp mới vừa được tải lên.',
                };
                setImages(prev => {
                    const next = [fallbackImage, ...prev];
                    try { localStorage.setItem('galleryImages', JSON.stringify(next)); } catch (e) { /* ignore */ }
                    return next;
                });
            } finally {
                setIsLoading(false);
            }
        };
        reader.onerror = () => {
            console.error('Error reading file.');
            setError('There was an error reading the file.');
            setIsLoading(false);
        };
    }, []);

    const handleImageClick = useCallback((image: Image) => {
        setSelectedImage(image);
    }, []);

    // Remove image from state and localStorage. This only removes from the client-side gallery.
    const handleDeleteImage = useCallback((id: string) => {
        setImages(prev => {
            const next = prev.filter(img => img.id !== id);
            try { localStorage.setItem('galleryImages', JSON.stringify(next)); } catch (e) { console.warn('Could not persist gallery images', e); }
            return next;
        });
        // Note: to remove from Cloudinary you must call a server-side endpoint (requires API secret). See notes below.
    }, []);

    const handleCloseModal = useCallback(() => {
        setSelectedImage(null);
    }, []);

    return (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <div className="text-center mb-10">
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-text-light dark:text-text-dark">Khoảnh khắc đáng nhớ</h2>
                <p className="mt-3 max-w-2xl mx-auto text-base text-subtle-light dark:text-subtle-dark">Hành trình đại học khép lại, mở ra một chương mới rực rỡ. Hãy cùng xem lại những khoảnh khắc tốt nghiệp của bạn nhé</p>
            </div>
            <ImageUploader onImageUpload={handleImageUpload} isLoading={isLoading} />
            {error && <p className="text-center text-red-500 my-4">{error}</p>}
            <ImageGrid images={images} onImageClick={handleImageClick} onImageDelete={handleDeleteImage} />
            <Suspense fallback={null}>
                <Modal image={selectedImage} onClose={handleCloseModal} />
            </Suspense>
        </div>
    );
};
