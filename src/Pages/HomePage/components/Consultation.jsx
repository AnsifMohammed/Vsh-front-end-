import FormInput from '../../../Components/Common/FormInput';
import Badge from '../../../Components/Common/Badge';
import Button from '../../../Components/Common/Button';
import Card from "../../../Components/Common/Card";
import { useState } from 'react';
import { useToast } from '../../../../src/Components/Common/ToastProvider';
import api from "../../../api/api";
import { Heart, Phone, Mail, MapPin, Clock, AlertCircle } from 'lucide-react';

const Consultation = () => {
  const toast = useToast();
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    service: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/consultation", {
        fullName: formData.fullName,
        phoneNumber: formData.phoneNumber,
        email: formData.email,
        serviceInterestedIn: formData.service,
        message: formData.message
      });

      toast.success("Consultation request submitted successfully");

      // Reset form
      setFormData({
        fullName: "",
        phoneNumber: "",
        email: "",
        service: "",
        message: ""
      });
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message ||
        "Something went wrong. Please try again"
      );
    }
  };


  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-12 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <Badge
            variant="primary"
            type="soft"
            icon={<Heart className="w-4 h-4" />}
          >
            Get In Touch
          </Badge>

          <h2 className=" sm:text-4xl lg:text-5xl  text-black mt-4 mb-3 title px-4">
            Ready to Start Your <span className="text-gold">Healthcare Journey?</span>
          </h2>

          <p className="text-gray-600  sm:text-base max-w-2xl mx-auto sub-title  px-4">
            Contact us today for personalized care and support. We're here to help you every step of the way.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {/* Left Column - Form */}
          <div className="w-full">
            <Card size='full'>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="card-title sm:text-xl  ">Book Your Consultation</h3>
              </div>

              <p className=" sm:text-sm text-gray-600 mb-6 card-sub-title">
                Fill out the form below and we'll get back to you within 24 hours.
              </p>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormInput
                    label="Full Name"
                    name="fullName"
                    placeholder="Enter your full name"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                  <FormInput
                    label="Phone Number"
                    name="phoneNumber"
                    type="tel"
                    placeholder="+91-XXXX-XXXXX"
                    required
                    value={formData.phoneNumber}
                    onChange={handleChange}
                  />
                </div>

                <FormInput
                  label="Email Address"
                  name="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Service Interested In
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 text-base rounded-md border border-gray-300 bg-white focus:border-purple-600 focus:ring-2 focus:ring-purple-600/20 transition-all duration-200 outline-none"
                  >
                    <option value="">Select a service</option>
                    <option value="fertility">Fertility Treatment</option>
                    <option value="consultation">General Consultation</option>
                    <option value="pregnancy">Pregnancy Care</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Message
                  </label>
                  <textarea
                    name="message"
                    placeholder="Tell us about your concerns or questions..."
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    className="w-full px-4 py-2.5 text-base rounded-md border border-gray-300 bg-white focus:border-purple-600 focus:ring-2 focus:ring-purple-600/20 transition-all duration-200 outline-none placeholder:text-gray-400 resize-none"
                  />
                </div>

                <Button onClick={handleSubmit} variant="primary" fullWidth>
                  Submit Request
                </Button>
              </div>
            </Card>
          </div>

          {/* Right Column - Contact Info */}
          <div className="space-y-6">
            {/* Contact Information Card */}
            <Card size='full'>
              <div className="flex items-center gap-2 mb-6 sm:mb-8">
                <Phone className="w-5 h-5 text-purple-600" />
                <h3 className="card-title sm:text-lg ">Contact Information</h3>
              </div>

              <div className="space-y-6 sm:space-y-0 sm:flex sm:gap-6 lg:gap-8">
                <div className="space-y-6 flex-1">
                  {/* Call Us */}
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-gray-900">Call Us</p>
                      <a
                        href="tel:+916789654321"
                        className="text-sm text-purple-600 hover:underline"
                      >
                        +91 6789654321
                      </a>
                      <p className="text-xs text-gray-500">24/7 Emergency Line</p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-gray-900">Email</p>
                      <a
                        href="mailto:vsh@gmail.com"
                        className="text-sm text-purple-600 hover:underline"
                      >
                        vsh@gmail.com
                      </a>
                      <p className="text-xs text-gray-500">General Inquiries</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6 flex-1">
                  {/* WhatsApp */}
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">WhatsApp</p>
                      <a
                        href="https://wa.me/911234567875"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-purple-600 hover:underline"
                      >
                        +91 1234567875
                      </a>
                      <p className="text-xs text-gray-500">Quick Response</p>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-gray-900">Location</p>
                      <p className="text-sm text-gray-600">123 Healthcare Street</p>
                      <p className="text-sm text-gray-600">Mumbai, Maharashtra</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Hospital Hours Card */}
            <Card size='full'>
              <div className="flex items-center gap-2 mb-6 sm:mb-8">
                <Clock className="w-5 h-5 text-purple-600" />
                <h3 className="card-title sm:text-lg ">Hospital Hours</h3>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="card-sub-title sm:text-sm text-gray-600">Monday - Saturday</span>
                  <span className="text-xs sm:text-sm font-semibold text-purple-600">8:30 AM - 8:00 PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="card-sub-title sm:text-sm text-gray-600">Sunday</span>
                  <span className="text-xs sm:text-sm font-semibold text-purple-600">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="card-sub-title sm:text-sm text-gray-600">Emergency</span>
                  <span className="text-xs sm:text-sm font-semibold text-red-600">24/7 Available</span>
                </div>
              </div>
            </Card>

            {/* Emergency Card */}
            <Card className="bg-yellow-50 border border-yellow-200" size='full'>
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="card-title text-black mb-2 sm:mb-4">Emergency Care</h4>
                  <p className="text-xs text-gray-600 mb-3">
                    24/7 emergency services available for critical cases
                  </p>
                  <a
                    href="tel:+916789654321"
                    className="card-sub-title inline-flex items-center justify-center
             text-yellow-700 border border-yellow-400
             px-3 py-1.5 rounded-md
             hover:bg-yellow-100 transition-colors"
                  >
                    Call Emergency Line
                  </a>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Consultation;