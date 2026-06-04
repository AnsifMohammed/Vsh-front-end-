import { Star, MessageCircle } from 'lucide-react';
import Button from '../../../Components/Common/Button';
import HomeHeroImg from '../../../assets/home-hero.webp'
import { useNavigate } from "react-router-dom";


const HeroSection = () => {
    const navigate = useNavigate();
    const reviewerImages = [
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
    ];

    return (
        <div className="relative min-h-screen w-full overflow-hidden">
            {/* Background Image with Overlay */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `url(${HomeHeroImg})`,
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/60 to-black/40"></div>
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

                        {/* CTA Button */}
                        <div className="mb-8 sm:mb-12">
                            <Button
                                variant="primary"
                                size="lg"
                                className='font-nunito-sans font-bold text-[18px] leading-[120%] tracking-normal'
                                onClick={() => navigate("/appointment")}
                            >
                                Book an Appointment
                            </Button>
                        </div>

                        {/* Reviews Section */}
                        <div className="flex items-center gap-4 flex-wrap">
                            {/* Reviewer Avatars */}
                            <div className="flex -space-x-3">
                                {reviewerImages.map((img, index) => (
                                    <div
                                        key={index}
                                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white overflow-hidden shadow-md"
                                    >
                                        <img
                                            src={img}
                                            alt={`Reviewer ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* Rating */}
                            <div className="flex flex-col">
                                <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className="w-4 h-4 sm:w-5 sm:h-5 fill-yellow-400 text-yellow-400"
                                        />
                                    ))}
                                    <span className="ml-2 text-white font-bold text-sm sm:text-base">4.9</span>
                                </div>
                                <p className="text-gray-300 text-xs sm:text-sm mt-1">from 1,200 reviews</p>
                            </div>
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