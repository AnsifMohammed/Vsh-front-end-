
import Badge from '../../../Components/Common/Badge';
import Button from '../../../Components/Common/Button';
import { useState } from 'react';
import { Heart, Phone, Mail, MapPin, Clock,Search, Calendar, User, ArrowRight, X, Quote } from 'lucide-react';


const StoryModal = ({ story, isOpen, onClose }) => {
  if (!isOpen || !story) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" style={{paddingTop:'144px'}}>
      <div className="relative w-full max-w-xl max-h-[60vh] overflow-y-auto bg-white rounded-2xl shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        {/* Hero Image */}
        <div className="relative h-56 overflow-hidden rounded-t-2xl">
          <img
            src={story.image}
            alt={story.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {story.title}
          </h2>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Couple:</p>
              <p className="text-base font-semibold text-gray-900">{story.couple}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Age:</p>
              <p className="text-base font-semibold text-gray-900">{story.age}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Treatment:</p>
              <p className="text-base font-semibold text-gray-900">{story.treatment}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Duration:</p>
              <p className="text-base font-semibold text-gray-900">{story.duration}</p>
            </div>
          </div>

          {/* Story Content */}
          <div className="bg-purple-50 border-l-4 border-purple-600 p-4 mb-6 rounded-r-lg">
            <p className="text-sm text-gray-700 leading-relaxed">
              {story.fullStory}
            </p>
          </div>
<div className='flex justify-between items-center w-full'>{/* Treated By */}
          <div className="mb-6">
            <p className="text-sm font-medium text-gray-700 mb-2">Treated by:</p>
            <p className="text-base font-semibold text-gold">{story.doctor}</p>
          </div>

          {/* CTA Button */}
          <Button
            variant="primary"
            startIcon={<Calendar className="w-5 h-5" />}
          >
            Book Consultation
          </Button></div>
          
        </div>
      </div>
    </div>
  );
};

