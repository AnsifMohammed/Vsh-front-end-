import { useState } from 'react';
import { Menu, X, ChevronDown, Calendar } from 'lucide-react';

const Nav = ({
    navLinks = [],
    ctaText = "Book Visit",
    onCtaClick = () => { },
    logo = {},
    linkcolor = "#FFFFFF"
}) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);

    const toggleDropdown = (name) => {
        setOpenDropdown(openDropdown === name ? null : name);
    };

    return (
        <nav
            className="fixed left-1/2 -translate-x-1/2 z-[100] w-[95%] max-w-6xl"
            style={{ top: '20px' }}
        >
            <div
                className="rounded-full border border-white/30 shadow-2xl px-4 sm:px-6 lg:px-8 py-2 sm:py-2.5 backdrop-blur-xl"
                style={{
                    background:
                        'linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.10) 100%)',
                    backdropFilter: 'blur(24px)',
                    WebkitBackdropFilter: 'blur(24px)',
                }}
            >
                <div className="flex items-center justify-between gap-3">
                    {/* Logo */}
                    <div className="flex items-center flex-shrink-0">
                        {logo && (
                            <a href="/home" style={{ cursor: 'pointer' }} className="block">
                                <img
                                    src={logo}
                                    alt="Vayushri Hospital"
                                    className="h-9 sm:h-10 w-auto object-contain"
                                />
                            </a>
                        )}
                    </div>

                    {/* Desktop Navigation - Centered */}
                    <div className="hidden lg:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <div key={link.name} className="relative group">
                                {link.hasDropdown ? (
                                    <>
                                        <button
                                            className="font-nunito text-[15px] font-medium transition-all duration-300 flex items-center space-x-1 px-4 py-2 rounded-full hover:bg-white/15"
                                            style={{ color: linkcolor }}
                                            onMouseEnter={(e) => {
                                                setOpenDropdown(link.name);
                                                e.currentTarget.style.backgroundColor =
                                                    'rgba(255,255,255,0.18)';
                                            }}
                                            onMouseLeave={(e) => {
                                                setOpenDropdown(null);
                                                e.currentTarget.style.backgroundColor = 'transparent';
                                            }}
                                        >
                                            <span>{link.name}</span>
                                            <ChevronDown className="w-4 h-4" />
                                        </button>

                                        {/* Dropdown */}
                                        <div
                                            className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 rounded-2xl shadow-2xl transition-all duration-300 z-50 overflow-hidden border border-white/20 ${openDropdown === link.name
                                                    ? 'opacity-100 visible translate-y-0'
                                                    : 'opacity-0 invisible -translate-y-1'
                                                }`}
                                            style={{
                                                background:
                                                    'linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.92) 100%)',
                                                backdropFilter: 'blur(24px)',
                                            }}
                                            onMouseEnter={() => setOpenDropdown(link.name)}
                                            onMouseLeave={() => setOpenDropdown(null)}
                                        >
                                            {link.dropdownItems?.map((item) => (
                                                <a
                                                    key={item.name}
                                                    href={item.href}
                                                    onClick={item.onClick}
                                                    className="block px-4 py-2.5 text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors duration-200 text-[14px] font-nunito font-medium"
                                                >
                                                    {item.name}
                                                </a>
                                            ))}
                                        </div>
                                    </>
                                ) : (
                                    <a
                                        href={link.href}
                                        onClick={link.onClick}
                                        className="font-nunito text-[15px] font-medium transition-all duration-300 px-4 py-2 rounded-full block"
                                        style={{ color: linkcolor }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundColor =
                                                'rgba(255,255,255,0.18)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor = 'transparent';
                                        }}
                                    >
                                        {link.name}
                                    </a>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* CTA Button - Desktop */}
                    <div className="hidden lg:block flex-shrink-0">
                        <button
                            onClick={onCtaClick}
                            className="font-nunito font-semibold text-[15px] text-white px-5 py-2.5 rounded-full flex items-center gap-2 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                            style={{
                                background:
                                    'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 50%, #6D28D9 100%)',
                                boxShadow: '0 8px 24px -8px rgba(124, 58, 237, 0.6)',
                            }}
                        >
                            <Calendar className="w-4 h-4" strokeWidth={2.5} />
                            <span>{ctaText}</span>
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="lg:hidden p-2 rounded-full hover:bg-white/15 transition-colors"
                        style={{ color: linkcolor }}
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${isMobileMenuOpen ? 'max-h-[600px] opacity-100 mt-3' : 'max-h-0 opacity-0'
                    }`}
            >
                <div
                    className="rounded-3xl border border-white/30 shadow-2xl px-4 py-4 space-y-1"
                    style={{
                        background:
                            'linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.10) 100%)',
                        backdropFilter: 'blur(24px)',
                        WebkitBackdropFilter: 'blur(24px)',
                    }}
                >
                    {navLinks.map((link) => (
                        <div key={link.name}>
                            {link.hasDropdown ? (
                                <>
                                    <button
                                        onClick={() => toggleDropdown(link.name)}
                                        className="w-full text-left px-4 py-3 rounded-full transition-colors flex items-center justify-between text-[15px] font-nunito font-medium"
                                        style={{ color: linkcolor }}
                                    >
                                        <span>{link.name}</span>
                                        <ChevronDown
                                            className={`w-4 h-4 transition-transform duration-200 ${openDropdown === link.name ? 'rotate-180' : ''
                                                }`}
                                        />
                                    </button>

                                    {/* Mobile Dropdown */}
                                    <div
                                        className={`pl-4 space-y-1 transition-all duration-300 ${openDropdown === link.name
                                                ? 'max-h-96 opacity-100 mt-1'
                                                : 'max-h-0 opacity-0 overflow-hidden'
                                            }`}
                                    >
                                        {link.dropdownItems?.map((item) => (
                                            <a
                                                key={item.name}
                                                href={item.href}
                                                onClick={(e) => {
                                                    if (item.onClick) {
                                                        e.preventDefault();
                                                        item.onClick();
                                                    }
                                                    setIsMobileMenuOpen(false);
                                                }}
                                                className="block px-4 py-2 rounded-full text-[14px] font-nunito font-normal hover:bg-white/15 transition-colors"
                                                style={{ color: linkcolor }}
                                            >
                                                {item.name}
                                            </a>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <a
                                    href={link.href}
                                    onClick={(e) => {
                                        if (link.onClick) {
                                            e.preventDefault();
                                            link.onClick();
                                        }
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className="block px-4 py-3 rounded-full transition-colors text-[15px] font-nunito font-medium hover:bg-white/15"
                                    style={{ color: linkcolor }}
                                >
                                    {link.name}
                                </a>
                            )}
                        </div>
                    ))}

                    {/* Mobile CTA Button */}
                    <button
                        onClick={() => {
                            onCtaClick();
                            setIsMobileMenuOpen(false);
                        }}
                        className="w-full font-nunito font-semibold text-[15px] text-white px-6 py-3 rounded-full flex items-center justify-center gap-2 transition-all duration-300 mt-3"
                        style={{
                            background:
                                'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 50%, #6D28D9 100%)',
                            boxShadow: '0 8px 24px -8px rgba(124, 58, 237, 0.6)',
                        }}
                    >
                        <Calendar className="w-4 h-4" strokeWidth={2.5} />
                        <span>{ctaText}</span>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Nav;