import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "./Components/Common/Navbar";
import logo from "./assets/vsh-logo-black.svg";
import Footer from "./Components/Footer";
import AppRoutes from "./routes/route.jsx";
import ScrollToTop from "./Components/Common/ScrollToTop";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const authPaths = [
    "/login",
    "/signup",
    "/forgotpassword",
    "/resetpassword",
    "/",
  ];
  const isAuthPage = authPaths.includes(location.pathname);

  const navLinks = [
    { name: "Home", href: "/home" },
    {
      name: "Treatments",
      hasDropdown: true,
      bold: false,
      dropdownItems: [
        { name: "IVF & Fertility", href: "/Ivf&Fertility" },
        { name: "Gynecology", href: "/gynecology" },
        { name: "Obstetrics", href: "/obstetrics" },
        { name: "Andrology", href: "/andrology" },
        { name: "Laparoscopy", href: "/laparoscopy" },
        { name: "Oncology", href: "/oncology" },
        { name: "Parental Care", href: "/parentalcare" },
        { name: "Ultrasonography", href: "/ultrasonography" },
      ],
    },
    { name: "Doctors", href: "/doctors" },
    { name: "Blog", href: "/blog" },
  ];

  const handleContactClick = () => {
    navigate("/appointment");
  };

  return (
    <div className="min-h-screen">
      <ScrollToTop />
      {!isAuthPage && (
        <Navbar
          logoText="Vayushri Hospital"
          navLinks={navLinks}
ctaText="Book Visit"
          onCtaClick={handleContactClick}
          logo={logo}
          bgColor="white"
          bgblur="blur(20px)"
          linkHoverBgColor="#F2EDF8"
          linkpadding="14px"
          linkradius="10px"
          linkblur="blur(34px)"
          linkHoverColor="#E0E0E0"
          linkcolor="#333333"
        />
      )}
      <AppRoutes />
      {!isAuthPage && <Footer />}
    </div>
  );
}

export default App;
