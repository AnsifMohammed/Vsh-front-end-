import FormInput from '../../../Components/Common/FormInput';
import Badge from '../../../Components/Common/Badge';
import Button from '../../../Components/Common/Button';
import { useState } from 'react';
import { Heart, Phone, Mail, MapPin, Clock,Search, Calendar, User, ArrowRight, X } from 'lucide-react';

const ArticleModal = ({ post, isOpen, onClose }) => {
  if (!isOpen || !post) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm " style={{paddingTop:'144px'}}>
      <div className="relative w-full max-w-2xl max-h-[60vh] overflow-y-auto bg-white rounded-2xl shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        {/* Hero Image */}
        <div className="relative h-64 overflow-hidden rounded-t-2xl">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Badge variant="primary" type="solid" size="small">
              Women's Health
            </Badge>
            <div className="flex items-center gap-1 text-xs text-gray-600">
              <Calendar className="w-3.5 h-3.5" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-600">
              <Clock className="w-3.5 h-3.5" />
              <span>{post.readTime}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-600">
              <User className="w-3.5 h-3.5" />
              <span>{post.author}</span>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            {post.title}
          </h2>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag, index) => (
              <Badge key={index} variant="light" type="soft" size="small">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Article Content */}
          <div className="prose prose-sm sm:prose max-w-none mb-6">
            <p className="text-gray-700 leading-relaxed mb-4">
              {post.fullDescription || post.description}
            </p>
            
            <p className="text-gray-700 leading-relaxed mb-4">
              {post.content1 || "PCOS is one of the most common hormonal disorders affecting women of reproductive age. What it can cause: Conception challenges with proper treatment and lifestyle modifications, many women with PCOS can achieve healthy pregnancies."}
            </p>

            {post.content2 && (
              <p className="text-gray-700 leading-relaxed mb-4">
                {post.content2}
              </p>
            )}
          </div>

          {/* Author Section */}
          <div className="bg-purple-50 rounded-xl p-5 mb-6">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center flex-shrink-0">
                <User className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">
                  Written by {post.author}
                </h3>
                <p className="text-sm text-gray-600">
                  {post.authorBio || "Specialist in women's health with years of experience helping patients achieve their healthcare goals."}
                </p>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <Button
            variant="primary"
            fullWidth
            startIcon={<Calendar className="w-5 h-5" />}
          >
            Book Consultation
          </Button>
        </div>
      </div>
    </div>
  );
};

// Blog Card Component
const BlogCard = ({ post, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 cursor-pointer"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3">
          <Badge variant={post.categoryColor} type="solid" size="small">
            {post.category}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Meta Info */}
        <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
          <div className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>{post.readTime}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="card-title  text-black mb-2 line-clamp-2">
          {post.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 mb-4 line-clamp-2 card-sub-title">
          {post.description}
        </p>

        {/* Author */}
        <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-100">
          <User className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-700">{post.author}</span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag, index) => (
            <Badge key={index} variant="light" type="soft" size="small">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Read More Button */}
        <Button
          variant="outline"
          size="sm"
          fullWidth
          endIcon={<ArrowRight className="w-4 h-4" />}
        >
          Read Article
        </Button>
      </div>
    </div>
  );
};

