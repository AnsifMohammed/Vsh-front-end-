import { useState } from 'react';
import { ChevronDown, CheckCircle, Calendar } from 'lucide-react';
import Button from '../../../Components/Common/Button';
import { useNavigate } from 'react-router-dom';

const TreatmentCard = ({ treatment, isOpen, onToggle }) => {
  const navigate = useNavigate();

  const handleBookConsultation = () => {
    if (treatment.onBookConsultation) {
      treatment.onBookConsultation();
    } else {
      navigate('/appointment', {
        state: {
          specialty: treatment.title || ''
        }
      });
    }
  };
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-4 overflow-hidden">
      {/* Header - Always Visible */}
      <button
        onClick={onToggle}
        className="w-full flex items-start justify-between p-4 sm:p-6 text-left hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-start gap-3 sm:gap-4 flex-1">
          {/* Icon */}
          <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-purple-100 flex items-center justify-center">
            <span className="text-xl sm:text-2xl">{treatment.icon}</span>
          </div>

          {/* Title and Description */}
          <div className="flex-1 min-w-0">
            <h3 className=" sm:text-lg card-title  text-black mb-1">
              {treatment.title}
            </h3>
            <p className="card-sub-title sm:text-sm text-gray-600">
              {treatment.description}
            </p>
          </div>
        </div>

        {/* Success Rate and Chevron */}
        <div className="flex items-start gap-2 sm:gap-3 ml-2 sm:ml-4 flex-shrink-0">
          <div className="text-right">
            <p className="text-sm sm:text-base font-bold text-purple-600">
              {treatment.successRate}
            </p>
            <p className="text-xs text-gray-500 whitespace-nowrap">
              {treatment.duration}
            </p>
          </div>
          <ChevronDown
            className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-300 mt-1 ${isOpen ? 'rotate-180' : ''
              }`}
          />
        </div>
      </button>

      {/* Expandable Content */}
      <div
        className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
          }`}
      >
        <div className="px-4 sm:px-6 pb-6 pt-2 border-t border-gray-100">
          {/* Preparation & Process */}
          <div className="mb-6">
            <h4 className="text-sm font-bold text-gray-900 mb-3">
              {treatment.processTitle}
            </h4>
            <div className="space-y-2">
              {treatment.steps.map((step, index) => (
                <div key={index} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-gray-700">
                    {step}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Button
              variant="primary"
              size="md"
              fullWidth
              startIcon={<Calendar className="w-4 h-4" />}
              onClick={handleBookConsultation}
            >
              {treatment.primaryButtonText}
            </Button>
            <Button
              variant="outline"
              size="md"
              fullWidth
              onClick={treatment.onAskQuestion || (() => navigate('/contact'))}
            >
              {treatment.secondaryButtonText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Treatments = ({
  title = "Available Treatments",
  highlightText = "Treatments",
  subtitle = "Explore our comprehensive range of treatments designed for your specific needs",
  treatments = []
}) => {
  const [openIndex, setOpenIndex] = useState(0);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <div className="bg-gradient-to-b from-purple-50 to-white py-6 sm:py-8 md:py-10 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-4 sm:mb-6">
          <h2 className=" sm:text-3xl md:text-4xl  text-black mb-2 sm:mb-3 title">
            {title.split(highlightText)[0]}
            <span className="text-gold">{highlightText}</span>
            {title.split(highlightText)[1]}
          </h2>
          <p className="sm:text-sm md:text-base text-gray-600 max-w-2xl mx-auto px-4 sub-title">
            {subtitle}
          </p>
        </div>

        {/* Treatments List */}
        <div>
          {treatments.map((treatment, index) => (
            <TreatmentCard
              key={index}
              treatment={treatment}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Treatments;