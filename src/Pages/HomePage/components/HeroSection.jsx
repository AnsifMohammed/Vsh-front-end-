import { MessageCircle } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import HomeHeroImg from "../../../assets/home-hero.webp";


const HeroSection = () => {
    const navigate = useNavigate();

    return (
        <div className="relative min-h-screen w-full overflow-hidden">
            {/* Background Image with Overlay */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: `url(${HomeHeroImg})`,
                    }}
                >
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/30 to-black/10"></div>
            </div>

            {/* Content Container */}
            <div className="relative z-10 min-h-screen flex items-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 w-full">
                    <div className="max-w-3xl">
                        {/* Main Heading */}
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-nunito-sans font-bold text-white leading-tight mb-6">
                            Trusted <span className="text-gold">Fertility</span> &<br />
                            Women's Health<br />
                            Care
                        </h1>

                        {/* Description */}
                        <p className="text-gray-300 font-inter font-medium text-base sm:text-lg mb-8 sm:mb-10 max-w-2xl leading-relaxed">
                            Experience comprehensive fertility treatments and women's healthcare with our team of specialists. We combine advanced medical technology with compassionate care to help you achieve your dreams of parenthood.
                        </p>

                        {/* CTA Buttons */}
                        <div className="mb-8 sm:mb-12 flex flex-wrap items-center gap-4">
                            {/* Book an Appointment - Primary purple gradient */}
                            <button
                                onClick={() => navigate("/appointment")}
                                className="font-nunito-sans font-bold text-base sm:text-[18px] leading-[120%] tracking-normal text-white px-7 sm:px-9 py-3.5 sm:py-4 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                                style={{
                                    background:
                                        'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 50%, #6D28D9 100%)',
                                    boxShadow: '0 10px 30px -8px rgba(124, 58, 237, 0.7)',
                                }}
                            >
                                Book an Appointment
                            </button>

                            {/* Explore Treatments - Glass style */}
                            <button
                                onClick={() => navigate("/gynecology")}
                                className="font-nunito-sans font-bold text-base sm:text-[18px] leading-[120%] tracking-normal text-white px-7 sm:px-9 py-3.5 sm:py-4 rounded-full transition-all duration-300 hover:scale-105 hover:bg-white/20 border border-white/30"
                                style={{
                                    background: 'rgba(255, 255, 255, 0.10)',
                                    backdropFilter: 'blur(20px)',
                                    WebkitBackdropFilter: 'blur(20px)',
                                }}
                            >
                                Explore Treatments
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* WhatsApp Floating Button */}
            <div className="fixed bottom-6 right-6 z-50">
                <button
                    className="bg-green-500 hover:bg-green-600 text-white rounded-full p-3 sm:p-4 shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200"
                    onClick={() => window.open('https://wa.me/919876543210', '_blank')}
                    aria-label="Contact on WhatsApp"
                >
                    <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7" />
                </button>
            </div>
        </div>
    );
};

export default HeroSection;