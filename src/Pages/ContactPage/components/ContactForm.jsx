import FormInput from '../../../Components/Common/FormInput';
import Badge from '../../../Components/Common/Badge';
import Button from '../../../Components/Common/Button';
import Card from "../../../Components/Common/Card";
import { useState, useEffect } from 'react';
import { useToast } from '../../../Components/Common/ToastProvider';
import { Heart, Phone, Mail, MapPin, Clock, AlertCircle, MessageCircle, Send } from 'lucide-react';

const ContactForm = () => {
  const toast = useToast();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    subject: '',
    message: ''
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setFormData(prev => ({
        ...prev,
        fullName: storedUser.name || '',
        email: storedUser.email || '',
        phoneNumber: storedUser.phoneNumber || storedUser.phone || ''
      }));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    toast.success('Message sent successfully!');
  };

  return (
    <div className="min-h-screen mx-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className=" sm:text-4xl lg:text-5xl  text-black mb-3 itle">
            Get in <span className="text-gold">Touch</span>
          </h1>
          <p className="text-gray-600  sm:text-base max-w-2xl mx-auto sub-title">
            We're here to help you on your journey. Reach out to us anytime for support and guidance.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
          {/* Left Column - Form */}
          <div className="h-auto lg:col-span-3 ">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sm:p-8 h-auto">
              <div className="flex items-center gap-2 mb-4 h-auto">
                <Send />
                <h2 className="text-xl  text-black cad-title ">Send us a Message</h2>
              </div>

              <p className="card-sub-title text-gray-600 mb-6 ">
                Fill out the form below and we'll get back to you within 24 hours
              </p>

              <div className="space-y-4 h-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-nunito">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 text-sm rounded-md border border-gray-300 focus:border-purple-600 focus:ring-2 focus:ring-purple-600/20 transition-all duration-200 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 text-sm rounded-md border border-gray-300 focus:border-purple-600 focus:ring-2 focus:ring-purple-600/20 transition-all duration-200 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 text-sm rounded-md border border-gray-300 focus:border-purple-600 focus:ring-2 focus:ring-purple-600/20 transition-all duration-200 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="General Inquiry"
                      className="w-full px-4 py-2.5 text-sm rounded-md border border-gray-300 focus:border-purple-600 focus:ring-2 focus:ring-purple-600/20 transition-all duration-200 outline-none placeholder:text-gray-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="10"
                    placeholder="Please describe how we can help you..."
                    className="w-full px-4 py-2.5 text-sm rounded-md border border-gray-300 focus:border-purple-600 focus:ring-2 focus:ring-purple-600/20 transition-all duration-200 outline-none placeholder:text-gray-400 resize-none"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleSubmit}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-6 rounded-md transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <Send />
                  Send Message
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Info */}
          <div className="space-y-6 lg:col-span-2">
            {/* Call Us */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-purple-600" />
                </div>
                <div className="w-120">
                  <p className="text-sm font-semibold text-gray-900 mb-1">Call Us</p>
                  <p className="text-sm text-gray-600 mb-0.5">Speak directly with our team</p>
                  <div className='flex justify-between w-full items-center flex-wrap'>
                    <p className="text-yellow-600 font-semibold">+91 98765-43210</p>
                    <p className="text-xs text-gray-500 mt-1">24/7 Emergency Support</p>
                  </div>
                </div>
              </div>
            </div>

            {/* WhatsApp */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-6 h-6 text-green-600" />
                </div>
                <div className="w-120">
                  <p className="text-sm font-semibold text-gray-900 mb-1">WhatsApp</p>
                  <p className="text-sm text-gray-600 mb-0.5">Quick responses & appointment booking</p>
                  <div className='flex justify-between w-full items-center flex-wrap'>
                    <p className="text-yellow-600 font-semibold">Chat Now</p>
                    <p className="text-xs text-gray-500 mt-1">9 AM - 9 PM Daily</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-red-600" />
                </div>
                <div className=" w-120">
                  <p className="text-sm font-semibold text-gray-900 mb-1">Email</p>
                  <p className="text-sm text-gray-600 mb-0.5">Detailed queries & medical reports</p>
                  <div className='flex justify-between w-full items-center flex-wrap'><p className="text-yellow-600 font-semibold text-xs break-all">info@ayushifertility.com</p>
                    <p className="text-xs text-gray-500 mt-1">Response within 24 hours</p></div>

                </div>
              </div>
            </div>

            {/* Clinic Hours */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-purple-600" />
                <h3 className=" card-title">Clinic Hours</h3>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">Monday - Friday</span>
                  <span className="text-sm font-semibold text-gray-900">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">Saturday</span>
                  <span className="text-sm font-semibold text-gray-900">9:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">Sunday</span>
                  <span className="text-sm font-semibold text-gray-900">10:00 AM - 2:00 PM</span>
                </div>
                <div className="pt-2 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Emergency</span>
                    <span className="text-sm font-bold text-green-600">Available 24/7</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Health Calculators Login Card */}
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg shadow-sm border border-purple-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Heart className="w-5 h-5 text-red-500" />
                <h3 className=" card-title">Health Calculators</h3>
              </div>

              <p className="text-sm text-gray-600 mb-4">
                Track your health metrics with our specialized calculators designed for women's wellness
              </p>

              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-purple-200 text-purple-700 px-2 py-1 rounded-full font-semibold">BMI</span>
                  <span className="text-sm text-gray-600">Body Mass Index Calculator</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-pink-200 text-pink-700 px-2 py-1 rounded-full font-semibold">Cycle</span>
                  <span className="text-sm text-gray-600">Menstrual Cycle Tracker</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-blue-200 text-blue-700 px-2 py-1 rounded-full font-semibold">Fertility</span>
                  <span className="text-sm text-gray-600">Ovulation & Fertility Calculator</span>
                </div>
              </div>

              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2.5 px-4 rounded-md transition-colors duration-200">
                Login to Access Calculators
              </button>

              <p className="text-xs text-gray-600 text-center mt-3">
                Sign in to your account to use all features
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;