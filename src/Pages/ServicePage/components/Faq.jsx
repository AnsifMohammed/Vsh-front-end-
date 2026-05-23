import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQItem = ({ question, answer, isOpen, onToggle }) => {
  return (
    <div className="mb-3">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-4 px-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors rounded-md"
      >
        <span className=" sm:text-[15px] card-title  text-black pr-4">
          {question}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''
            }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100 mt-2' : 'max-h-0 opacity-0'
          }`}
      >
        <div className="px-4 py-3  sm:text-sm text-gray-600 leading-relaxed bg-white rounded-md card-sub-title">
          {answer}
        </div>
      </div>
    </div>
  );
};

const FAQ = ({
  title = "Frequently Asked Questions",
  highlightText = "Questions",
  subtitle = "Get answers to common questions about our treatments and procedures",
  faqs = []
}) => {
  const [openIndex, setOpenIndex] = useState(0);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <div className="bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-10">
          <h2 className=" sm:text-3xl text-black mb-2 title">
            {title.split(highlightText)[0]}
            <span className="text-gold">{highlightText}</span>
            {title.split(highlightText)[1]}
          </h2>
          <p className="sub-title sm:text-[13px] text-gray-600 mt-2">
            {subtitle}
          </p>
        </div>

        {/* FAQ Container */}
        <div className="bg-white">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;