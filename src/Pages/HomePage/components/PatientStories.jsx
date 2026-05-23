import Badge from '../../../Components/Common/Badge';
import Card from "../../../Components/Common/Card";
import { useState } from 'react';
import { Heart, Quote } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const PatientStories = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const navigate = useNavigate();

  const stories = [
    {
      quote: '"Dr. Rajesh diagnosed my PCOS and created a perfect treatment plan. Within 8 months, my cycles were regular and I conceived naturally. Forever grateful!"',
      name: 'Meera Gupta',
      treatment: 'PCOS Treatment',
      location: 'Delhi',
      icon: '🌱',
      rating: 5,
      route:'successstory'
    },
    {
      quote: '"The comprehensive fertility assessment and guidance from the team helped us understand our options. The care and attention we received was exceptional."',
      name: 'Rahul & Kavya',
      treatment: 'Fertility Consultation',
      location: 'Bangalore',
      icon: '🧬',
      rating: 5,
      route:'successstory'
    },
    {
      quote: '"Dr. Anita managed my high-risk pregnancy beautifully. Regular monitoring and her expertise ensured a safe delivery of my healthy baby boy."',
      name: 'Anjali Reddy',
      treatment: 'High-Risk Pregnancy',
      location: 'Hyderabad',
      icon: '🤰',
      rating: 5,
      route:'successstory'
    }
  ];

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
    <div className=" bg-gray-50 pt-16 pb-6 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge
            variant="primary"
            type="soft"
            size="large"
            className="mb-4"
            icon={<Heart className="w-4 h-4" />}
          >
            Patient Stories
          </Badge>

          <h2 className=" sm:text-5xl  text-black mb-4 title">
            Stories of <span className="text-gold">Hope & Success</span>
          </h2>

          <p className="text-gray-600  sm:text-lg max-w-2xl mx-auto sub-title">
            Real experiences from real families who found their path to parenthood with our care and support
          </p>
        </div>

        {/* Stories Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stories.map((story, index) => (
            <Card key={index} className="flex flex-col cursor-pointer" onClick={() => navigate(`/${story.route}`)}>

                <div className='flex justify-between'>
                      {/* Quote Icon */}
              <div className="text-purple-600 text-4xl mb-4 font-serif"> <Quote /></div>

              {/* Rating */}
              {renderStars(story.rating)}

                </div>
            
              {/* Quote */}
              <p className="text-gray-600 card-sub-title leading-relaxed mb-6 flex-grow">
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


      </div>
    </div>
  );
};

export default PatientStories;