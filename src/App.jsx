import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "./Components/Common/Navbar";
import logo from './assets/vsh-logo-black.svg';
import Footer from "./Components/Footer";
import AppRoutes from "./routes/route.jsx";
import ScrollToTop from "./Components/Common/ScrollToTop";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  // Check if current path is an auth page (no navbar/footer on auth pages)
  const authPaths = ['/login', '/signup', '/forgotpassword', '/resetpassword', '/'];
  const isAuthPage = authPaths.includes(location.pathname);

  const navLinks = [
    { name: 'Home', href: '/home' },
    {
      name: 'Services',
      hasDropdown: true,
      dropdownItems: [
        { name: 'IVF & Fertility', href: '/Ivf&Fertility' },
        { name: 'Gynecology Service', href: '/gynecology' },
        { name: 'Obstetrics Service', href: '/obstetrics' },
        { name: 'Andrology Service', href: '/andrology' },
        { name: 'Laparoscopy Service', href: '/laparoscopy' },
        { name: 'Oncology Services', href: '/oncology' },
        { name: 'Parental Care Service', href: '/parentalcare' },
        { name: 'Ultrasonography Service', href: '/ultrasonography' }
      ]
    },
    { name: 'Doctors', href: '/doctors' },
    { name: 'Success stories', href: '/successstory' },
    { name: 'Blog', href: '/blog' }
  ];

  const handleContactClick = () => {
    navigate("/contact");
  };

  return (
    <div className="min-h-screen">
      <ScrollToTop />
      {!isAuthPage && (
        <Navbar
          logoText="Vayushri Hospital"
          navLinks={navLinks}
          ctaText="Contact Us"
          onCtaClick={handleContactClick}
          logo={logo}
          bgColor="white"
          bgblur="blur(20px)"
          linkHoverBgColor="#F2EDF8"
          linkpadding="14px"
          linkradius="10px"
          linkblur="blur(34px)"
          linkHoverColor="#5B6371"
          linkcolor="#5B6371"
        />
      )}
      <AppRoutes />
      {!isAuthPage && <Footer />}
    </div>
  );
}

export default App;