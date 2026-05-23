import { useState } from "react";
import { Calculator } from 'lucide-react';

const HealthcareJourney = ({ selectedPath, onSelectPath }) => {

  const journeyData = {
    woman: {
      title: "I'm a Woman",
      description: "Access comprehensive women's health services, fertility treatments, pregnancy care, and gynecological consultations tailored for you.",
      bgColor: "bg-pink-50",
      features: [
        { icon: "❤️", text: "Fertility & IVF Treatments" },
        { icon: "⚕️", text: "Women's Health Checkups" },
        { icon: "🤰", text: "Pregnancy & Maternity Care" }
      ]
    },
    man: {
      title: "I'm a Man",
      description: "Access andrology services, male fertility treatments, and supportive care designed to help you and your partner on your fertility journey.",
      bgColor: "bg-blue-50",
      features: [
        { icon: "🔬", text: "Male Fertility Assessment" },
        { icon: "💊", text: "Andrology Treatments" },
        { icon: "👥", text: "Partner Support Programs" }
      ]
    }
  };

  return (
    <div className="w-full h-auto py-4 px-4 sm:py-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-4">
            <Calculator className="w-4 h-4" />
            Health Journey
          </div>

          <h1 className="title sm:text-5xl  text-black mb-3 px-2">
            Choose your <span className="text-gold">Healthcare Journey</span>
          </h1>

          <p className="text-gray-600  sm:text-lg max-w-2xl mx-auto sub-title px-2">
            Get instant insights about your health with our easy-to-use calculators and tools
          </p>
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Woman Card */}
          <div className={`${journeyData.woman.bgColor} rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-pink-100`}>
            <div className="flex flex-col items-center text-center">
              {/* Icon */}
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-md">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>

              {/* Title */}
              <h2 className=" mb-3 card-title ">
                {journeyData.woman.title}
              </h2>

              {/* Description */}
              <p className="card-sub-title text-gray-600  mb-6 leading-relaxed">
                {journeyData.woman.description}
              </p>

              {/* Features */}
              <div className="w-full space-y-3 mb-6">
                {journeyData.woman.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 text-left">
                    <span className="text-xl">{feature.icon}</span>
                    <span className="text-sm text-gray-700 font-bold">{feature.text}</span>
                  </div>
                ))}
              </div>

              {/* Button */}
              <button
                className={`w-full px-4 py-2.5 border-2 border-pink-300 text-pink-700 hover:bg-pink-100 rounded-lg font-medium transition-colors ${selectedPath === 'woman' ? 'bg-pink-100 ring-2 ring-pink-400' : ''}`}
                onClick={() => onSelectPath(selectedPath === 'woman' ? null : 'woman')}
              >
                {selectedPath === 'woman' ? "Viewing Women's Services" : "Explore Women's Services"}
              </button>
            </div>
          </div>

          {/* Man Card */}
          <div className={`${journeyData.man.bgColor} rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-100`}>
            <div className="flex flex-col items-center text-center">
              {/* Icon */}
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-md">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>

              {/* Title */}
              <h2 className="card-title  mb-3 ">
                {journeyData.man.title}
              </h2>

              {/* Description */}
              <p className="text-gray-600 card-sub-title mb-6 leading-relaxed">
                {journeyData.man.description}
              </p>

              {/* Features */}
              <div className="w-full space-y-3 mb-6">
                {journeyData.man.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 text-left">
                    <span className="text-xl">{feature.icon}</span>
                    <span className="text-sm text-gray-700 font-bold">{feature.text}</span>
                  </div>
                ))}
              </div>

              {/* Button */}
              <button
                className={`w-full px-4 py-2.5 border-2 border-blue-300 text-blue-700 hover:bg-blue-100 rounded-lg font-medium transition-colors ${selectedPath === 'man' ? 'bg-blue-100 ring-2 ring-blue-400' : ''}`}
                onClick={() => onSelectPath(selectedPath === 'man' ? null : 'man')}
              >
                {selectedPath === 'man' ? "Viewing Men's Services" : "Explore Men's Services"}
              </button>
            </div>
          </div>
        </div>

        {/* Footer Text */}
        <div className="text-center px-2">
          <p className="text-gray-600">
            Not sure which path is right for you?{' '}
            <button className="text-blue-600 hover:text-blue-700 font-semibold hover:underline">
              Book a consultation
            </button>
            , and our specialists will guide you.
          </p>
        </div>

        {/* Selected Path Display */}
        {selectedPath && (
          <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-lg text-center">
            <p className="text-green-800 font-medium">
              ✅ You've selected: <span className="font-bold">{selectedPath === 'woman' ? "Women's Healthcare Journey" : "Men's Healthcare Journey"}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HealthcareJourney;