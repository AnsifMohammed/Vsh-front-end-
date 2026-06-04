import React from 'react';
import { ChevronRight } from 'lucide-react';
import BraedcrumbBg from '../../../assets/Breadcrumb-bg.webp'

// Reusable Breadcrumb Hero Component
const BreadcrumbHero = ({ title, breadcrumbs = [] }) => {
  return (
    <div className="w-full py-16 px-4 sm:py-20 md:py-24" style={{ backgroundImage: `url(${BraedcrumbBg})`, backgroundPosition:'center', backgroundSize:'contain' }}>
      <div className="max-w-7xl mx-auto text-center">
        {/* Main Title */}
        <h1 className="title sm:text-4xl md:text-5xl  text-black mb-4 sm:mb-6">
          {title}
        </h1>
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center justify-center flex-wrap gap-2" aria-label="Breadcrumb">
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={index}>
              <a
                href={crumb.link || '#'}
                className={`text-sm sm:text-base font-medium transition-colors ${
                  index === breadcrumbs.length - 1
                    ? 'text-gray-900 cursor-default'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {crumb.label}
              </a>
              {index < breadcrumbs.length - 1 && (
                <ChevronRight className="w-4 h-4 text-gray-500" />
              )}
            </React.Fragment>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default BreadcrumbHero;