import React from 'react';
import { Page } from '../types';

interface HomePageProps {
    onNavigate: (page: Page) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
    return (
        <>
            <div className="relative w-full h-[60vh] md:h-[70vh] bg-cover bg-center bg-no-repeat flex items-center justify-center text-center text-white" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url("https://lh3.googleusercontent.com/aida-public/AB6AXuCTaPiHSbTNO_5YJtZvUVz06keszb1mEtBFPWy_kOoaWb1q13apaFi0t80zxB95ZDipf5dOCzofrW7b4x8CRL0pv8C_YOiarg_mTosb7fuj1QH7m8h03g-ueUR-8Z1PiD3rlHSXGRtPRx8Kg1G8vA-vv6btCDkSRKi_SlOBlDGBhs1lk4qJgbY6KYO6UFNE-w_C9LaQ_JbZA3pws52_cIe6gP-alZU9MuNhJFXI5ZEQ9VhKsb19HPGBE59cvqr75WhQNM_Tty094D_e")` }}>
                <div className="max-w-3xl px-4 py-8">
                    <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-tight drop-shadow-lg">
                        Chúc Mừng Tốt Nghiệp!
                    </h1>
                    <p className="mt-4 text-lg md:text-xl text-slate-200 drop-shadow-md">
                        Hành trình vạn dặm bắt đầu bằng một bước chân. Hôm nay, bạn đã hoàn thành một chặng đường tuyệt vời. Tự hào về bạn!
                    </p>
                </div>
            </div>
            <div className="mx-auto max-w-4xl px-4 py-12 sm:py-20 relative">
                <div className="vietnamese-pattern absolute inset-0 opacity-50 z-0"></div>
                <div className="relative z-10 flex flex-col items-center text-center gap-12">
                    <div className="flex flex-col items-center gap-6">
                        <img alt="Smiling face icon" className="w-20 h-20" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_z-C7C8Yejc6hMuPIyJJTMvjDFT-CwXNRgqmzSwezMwcGGqGT5tHCTSCpN3j-Fq-JA3677FyGpum5Y_ZomcaDN-NPNrZvwO4rcvbEZT4xxv8QLk9v2a7MqsxonlmJfn1HXgsINBJBfsmImsxmMAO2gdV7tLbYI_LQzetDNb6w549qh0CxuxvqyGjB5Cbk9CLPULLO7QAdkfZGU_UP8qHRrESyTqx9ckPRzjnVhD4Mo2Jge71vJhWZ_7lav9paf07Xk9Ms5kuVn6Yh" />
                        <h2 className="text-text-light dark:text-white text-3xl font-bold leading-tight tracking-[-0.015em]">
                            A Message from the Heart
                        </h2>
                        <p className="text-subtle-light dark:text-subtle-dark text-base font-normal leading-relaxed max-w-2xl">
                            Watching you grow and achieve your dreams has been an incredible journey. Your hard work, passion, and resilience have brought you to this proud moment. This graduation isn't just an end to a chapter; it's the beginning of a new, exciting adventure. We are all so incredibly proud of you and can't wait to see the amazing things you'll do next. Embrace the future with an open heart and a courageous spirit.
                        </p>
                    </div>
                     <div className="flex justify-center pt-4">
                        <button 
                            onClick={() => onNavigate('gallery')}
                            className="flex min-w-[84px] max-w-sm cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-8 bg-primary text-slate-50 text-base font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors shadow-lg shadow-primary/30">
                            <span className="truncate">View Photo Gallery</span>
                        </button>
                    </div>
                </div>
                 <style>{`
                    .vietnamese-pattern {
                        background-image:
                            radial-gradient(circle at center, rgba(201, 46, 62, 0.05) 0%, transparent 40%),
                            radial-gradient(circle at center, rgba(212, 175, 55, 0.05) 0%, transparent 40%);
                        background-size: 50px 50px;
                        background-position: 0 0, 25px 25px;
                    }
                    .dark .vietnamese-pattern {
                         background-image:
                            radial-gradient(circle at center, rgba(201, 46, 62, 0.1) 0%, transparent 40%),
                            radial-gradient(circle at center, rgba(212, 175, 55, 0.1) 0%, transparent 40%);
                    }
                `}</style>
            </div>
        </>
    );
};
