import Badge from '../../../Components/Common/Badge';
import Card from "../../../Components/Common/Card";
import { useState } from 'react';
import { Heart, Quote } from 'lucide-react';

const PatientStories = ({
  badgeText = "Patient Stories",
  badgeIcon = <Heart className="w-4 h-4" />,
  heading = "Stories of Hope & Success",
  highlightText = "Hope & Success",
  description = "Real experiences from real families who found their path to parenthood with our care and support",
  stories = []
}) => {
  const [activeSlide, setActiveSlide] = useState(0);

  const renderStars = (rating) => {
    return (
      <div className="flex gap-1 mb-4">
        {[...Array(rating)].map((_, i) => (
          <span key={i} className="text-yellow-400 text-lg">★</span>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <Badge
            variant="primary"
            type="soft"
            size="large"
            className="mb-4"
            icon={badgeIcon}
          >
            {badgeText}
          </Badge>

          <h2 className=" sm:text-5xl  text-black mb-4 title ">
            {heading.split(highlightText)[0]}
            <span className="text-gold">{highlightText}</span>
            {heading.split(highlightText)[1]}
          </h2>

          <p className="text-gray-600  sm:text-lg max-w-2xl mx-auto sub-title">
            {description}
          </p>
        </div>

        {/* Stories Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stories.map((story, index) => (
            <Card key={index} className="flex flex-col">

              <div className='flex justify-between'>
                {/* Quote Icon */}
                <div className="text-purple-600 text-4xl mb-4 font-serif"> <Quote /></div>

                {/* Rating */}
                {renderStars(story.rating)}

              </div>

              {/* Quote */}
              <p className="text-gray-700  leading-relaxed mb-6 flex-grow card-sub-title">
                {story.quote}
              </p>

              {/* Author Info */}
              <div className="border-t pt-4">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{story.icon}</span>
                  <div>
                    <h4 className="font-bold text-gray-900 text-base">{story.name}</h4>
                    <p className="text-sm text-orange-600 font-medium">{story.treatment}</p>
                    <p className="text-sm text-gray-500">{story.location}</p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2">
          {stories.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${index === activeSlide ? 'bg-purple-600 w-8' : 'bg-gray-300'
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PatientStories;