// Success Story Card
const StoryCard = ({ story, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-xl overflow-hidden shadow-sm border-2 border-blue-400 hover:shadow-lg transition-all duration-300 cursor-pointer group"
    >
      {/* Image with Badge */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={story.image}
          alt={story.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3">
          <Badge variant={story.badgeVariant} type="solid" size="small">
            {story.badge}
          </Badge>
        </div>
        <div className="absolute top-3 right-3">
          <Badge variant="danger" type="solid" size="small">
            Featured
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title */}
        <h3 className="card-title text-black mb-2">
          {story.title}
        </h3>

        {/* Description */}
        <p className="card-sub-title text-gray-600 mb-4">
          {story.description}
        </p>

        {/* Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-500">Couple:</span>
            <span className="font-medium text-gray-900">{story.couple}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-500">Treatment:</span>
            <span className="font-medium text-gray-900">{story.treatment}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-500">Duration:</span>
            <span className="font-medium text-gray-900">{story.duration}</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4 pb-4 border-b border-gray-200">
          {story.tags.map((tag, index) => (
            <Badge key={index} variant="info" type="soft" size="small">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Read Button */}
        <Button variant="outline" fullWidth size="md"  startIcon={<Quote className="w-5 h-5" />}>
          Read Full Story
        </Button>
      </div>
    </div>
  );
};

// Main Component
const SuccessStory = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedStory, setSelectedStory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filters = ['All', 'IVF', 'ICSI', 'IUI', 'Nat Preg', 'Male Factor', 'Young Conception'];

  const successStories = [
    {
      id: 1,
      badge: 'Success',
      badgeVariant: 'success',
      image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=600&fit=crop',
      title: 'Our IVF Miracle After 5 Years',
      description: 'After years of trying, we successfully conceived and now have a beautiful baby girl.',
      couple: 'Anita & Rohit Gupta',
      age: '32 & 35 years',
      treatment: 'IVF Treatment',
      duration: '8 months treatment',
      doctor: 'Dr. Shanmugapriya',
      fullStory: 'After 5 long years of trying to conceive naturally, we were devastated and losing hope. Dr. Shanmugapriya recommended IVF, after a successful testing. The entire team was incredibly supportive, explaining each step clearly. Today, we are blessed with a beautiful baby girl. This journey taught us never to lose hope.',
      tags: ['IVF', 'Infertility', 'Success'],
    },
    {
      id: 2,
      badge: 'Success',
      badgeVariant: 'success',
      image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=800&h=600&fit=crop',
      title: 'PCOS to Pregnancy Success',
      description: 'Overcame PCOS challenges and conceived with expert medical guidance.',
      couple: 'Sneha & Vikram Reddy',
      age: '28 & 30 years',
      treatment: 'ICSI with Egg Freezing',
      duration: '6 months treatment',
      doctor: 'Dr. Meera Patel',
      fullStory: 'Diagnosed with PCOS at 25, I thought pregnancy would be impossible. Dr. Meera Patel created a comprehensive treatment plan combining lifestyle changes and medical intervention. Within 6 months, we successfully conceived through ICSI. Our baby boy is now 6 months old!',
      tags: ['PCOS', 'ICSI', 'Lifestyle Changes'],
    },
    {
      id: 3,
      badge: 'Success',
      badgeVariant: 'success',
      image: 'https://images.unsplash.com/photo-1543269865-4430c5af1f2e?w=800&h=600&fit=crop',
      title: 'High-Risk Pregnancy Success',
      description: 'Expert care led us to a healthy pregnancy and beautiful twins.',
      couple: 'Kavita & Arun Joshi',
      age: '38 & 40 years',
      treatment: 'Advanced Maternal Age IVF',
      duration: '10 months treatment',
      doctor: 'Dr. Priya',
      fullStory: 'At 38, we were told our chances were slim. Dr. Priya specialized care and monitoring throughout the high-risk pregnancy gave us confidence. We welcomed healthy twin girls last month. Age is just a number with the right medical support!',
      tags: ['High-Risk', 'Twins', 'Advanced Age'],
    },
    {
      id: 4,
      badge: 'Success',
      badgeVariant: 'success',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=600&fit=crop',
      title: 'Male Infertility Overcome',
      description: 'Low sperm count was no barrier with the right approach and successfully.',
      couple: 'Priya & Amit Kumar',
      age: '29 & 33 years',
      treatment: 'ICSI with Microinjection',
      duration: '4 months treatment',
      doctor: 'Dr. Arjun Murthy',
      fullStory: 'Male factor infertility was devastating for my husband. Dr. Arjun Murthy expertise in male fertility and ICSI with microinjection gave us hope. After just 4 months of treatment, we conceived. Our son is proof that male infertility can be overcome!',
      tags: ['Male Factor', 'ICSI', 'Microinjection'],
    },
    {
      id: 5,
      badge: 'Success',
      badgeVariant: 'success',
      image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=600&fit=crop',
      title: 'Recurrent Miscarriage to Success',
      description: 'After three losses, expert intervention led to a successful pregnancy.',
      couple: 'Divya & Karthik Iyer',
      age: '31 & 34 years',
      treatment: 'Recurrent Pregnancy Loss Treatment',
      duration: '12 months treatment',
      doctor: 'Dr. Indira Singh',
      fullStory: 'Three miscarriages left us heartbroken. Dr. Indira Singh identified underlying issues and created a specialized treatment protocol. With careful monitoring and immune therapy, we successfully carried to term. Our daughter is our miracle baby!',
      tags: ['Recurrent Miscarriage', 'Rainbow Baby'],
    },
    {
      id: 6,
      badge: 'Success',
      badgeVariant: 'success',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
      title: 'Egg Freezing to Motherhood',
      description: 'Preserved my fertility at 30 to successfully conceive at 35.',
      couple: 'Neha & Sanjay Verma',
      age: '35 & 37 years',
      treatment: 'Egg Freezing + IVF',
      duration: '5 years + 6 months',
      doctor: 'Dr. Kavita Jaymand',
      fullStory: 'At 30, I chose to freeze my eggs to focus on career. At 35, when we were ready, those frozen eggs gave us our beautiful daughter. Dr. Kavita Jaymand guidance throughout both processes was invaluable. Egg freezing gave me control over my fertility timeline!',
      tags: ['Egg Freezing', 'Career Planning', 'IVF'],
    },
  ];

  const filteredStories = successStories.filter(story => {
    if (activeFilter === 'All') return true;
    return story.tags.some(tag => tag.toLowerCase().includes(activeFilter.toLowerCase()));
  });

  const handleCardClick = (story) => {
    setSelectedStory(story);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedStory(null), 300);
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="text-center mb-8">
          <h1 className=" sm:text-4xl font-bold text-black title mb-3">
            Families Who Found <span className="text-gold">Hope With Us</span>
          </h1>
          <p className="sub-title sm:text-base text-gray-600">
            Real families, real success stories. These are the moments that inspire us every day.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`
                px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                ${activeFilter === filter
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
                }
              `}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Success Stories Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStories.map((story) => (
            <StoryCard
              key={story.id}
              story={story}
              onClick={() => handleCardClick(story)}
            />
          ))}
        </div>
      </div>

      {/* Story Modal */}
      <StoryModal
        story={selectedStory}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default SuccessStory;