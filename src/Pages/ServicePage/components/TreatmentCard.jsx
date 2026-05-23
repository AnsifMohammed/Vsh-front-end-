import React from 'react';
import { Check, Baby, Award, Users } from 'lucide-react';

export default function TreatmentCard({
  title = "Fertility Treatments",
  subtitle = "Personalized, patient-centric care to help you achieve your dream of parenthood.",
  description = "At NayaNri Hospital, we understand the emotional journey of fertility treatments. Our state-of-the-art fertility center combines the latest reproductive technologies with compassionate care to maximize your chances of success. With over 30 years of experience and 50,000+ successful deliveries, we're committed to helping you build the family you've always dreamed of.",
  features = [
    { label: "Advanced IVF Lab", color: "pink" },
    { label: "High Success Rates", color: "green" },
    { label: "Personalized Care", color: "purple" }
  ],
  highlights = [
    { icon: "Baby", title: "Safe", subtitle: "Advanced Technology", color: "purple" },
    { icon: "Award", title: "Affordable", subtitle: "Transparent Pricing", color: "green" },
    { icon: "Users", title: "Trusted", subtitle: "50,000+ Families", color: "orange" }
  ],
  image = "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=800&h=1000&fit=crop",
  imageAlt = "Caring hands forming a heart shape"
}) {
  // Only include icons that are actually imported
  const iconMap = {
    Baby,
    Award,
    Users
  };

  // Color class mappings for features
  const getFeatureClasses = (color) => {
    const colorMap = {
      pink: 'bg-pink-50 text-pink-700',
      green: 'bg-green-50 text-green-700',
      purple: 'bg-purple-50 text-purple-700',
      blue: 'bg-blue-50 text-blue-700',
      orange: 'bg-orange-50 text-orange-700',
      red: 'bg-red-50 text-red-700'
    };
    return colorMap[color] || 'bg-gray-50 text-gray-700';
  };

  // Color class mappings for highlights
  const getHighlightIconColor = (color) => {
    const colorMap = {
      purple: 'text-blue-600',
      green: 'text-green-600',
      orange: 'text-orange-600',
      blue: 'text-blue-600',
      red: 'text-red-600'
    };
    return colorMap[color] || 'text-gray-600';
  };

  const getHighlightTitleColor = (color) => {
    const colorMap = {
      purple: 'text-purple-500',
      green: 'text-green-500',
      orange: 'text-orange-500',
      blue: 'text-blue-500',
      red: 'text-red-500'
    };
    return colorMap[color] || 'text-gray-500';
  };

  return (
    <div className="bg-white sm:p-4 md:p-6 lg:p-8">
      <div className="mx-auto overflow-hidden">
        <div className="grid lg:grid-cols-2 gap-0">
          {/* Left Content Section */}
          <div className="p-4 sm:p-6 md:p-8 lg:p-10 flex flex-col justify-center">
            <h1 className=" sm:text-4xl md:text-5xl text-black mb-6 title">
              {title}
            </h1>

            <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-6 ">
              {subtitle}
            </p>

            <p className="text-gray-600  sm:text-base leading-relaxed mb-8 subtitle">
              {description}
            </p>

            {/* Features Pills */}
            <div className="flex flex-wrap gap-3 mb-10">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${getFeatureClasses(feature.color)}`}
                >
                  <Check className="w-4 h-4" />
                  {feature.label}
                </div>
              ))}
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6">
              {highlights.map((stat, index) => {
                const IconComponent = iconMap[stat.icon];
                // Safety check - only render if icon exists
                if (!IconComponent) {
                  console.warn(`Icon "${stat.icon}" not found in iconMap`);
                  return null;
                }
                return (
                  <div key={index} className="text-center">
                    <div className="flex justify-center mb-3">
                      <div className="w-12 h-12 flex items-center justify-center">
                        <IconComponent className={`w-6 h-6 ${getHighlightIconColor(stat.color)}`} />
                      </div>
                    </div>
                    <h3 className={`text-lg sm:text-xl font-bold mb-1 ${getHighlightTitleColor(stat.color)}`}>
                      {stat.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600">{stat.subtitle}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Image Section */}
          <div className="relative min-h-[300px] rounded-3xl p-8 lg:p-16">
            <img
              src={image}
              alt={imageAlt}
              className="absolute inset-0 w-full h-full object-cover rounded-3xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