// Main Blog Component
const BlogCards = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filters = [
    { name: 'All', icon: '📚' },
    { name: 'Fertility', icon: '🌸' },
    { name: "Women's Health", icon: '👩' },
    { name: "Men's Fertility", icon: '👨' },
    { name: 'Pregnancy', icon: '🤰' },
    { name: 'Surgery', icon: '🏥' },
    { name: 'Lifestyle', icon: '💪' },
  ];

  const blogPosts = [
    {
      id: 1,
      category: 'IVF Treatments',
      categoryColor: 'primary',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop',
      date: '12/01/2024',
      readTime: '8 min read',
      title: 'PCOS and Pregnancy: What You Need to Know',
      description: 'Polycystic Ovary Syndrome affects many women. Discover how PCOS impacts fertility and the treatment options available.',
      fullDescription: 'Polycystic Ovary Syndrome (PCOS) is one of the most common hormonal disorders affecting women of reproductive age.',
      content1: "PCOS is one of the most common hormonal disorders affecting women of reproductive age. What it can cause: Conception challenges with proper treatment and lifestyle modifications, many women with PCOS can achieve healthy pregnancies.",
      content2: "Understanding your condition is the first step toward effective management. Our specialists work with you to create personalized treatment plans that address your specific needs and fertility goals.",
      author: 'Dr. Meera Patel',
      authorBio: "Specialist in women's health with years of experience helping patients achieve their healthcare goals.",
      tags: ['PCOS', 'Pregnancy', 'Hormones'],
    },
    {
      id: 2,
      category: 'IVF Fertility',
      categoryColor: 'success',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=600&fit=crop',
      date: '11/28/2024',
      readTime: '6 min read',
      title: 'Male Fertility: Breaking the Silence on Reproductive Health',
      description: 'Explore male fertility issues, diagnosis, and modern treatment options.',
      fullDescription: 'Male fertility issues affect millions of couples worldwide, yet they remain a topic that is often overlooked.',
      content1: "Understanding male fertility is crucial for couples trying to conceive. From sperm count to motility, various factors play a role in successful conception.",
      author: 'Dr. Arjun Murthy',
      authorBio: "Expert in male reproductive health with over 15 years of clinical experience.",
      tags: ['Male fertility', 'Diagnosis', 'Treatment'],
    },
    {
      id: 3,
      category: 'IVF Guide',
      categoryColor: 'warning',
      image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=600&fit=crop',
      title: 'Understanding IVF: A Complete Guide for Couples',
      description: 'Learn everything about In Vitro Fertilization - from the process to success factors and what to expect throughout your journey.',
      fullDescription: 'In Vitro Fertilization (IVF) has revolutionized fertility treatment, offering hope to millions of couples worldwide.',
      content1: "IVF is a complex procedure that requires careful planning and expert medical care. This comprehensive guide walks you through each step of the process.",
      author: 'Dr. Shanmugapriya',
      authorBio: "Leading fertility specialist with expertise in IVF and reproductive medicine.",
      date: '11/25/2024',
      readTime: '10 min read',
      tags: ['IVF', 'Guide', 'Couples'],
    },
    {
      id: 4,
      category: 'IVF Fertility',
      categoryColor: 'info',
      image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&h=600&fit=crop',
      title: 'Pregnancy After 35: What to Expect on Your Journey to Motherhood',
      description: 'Important considerations for women planning pregnancy after 35, including risks, benefits, and tips to have a healthy pregnancy.',
      fullDescription: 'Planning a pregnancy after 35 comes with unique considerations and opportunities for preparation.',
      content1: "Women over 35 can have healthy, successful pregnancies with proper care and medical support. Understanding the specific considerations is key.",
      author: 'Dr. Indira Singh',
      authorBio: "Maternal-fetal medicine specialist focused on high-risk pregnancies.",
      date: '11/22/2024',
      readTime: '7 min read',
      tags: ['Advanced Maternal Age', 'Pregnancy', 'Prenatal Care'],
    },
    {
      id: 5,
      category: 'IVF Surgery',
      categoryColor: 'secondary',
      image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&h=600&fit=crop',
      title: 'Laparoscopic Surgery: Minimally Invasive Solutions',
      description: 'Discover how laparoscopic surgery can help with common gynecological conditions and faster recovery times.',
      fullDescription: 'Laparoscopic surgery represents a major advancement in gynecological care, offering minimally invasive solutions.',
      content1: "Modern laparoscopic techniques allow for precise surgical intervention with minimal disruption to surrounding tissues and faster recovery times.",
      author: 'Dr. Priya',
      authorBio: "Board-certified surgeon specializing in minimally invasive gynecological procedures.",
      date: '11/20/2024',
      readTime: '9 min read',
      tags: ['Laparoscopic', 'Surgery', 'Recovery'],
    },
    {
      id: 6,
      category: 'IVF Lifestyle',
      categoryColor: 'primary',
      image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&h=600&fit=crop',
      title: 'Nutrition and Fertility: The Essential Foods That Support Reproductive Health',
      description: 'Essential dietary recommendations, lifestyle and support your journey to conception naturally.',
      fullDescription: 'Nutrition plays a crucial role in reproductive health and can significantly impact fertility outcomes.',
      content1: "A balanced diet rich in specific nutrients can enhance fertility for both men and women. Learn which foods to prioritize and which to avoid.",
      author: 'Dr. Kavita Jaymand',
      authorBio: "Nutritionist and fertility specialist with focus on holistic reproductive health.",
      date: '11/18/2024',
      readTime: '6 min read',
      tags: ['Nutrition', 'Fertility', 'Natural Health'],
    },
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesFilter = activeFilter === 'All' || post.tags.some(tag => 
      tag.toLowerCase().includes(activeFilter.toLowerCase())
    );
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleCardClick = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedPost(null), 300);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 pt-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-6">
            <h1 className=" sm:text-4xl  text-black mb-2 title">
              Health & <span className="text-gold">Fertility Blog</span>
            </h1>
            <p className="sub-title sm:text-base text-gray-600 ">
              Expert insights, tips, and guidance from our medical professionals
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-6">
            <FormInput
              type="text"
              placeholder="Search articles..."
              leftIcon={<Search className="w-5 h-5" />}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {filters.map((filter) => (
              <button
                key={filter.name}
                onClick={() => setActiveFilter(filter.name)}
                className={`
                  px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                  ${activeFilter === filter.name
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-white text-gray-700 border border-gray-600 hover:bg-gray-50'
                  }
                `}
              >
                <span className="mr-1.5">{filter.icon}</span>
                {filter.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <BlogCard 
                key={post.id} 
                post={post} 
                onClick={() => handleCardClick(post)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No articles found matching your criteria.</p>
          </div>
        )}
      </div>


      {/* Article Modal */}
      <ArticleModal 
        post={selectedPost}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};


export default BlogCards;