import React from 'react';
import { Page } from '../types';

interface HomePageProps {
    onNavigate: (page: Page) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
    return (
        <>
            <div
                className="relative w-full h-[60vh] md:h-[70vh] flex items-center justify-center text-center text-white"
                style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url("/images/background.jpg")`,
                    // first value applies to the gradient layer, second to the image layer
                    backgroundSize: 'cover, contain',
                    backgroundRepeat: 'no-repeat, no-repeat',
                    backgroundPosition: 'center, center',
                }}
            >
                <div className="max-w-3xl px-4 py-8">
                    <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-tight drop-shadow-lg">
                        Chúc Mừng Tốt Nghiệp!
                    </h1>
                    <p className="mt-4 text-lg md:text-xl text-slate-200 drop-shadow-md">
                        Hành trình vạn dặm bắt đầu bằng một bước chân. Chúc mừng Trần Thu Hương đã hoàn thành một chặng đường tuyệt vời. hội đồng hương 5ATHVN tự hào về bạn!
                    </p>
                </div>
            </div>
            <div className="mx-auto max-w-4xl px-4 py-12 sm:py-20 relative">
                <div className="vietnamese-pattern absolute inset-0 opacity-50 z-0"></div>
                <div className="relative z-10 flex flex-col items-center text-center gap-12">
                    <div className="flex flex-col items-center gap-6">
                        <img alt="Smiling face icon" className="w-20 h-20" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_z-C7C8Yejc6hMuPIyJJTMvjDFT-CwXNRgqmzSwezMwcGGqGT5tHCTSCpN3j-Fq-JA3677FyGpum5Y_ZomcaDN-NPNrZvwO4rcvbEZT4xxv8QLk9v2a7MqsxonlmJfn1HXgsINBJBfsmImsxmMAO2gdV7tLbYI_LQzetDNb6w549qh0CxuxvqyGjB5Cbk9CLPULLO7QAdkfZGU_UP8qHRrESyTqx9ckPRzjnVhD4Mo2Jge71vJhWZ_7lav9paf07Xk9Ms5kuVn6Yh" />
                        <h2 className="text-text-light dark:text-white text-3xl font-bold leading-tight tracking-[-0.015em]">
                            🌸 Lời Chúc Từ Trái Tim
                        </h2>
                        <p className="text-subtle-light dark:text-subtle-dark text-base font-normal leading-relaxed max-w-2xl">
                            Chúc mừng Trần Thu Hương đã tốt nghiệp!
Hành trình trưởng thành và theo đuổi ước mơ của bạn thật tuyệt vời. Sự chăm chỉ, đam mê và nghị lực của bạn đã mang lại thành quả xứng đáng trong ngày hôm nay.

Buổi lễ tốt nghiệp này không chỉ khép lại một chặng đường, mà còn mở ra một hành trình mới đầy hứa hẹn và thú vị. Chúng tôi – hội đồng hương 5ATHVN – vô cùng tự hào về bạn và tin rằng bạn sẽ còn gặt hái được nhiều thành công hơn nữa trong tương lai.

Hãy đón nhận tương lai với một trái tim rộng mở và một tinh thần dũng cảm.
Một lần nữa, chúc mừng Trần Thu Hương tốt nghiệp!
                        </p>
                    </div>
                     <div className="flex justify-center pt-4">
                        <button 
                            onClick={() => onNavigate('gallery')}
                            className="flex min-w-[84px] max-w-sm cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-8 bg-primary text-slate-50 text-base font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors shadow-lg shadow-primary/30">
                            <span className="truncate">See Your Memorry</span>
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
