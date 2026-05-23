import { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

/**
 * Navbar Component
 */
const Nav = ({
    navLinks = [],
    ctaText = "Contact Us",
    onCtaClick = () => { },
    bgColor = "",
    logo = {},
    bgblur = "",
    linkHoverColor = "",
    linkHoverBgColor = "",
    linkpadding = "",
    linkradius = "",
    linkblur = "",
    linkcolor = ""
}) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);

    const toggleDropdown = (name) => {
        setOpenDropdown(openDropdown === name ? null : name);
    };

    return (
        <nav className="shadow-sm border-b border-gray-100" style={{ backgroundColor: bgColor, backdropFilter: bgblur, position: 'fixed', width: '100%', zIndex: '100' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo */}
                    <div className="flex items-center space-x-2">
                        <div className=" h-6  flex items-center justify-center">
                            <span className="text-white text-xl  font-nunito">
                                {logo && (
                                    <a href="/home" style={{ cursor: 'pointer' }}>
                                        <div className="flex items-center justify-center">
                                            <img src={logo} alt="Logo" className="" />
                                        </div>
                                    </a>
                                )}
                            </span>
                        </div>
                    </div>


                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <div key={link.name} className="relative group">
                                {link.hasDropdown ? (
                                    <>
                                        <button
                                            className="text-white font-inter font-semibold text-[16px] transition-colors duration-300 flex items-center space-x-1 text-base py-2"
                                            style={{ color: linkcolor }}
                                            onMouseEnter={(e) => {
                                                setOpenDropdown(link.name);
                                                e.currentTarget.style.color = linkHoverColor;
                                                e.currentTarget.style.backgroundColor = linkHoverBgColor;
                                                e.currentTarget.style.padding = linkpadding;
                                                e.currentTarget.style.borderRadius = linkradius;
                                                e.currentTarget.style.backdropFilter = linkblur;
                                            }}
                                            onMouseLeave={(e) => {
                                                setOpenDropdown(null);
                                                e.currentTarget.style.backgroundColor = 'transparent';
                                                e.currentTarget.style.padding = '';
                                                e.currentTarget.style.color = linkcolor;
                                                e.currentTarget.style.borderRadius = '';
                                                e.currentTarget.style.backdropFilter = '';
                                            }}
                                        >
                                            <span>{link.name}</span>
                                            <ChevronDown className="w-4 h-4" />
                                        </button>
                                        {/* Dropdown */}
                                        <div
                                            className={`absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-xl transition-all duration-300 z-50 ${openDropdown === link.name ? 'opacity-100 visible' : 'opacity-0 invisible'
                                                }`}
                                            onMouseEnter={() => setOpenDropdown(link.name)}
                                            onMouseLeave={() => setOpenDropdown(null)}
                                        >
                                            {link.dropdownItems?.map((item) => (
                                                <a
                                                    key={item.name}
                                                    href={item.href}
                                                    onClick={item.onClick}
                                                    className=" font-inter font-semibold text-[16px] block px-4 py-3 text-[#5B6371] hover:bg-blue-50 hover:text-purple-600 transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg text-sm"

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
                                        className="text-white font-inter font-semibold text-[16px] text-base transition-colors duration-300 text-base"
                                        style={{ color: linkcolor }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.color = linkHoverColor;
                                            e.currentTarget.style.backgroundColor = linkHoverBgColor;
                                            e.currentTarget.style.padding = linkpadding;
                                            e.currentTarget.style.borderRadius = linkradius;
                                            e.currentTarget.style.backdropFilter = linkblur;
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.color = 'white';
                                            e.currentTarget.style.backgroundColor = '';
                                            e.currentTarget.style.padding = '';
                                            e.currentTarget.style.color = linkcolor;
                                            e.currentTarget.style.borderRadius = '';
                                            e.currentTarget.style.backdropFilter = '';
                                        }}
                                    >
                                        {link.name}
                                    </a>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Contact Button - Desktop */}
                    <div className="hidden lg:block">
                        <button
                            onClick={onCtaClick}
                            className="bg-primary text-white px-6 py-2.5 rounded-md hover:shadow-lg hover:scale-105 transition-all duration-300 font-nunito font-bold text-[18px]"
                        >
                            {ctaText}
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors duration-300"
                        style={{ color: linkcolor || '#111827' }}
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`lg:hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen
                    ? 'max-h-screen opacity-100'
                    : 'max-h-0 opacity-0 overflow-hidden'
                    }`}
            >
                <div className="px-4 pt-2 pb-6 space-y-2" style={{ backgroundColor: bgColor || '#ffffff', backdropFilter: bgblur }}>
                    {navLinks.map((link) => (
                        <div key={link.name}>
                            {link.hasDropdown ? (
                                <>
                                    <button
                                        onClick={() => toggleDropdown(link.name)}
                                        className="w-full text-left px-4 py-3 rounded-md transition-colors duration-200 flex items-center justify-between text-base"
                                        style={{ color: linkcolor }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.color = linkHoverColor;
                                            e.currentTarget.style.backgroundColor = linkHoverBgColor;
                                            e.currentTarget.style.padding = linkpadding;
                                            e.currentTarget.style.borderRadius = linkradius;
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.color = linkcolor;
                                            e.currentTarget.style.backgroundColor = '';
                                            e.currentTarget.style.padding = '';
                                        }}
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
                                                className="block px-4 py-2 rounded-md transition-colors duration-200 text-sm"
                                                style={{ color: linkHoverColor, backgroundColor: linkHoverBgColor }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.color = linkHoverColor;
                                                    e.currentTarget.style.backgroundColor = linkHoverBgColor;
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.color = linkcolor;
                                                    e.currentTarget.style.backgroundColor = '';
                                                }}
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
                                    className="block px-4 py-3 rounded-md transition-colors duration-200 text-base"
                                    style={{ color: linkcolor }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.color = linkHoverColor;
                                        e.currentTarget.style.backgroundColor = linkHoverBgColor;
                                        e.currentTarget.style.padding = linkpadding;
                                        e.currentTarget.style.borderRadius = linkradius;
                                        e.currentTarget.style.backdropFilter = linkblur;
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.color = linkcolor;
                                        e.currentTarget.style.backgroundColor = '';
                                        e.currentTarget.style.padding = '';
                                    }}
                                >
                                    {link.name}
                                </a>
                            )}
                        </div>
                    ))}
                    {/* Mobile Contact Button */}
                    <button
                        onClick={() => {
                            onCtaClick();
                            setIsMobileMenuOpen(false);
                        }}
                        className="w-full bg-gradient-to-r from-[#7A48B7] to-[#6B3FA0] text-white px-6 py-3 rounded-full hover:shadow-lg transition-all duration-300 mt-4 text-sm font-medium"
                    >
                        {ctaText}
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default Nav;