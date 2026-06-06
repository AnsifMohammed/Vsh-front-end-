import FormInput from '../../../Components/Common/FormInput';
import Badge from '../../../Components/Common/Badge';
import Button from '../../../Components/Common/Button';
import { useState, useEffect } from 'react';
import { Heart, Phone, Mail, MapPin, Clock, Search, Calendar, User, ArrowRight, X } from 'lucide-react';
import api from '../../../api/api';

const ArticleModal = ({ post, isOpen, onClose }) => {
  if (!isOpen || !post) return null;

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm " style={{ paddingTop: '144px' }}>
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
              {post.category || 'General'}
            </Badge>
            <div className="flex items-center gap-1 text-xs text-gray-600">
              <Calendar className="w-3.5 h-3.5" />
              <span>{formatDate(post.publishedDate)}</span>
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
            {post.tags?.map((tag, index) => (
              <Badge key={index} variant="light" type="soft" size="small">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Article Content */}
          <div
            className="prose prose-sm sm:prose max-w-none mb-6"
            dangerouslySetInnerHTML={{ __html: post.content || '<p>No content available.</p>' }}
          />

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
            onClick={() => window.location.href = '/appointment'}
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
  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  // Get category color
  const getCategoryColor = (category) => {
    const colors = {
      'IVF Treatments': 'primary',
      'IVF Fertility': 'success',
      'IVF Guide': 'warning',
      'IVF Surgery': 'secondary',
      'IVF Lifestyle': 'info',
      'Pregnancy': 'primary',
      'Women Health': 'success',
      'Men Fertility': 'info',
      'Lifestyle': 'warning'
    };
    return colors[category] || 'primary';
  };

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
          <Badge variant={getCategoryColor(post.category)} type="solid" size="small">
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
            <span>{formatDate(post.publishedDate)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>{post.readTime}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="card-title text-black mb-2 line-clamp-2">
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
          {post.tags?.slice(0, 3).map((tag, index) => (
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

  // API state
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const filters = [
    { name: 'All', icon: '📚' },
    { name: 'IVF Treatments', icon: '🧬' },
    { name: 'IVF Fertility', icon: '🌸' },
    { name: 'Women Health', icon: '👩' },
    { name: 'Men Fertility', icon: '👨' },
    { name: 'Pregnancy', icon: '🤰' },
    { name: 'IVF Surgery', icon: '🏥' },
    { name: 'Lifestyle', icon: '💪' },
  ];

  // Fetch blogs from API
  useEffect(() => {
    fetchBlogs();
  }, [currentPage, activeFilter, searchQuery]);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams({
        page: currentPage,
        limit: 9
      });

      // Filter by category if not 'All'
      if (activeFilter !== 'All') {
        params.append('category', activeFilter);
      }

      // Search query
      if (searchQuery) {
        params.append('search', searchQuery);
      }

      const response = await api.get(`/blogs?${params}`);

      if (response.data.success) {
        setBlogs(response.data.data);
        setTotalPages(response.data.totalPages);
      }
    } catch (err) {
      console.error('Failed to fetch blogs:', err);
      setError('Failed to load blog posts. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedPost(null), 300);
  };

  // Filter blogs locally for search
  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = !searchQuery ||
      blog.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.description?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter = activeFilter === 'All' || blog.category === activeFilter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 pt-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-6">
            <h1 className="sm:text-4xl text-black mb-2 title">
              Health & <span className="text-gold">Fertility Blog</span>
            </h1>
            <p className="sub-title sm:text-base text-gray-600">
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
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1); // Reset to first page on search
              }}
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {filters.map((filter) => (
              <button
                key={filter.name}
                onClick={() => {
                  setActiveFilter(filter.name);
                  setCurrentPage(1);
                }}
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
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-center">
            {error}
          </div>
        ) : filteredBlogs.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBlogs.map((post) => (
                <BlogCard
                  key={post._id}
                  post={post}
                  onClick={() => handleCardClick(post)}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <span className="text-gray-600">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No articles found matching your criteria.</p>
            <button
              onClick={() => {
                setActiveFilter('All');
                setSearchQuery('');
                setCurrentPage(1);
              }}
              className="mt-4 text-teal-600 hover:text-teal-700 font-medium"
            >
              Clear Filters
            </button>
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