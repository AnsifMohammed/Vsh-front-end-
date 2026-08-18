import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import api from '../../../api/api';
import { X, Eye, Edit2, Save, Image as ImageIcon } from 'lucide-react';
import { toast } from '../../../Components/Common/ToastProvider';

// Quill editor modules and formats
const quillModules = {
  toolbar: [
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'align': [] }],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    ['link', 'image'],
    ['clean']
  ],
};

const quillFormats = [
  'header',
  'bold', 'italic', 'underline', 'strike',
  'color', 'background',
  'align',
  'list', 'bullet',
  'link', 'image'
];

// Categories matching the backend enum
const CATEGORIES = [
  'IVF Treatments',
  'IVF Fertility', 
  'IVF Guide',
  'IVF Surgery',
  'IVF Lifestyle',
  'Pregnancy',
  'Women Health',
  'Men Fertility',
  'Lifestyle'
];

const BlogForm = ({ blog, onClose, onSave }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    category: 'IVF Treatments',
    author: '',
    authorBio: '',
    tags: '',
    image: '',
    readTime: '5 min read',
    status: 'draft'
  });

  // Load blog data if editing
  useEffect(() => {
    if (blog) {
      setFormData({
        title: blog.title || '',
        description: blog.description || '',
        content: blog.content || '',
        category: blog.category || 'IVF Treatments',
        author: blog.author || '',
        authorBio: blog.authorBio || '',
        tags: blog.tags ? blog.tags.join(', ') : '',
        image: blog.image || '',
        readTime: blog.readTime || '5 min read',
        status: blog.status || 'draft'
      });
    }
  }, [blog]);

  // Calculate read time based on content length
  useEffect(() => {
    const wordCount = formData.content.replace(/<[^>]*>/g, '').trim().split(/\s+/).length;
    const readTimeCalc = Math.max(1, Math.ceil(wordCount / 200));
    setFormData(prev => ({
      ...prev,
      readTime: `${readTimeCalc} min read`
    }));
  }, [formData.content]);

  // Handle image upload via backend API (base64)
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast.warning('Image size must be less than 2MB');
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.warning('Please select an image file');
      return;
    }

    setUploadingImage(true);
    
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData(prev => ({
        ...prev,
        image: reader.result
      }));
      setUploadingImage(false);
      toast.success('Image uploaded successfully');
    };
    reader.onerror = () => {
      toast.error('Failed to read image file');
      setUploadingImage(false);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Process tags
      const processedTags = formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);

      const blogData = {
        ...formData,
        tags: processedTags
      };

      let response;
      if (blog) {
        response = await api.put(`/admin/blogs/${blog._id}`, blogData);
      } else {
        response = await api.post('/admin/blogs', blogData);
      }

      if (response.data.success) {
        toast.success(blog ? 'Blog post updated successfully!' : 'Blog post created successfully!');
        onSave(response.data.data);
      }
    } catch (error) {
      console.error('Error saving blog:', error);
      toast.error(error.response?.data?.message || 'Failed to save blog post');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleContentChange = (value) => {
    setFormData(prev => ({
      ...prev,
      content: value
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-6xl max-h-[60vh] overflow-y-auto bg-white rounded-2xl shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center z-10">
          <h2 className="text-2xl font-bold text-gray-800">
            {blog ? 'Edit Blog Post' : 'Create New Blog Post'}
          </h2>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setPreviewMode(!previewMode)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                previewMode 
                  ? 'bg-teal-100 text-teal-700' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {previewMode ? <Edit2 className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              {previewMode ? 'Edit' : 'Preview'}
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {previewMode ? (
            // PREVIEW MODE
            <div className="max-w-4xl mx-auto">
              {/* Featured Image */}
              {formData.image && (
                <div className="relative h-64 md:h-80 rounded-xl overflow-hidden mb-6">
                  <img
                    src={formData.image}
                    alt={formData.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              {/* Category Badge */}
              <div className="mb-4">
                <span className="px-4 py-2 bg-teal-100 text-teal-700 rounded-full text-sm font-medium">
                  {formData.category}
                </span>
                <span className={`ml-3 px-4 py-2 rounded-full text-sm font-medium ${
                  formData.status === 'published' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {formData.status === 'published' ? 'Published' : 'Draft'}
                </span>
              </div>
              
              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {formData.title || 'Untitled Blog Post'}
              </h1>
              
              {/* Meta Info */}
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
                <span>{formData.readTime}</span>
                <span>•</span>
                <span>{formData.tags ? formData.tags.split(',').filter(t => t.trim()).length : 0} tags</span>
              </div>
              
              {/* Description */}
              <p className="text-lg text-gray-600 mb-6 italic">
                {formData.description || 'No description provided.'}
              </p>
              
              {/* Content */}
              <div 
                className="prose prose-lg max-w-none mb-8"
                dangerouslySetInnerHTML={{ __html: formData.content || '<p>No content yet.</p>' }}
              />
              
              {/* Author Section */}
              <div className="bg-gray-50 rounded-xl p-6 mt-8">
                <p className="font-semibold text-gray-900 mb-2">Written by {formData.author || 'Unknown Author'}</p>
                <p className="text-sm text-gray-600">{formData.authorBio || 'No author bio provided.'}</p>
              </div>
            </div>
          ) : (
            // EDIT MODE
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Content - Left Column */}
              <div className="lg:col-span-2 space-y-6">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Blog Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    placeholder="Enter blog title"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Short Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows={3}
                    placeholder="Enter a brief description"
                    maxLength={500}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {formData.description.length}/500 characters
                  </p>
                </div>

                {/* Content Editor */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Blog Content *
                  </label>
                  <div className="border border-gray-300 rounded-lg overflow-hidden">
                    <ReactQuill
                      theme="snow"
                      value={formData.content}
                      onChange={handleContentChange}
                      modules={quillModules}
                      formats={quillFormats}
                      placeholder="Write your blog content here..."
                      className="bg-white"
                      style={{ height: '250px' }}
                    />
                  </div>
                </div>
              </div>

              {/* Sidebar - Right Column */}
              <div className="space-y-6">
                {/* Featured Image */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Featured Image *
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                    {formData.image ? (
                      <div className="relative">
                        <img
                          src={formData.image}
                          alt="Featured"
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
                          className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center justify-center w-full h-48 cursor-pointer hover:bg-gray-50 transition-colors rounded-lg">
                        <ImageIcon className="w-12 h-12 text-gray-400 mb-2" />
                        <span className="text-sm text-gray-600">
                          {uploadingImage ? 'Uploading...' : 'Click to upload image'}
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  >
                    {CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* Author */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Author Name *
                  </label>
                  <input
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                    required
                    placeholder="Dr. John Doe"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>

                {/* Author Bio */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Author Bio
                  </label>
                  <textarea
                    name="authorBio"
                    value={formData.authorBio}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Brief author biography"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                  />
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tags
                  </label>
                  <input
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                    placeholder="PCOS, Pregnancy, IVF (comma separated)"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>

                {/* Read Time Display */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Read Time:</span> {formData.readTime}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Footer Actions */}
          <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 mt-6 -mx-6 -mb-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
            >
              Cancel
            </button>
            {!previewMode && (
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="w-5 h-5" />
                {isSubmitting ? 'Saving...' : (blog ? 'Update Post' : 'Create Post')}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlogForm;