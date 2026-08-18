import React from 'react';
import { Facebook, Instagram, Youtube, Linkedin, MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../assets/vsh-logo.svg';

export default function Footer() {
  const quickLinks = [
    'About Us',
    'Tools',
    'Doctors',
    'Success Stories',
    'Blog',
    'Contact',
    'Appointment',
  ];

  const treatments = [
    'IVF & Fertility',
    'Gynecology',
    'Laparoscopy',
    'Obstetrics',
    'Parental Care',
    'Ultrasonography'
  ];

  const getQuickLinkHref = (name) => {
    switch (name) {
      case 'Doctors': return '/doctors';
      case 'Blog': return '/blog';
      case 'Contact': return '/contact';
      case 'Appointment': return '/appointment';
      default: return '/home';
    }
  };

  const getTreatmentHref = (name) => {
    switch (name) {
      case 'IVF & Fertility': return '/Ivf&Fertility';
      case 'Gynecology': return '/gynecology';
      case 'Laparoscopy': return '/laparoscopy';
      case 'Obstetrics': return '/obstetrics';
      case 'Parental Care': return '/parentalcare';
      case 'Ultrasonography': return '/ultrasonography';
      default: return '/home';
    }
  };

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1a1a1a] text-white">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center">
                {logo && (
                  <Link to="/home" onClick={handleScrollTop} className="flex items-center justify-center">
                    <img src={logo} alt="Logo" className="" />
                  </Link>
                )}
              </div>
              
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Chennai's most trusted fertility and maternity center, bringing together excellence in healthcare with compassionate, world-class medical care.
            </p>
            <div>
              <p className="text-sm mb-3">Follow Us</p>
              <div className="flex gap-3">
                <a href="#" className="w-9 h-9 rounded-full bg-[#6B3FA0] hover:bg-[#7A48B7] transition-colors flex items-center justify-center">
                  <Facebook size={18} />
                </a>
                <a href="#" className="w-9 h-9 rounded-full bg-[#6B3FA0] hover:bg-[#7A48B7] transition-colors flex items-center justify-center">
                  <Instagram size={18} />
                </a>
                <a href="#" className="w-9 h-9 rounded-full bg-[#6B3FA0] hover:bg-[#7A48B7] transition-colors flex items-center justify-center">
                  <Youtube size={18} />
                </a>
                <a href="#" className="w-9 h-9 rounded-full bg-[#6B3FA0] hover:bg-[#7A48B7] transition-colors flex items-center justify-center">
                  <Linkedin size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base font-semibold mb-4 text-nunito">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={getQuickLinkHref(link)}
                    onClick={handleScrollTop}
                    className="text-gray-400 text-inter hover:text-white transition-colors text-sm"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Treatments */}
          <div>
            <h4 className="text-base font-semibold mb-4 text-nunito">Our Treatments</h4>
            <ul className="space-y-2.5">
              {treatments.map((treatment, index) => (
                <li key={index}>
                  <Link
                    to={getTreatmentHref(treatment)}
                    onClick={handleScrollTop}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {treatment}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-base font-semibold mb-4 text-nunito">Contact Information</h4>
            <div className="space-y-4">
              <div className="flex gap-3">
                <MapPin size={18} className="text-gray-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-gray-400">
                  <p className="font-medium text-white mb-0.5 text-nunito">Address</p>
                  <p>200 feet radial road,</p>
                  <p>Opp to Embassy, Pallavaram,</p>
                  <p>Chennai - 600044, Tamil Nadu, India</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Phone size={18} className="text-gray-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-gray-400">
                  <p className="font-medium text-white mb-0.5 text-nunito">Phone</p>
                  <p><a href="tel:+917708555635" className="hover:text-white transition-colors">+91 77085 55635</a></p>
                </div>
              </div>

              <div className="flex gap-3">
                <Mail size={18} className="text-gray-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-gray-400">
                  <p className="font-medium text-white mb-0.5 text-nunito">Email</p>
                  <p><a href="mailto:vyushriivfhospital@gmail.com" className="hover:text-white transition-colors">vyushriivfhospital@gmail.com</a></p>
                </div>
              </div>

              <div className="flex gap-3">
                <Clock size={18} className="text-gray-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-gray-400">
                  <p className="font-medium text-white mb-0.5 text-nunito">Hours</p>
                  <p>Mon - Sat: 9:00 AM - 1:00 PM, 5:00 PM - 9:00 PM</p>
                  <p>Sunday: Emergencies Only</p>
                  <p>Emergency: 24/7 Round the Clock</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-gray-400">
            <p>© 2024 Vayushri Hospital. All rights reserved. | <Link to="/contact" onClick={handleScrollTop} className="hover:text-white">Privacy Policy</Link> | <Link to="/contact" onClick={handleScrollTop} className="hover:text-white">Terms of Service</Link></p>
            <p className="flex items-center gap-1">
              Made with <span className="text-red-500">❤️</span> for families in Chennai
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}