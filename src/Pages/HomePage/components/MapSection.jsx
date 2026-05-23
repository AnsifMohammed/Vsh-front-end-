import React from 'react';
import { MapPin } from 'lucide-react';

export default function MapSection() {

  const lat = 12.97;
  const lng = 80.16;

   // Open Map View
  const handleViewOnMap = () => {
    const url = `https://www.google.com/maps?q=${lat},${lng}`;
    window.open(url, "_blank");
  };

  // Open Directions
  const handleGetDirections = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    window.open(url, "_blank");
  };
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 sm:px-6 sm:py-12 md:px-8 md:py-16 lg:p-20">
      <div className="relative rounded-md overflow-hidden shadow-lg h-96 sm:h-80 md:h-72 lg:h-64">
        {/* Google Maps Embed */}
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.1!2d80.16!3d12.97!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU4JzEyLjAiTiA4MMKwMDknMzYuMCJF!5e0!3m2!1sen!2sin!4v1234567890"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0"
        ></iframe>
        
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 via-gray-900/60 to-gray-900/70"></div>
        
        {/* Content overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          {/* Location icon */}
          <div className="mb-2 sm:mb-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
          </div>
          
          {/* Title */}
          <h3 className="text-white text-xl sm:text-2xl font-bold mb-1.5 sm:mb-2 px-4">
            Visit Our Hospital
          </h3>
          
          {/* Address */}
          <p className="text-gray-200 text-xs sm:text-sm mb-4 sm:mb-6 max-w-md px-4">
            200 feet radial road, Opp to Embassy, Pallavaram, Chennai - 600044, Tamil Nadu, India
          </p>
          
          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full px-4 sm:w-auto">
            <button className="px-5 py-2 sm:px-6 sm:py-2.5 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg transition-colors cursor-pointer" onClick={handleGetDirections}>
              Get Directions
            </button>
            <button className="px-5 py-2 sm:px-6 sm:py-2.5 bg-white hover:bg-gray-100 text-gray-800 text-sm font-medium rounded-lg transition-colors cursor-pointer" onClick={handleViewOnMap}>
              View on Map
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}