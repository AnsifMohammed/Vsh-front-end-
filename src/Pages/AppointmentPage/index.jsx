import FormInput from '../../Components/Common/FormInput';
import Button from '../../Components/Common/Button';
import React, { useState } from 'react';
import { useToast } from '../../Components/Common/ToastProvider';
import { Calendar, Phone, Mail, Clock, CheckCircle, MessageCircle } from 'lucide-react';


// Main Appointment Booking Component
const AppointmentPage = () => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    phoneNumber: '',
    emailAddress: '',
    specialty: '',
    preferredDoctor: '',
    preferredDate: '',
    preferredTime: '',
    additionalNotes: '',
    sendReminder: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic frontend validation
    if (
      !formData.fullName ||
      !formData.age ||
      !formData.phoneNumber ||
      !formData.specialty ||
      !formData.preferredDate ||
      !formData.preferredTime
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/appointments",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (data.success) {
        toast.success("Appointment booked successfully!");

        // Reset form
        setFormData({
          fullName: '',
          age: '',
          phoneNumber: '',
          emailAddress: '',
          specialty: '',
          preferredDoctor: '',
          preferredDate: '',
          preferredTime: '',
          additionalNotes: '',
          sendReminder: false,
        });
      } else {
        toast.error("Failed to book appointment");
      }
    } catch (error) {
      console.error(error);
      toast.error("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };


  const handleWhatsApp = async () => {
    if (
      !formData.fullName ||
      !formData.phoneNumber ||
      !formData.specialty ||
      !formData.preferredDate ||
      !formData.preferredTime
    ) {
      toast.error("Please fill required fields before WhatsApp booking");
      return;
    }

    const whatsappNumber = "919876543210"; // 🔴 Replace with clinic number

    const message = `
New Appointment Request 🏥

👤 Name: ${formData.fullName}
🎂 Age: ${formData.age}
📞 Phone: ${formData.phoneNumber}
📧 Email: ${formData.emailAddress || "N/A"}

🩺 Specialty: ${formData.specialty}
👨‍⚕️ Doctor: ${formData.preferredDoctor || "Any doctor"}
📅 Date: ${formData.preferredDate}
⏰ Time: ${formData.preferredTime}

📝 Notes: ${formData.additionalNotes || "None"}
`;

    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappURL, "_blank");
  };


  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto pt-20">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="sm:text-4xl font-bold text-black mb-2 title text-black">
            Book Your <span className="text-gold">Appointment</span>
          </h1>
          <p className="sub-title sm:text-base">
            Take the first step towards your healthcare goals with our expert team
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Side - Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
              <div>
                {/* Appointment Details Section */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar className="w-5 h-5 text-gray-700" />
                    <h2 className=" text-black card-title">Appointment Details</h2>
                  </div>
                  <p className="card-sub-title text-gray-600">Please fill in your details to book an appointment</p>
                </div>

                {/* Personal Information */}
                <div className="mb-6">
                  <h3 className="card-title text-black mb-4">Personal Information</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormInput
                      label="Full Name"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      required
                    />
                    <FormInput
                      label="Age"
                      name="age"
                      type="number"
                      value={formData.age}
                      onChange={handleChange}
                      placeholder="Enter your age"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    <FormInput
                      label="Phone Number"
                      name="phoneNumber"
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      placeholder="Enter phone number"
                      required
                    />
                    <FormInput
                      label="Email Address"
                      name="emailAddress"
                      type="email"
                      value={formData.emailAddress}
                      onChange={handleChange}
                      placeholder="Enter email address"
                    />
                  </div>
                </div>

                {/* Appointment Information */}
                <div className="mb-6">
                  <h3 className="card-title text-black mb-4">Appointment Information</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Specialty <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="specialty"
                        value={formData.specialty}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 text-base rounded-md border border-gray-300 bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 outline-none"
                        required
                      >
                        <option value="">Select specialty</option>
                        <option value="cardiology">Cardiology</option>
                        <option value="dermatology">Dermatology</option>
                        <option value="pediatrics">Pediatrics</option>
                        <option value="orthopedics">Orthopedics</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Preferred Doctor
                      </label>
                      <select
                        name="preferredDoctor"
                        value={formData.preferredDoctor}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 text-base rounded-md border border-gray-300 bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 outline-none"
                      >
                        <option value="">Any doctor</option>
                        <option value="dr-smith">Dr. Smith</option>
                        <option value="dr-johnson">Dr. Johnson</option>
                        <option value="dr-williams">Dr. Williams</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    <FormInput
                      label="Preferred Date"
                      name="preferredDate"
                      type="date"
                      value={formData.preferredDate}
                      onChange={handleChange}
                      placeholder="MM/DD/YYYY"
                      required
                    />
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Preferred Time <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="preferredTime"
                        value={formData.preferredTime}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 text-base rounded-md border border-gray-300 bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 outline-none"
                        required
                      >
                        <option value="">Select time</option>
                        <option value="09:00">09:00 AM</option>
                        <option value="10:00">10:00 AM</option>
                        <option value="11:00">11:00 AM</option>
                        <option value="14:00">02:00 PM</option>
                        <option value="15:00">03:00 PM</option>
                        <option value="16:00">04:00 PM</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Additional Notes */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Additional Notes (Optional)
                  </label>
                  <textarea
                    name="additionalNotes"
                    value={formData.additionalNotes}
                    onChange={handleChange}
                    placeholder="Any specific concerns or requirements..."
                    rows="3"
                    className="w-full px-4 py-2.5 text-base rounded-md border border-gray-300 bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 outline-none resize-none"
                  />
                </div>

                {/* Checkbox */}
                <div className="mb-6">
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="sendReminder"
                      checked={formData.sendReminder}
                      onChange={handleChange}
                      className="mt-1 w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                    />
                    <span className="text-sm text-gray-700">
                      Send appointment reminder via WhatsApp
                    </span>
                  </label>
                </div>

                {/* Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Button
                    onClick={handleSubmit}
                    variant="primary"
                    fullWidth
                  >
                    Confirm Booking
                  </Button>
                  <Button
                    onClick={handleWhatsApp}
                    variant="outline"
                    fullWidth
                    startIcon={<MessageCircle className="w-5 h-5" />}
                  >
                    Book via WhatsApp
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Help & Info */}
          <div className="space-y-6">
            {/* Need Help Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="card-title text-black mb-4">Need Help?</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Call Us</p>
                    <p className="text-sm text-gray-600">+91 98765 43210</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MessageCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">WhatsApp</p>
                    <p className="text-sm text-gray-600">Chat with us</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Email</p>
                    <p className="text-sm text-gray-600">info@healthcare.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Clinic Hours */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-purple-600" />
                <h3 className="card-title text-black">Clinic Hours</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-700">Monday - Friday</span>
                  <span className="font-medium text-gray-900">8:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Saturday</span>
                  <span className="font-medium text-gray-900">9:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Sunday</span>
                  <span className="font-medium text-gray-900">10:00 AM - 2:00 PM</span>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-3">
                *Bookings are open anytime 24/7
              </p>
            </div>

            {/* What to Expect */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="card-title text-black mb-4">What to Expect</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-700">Quick medical history review</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-700">Comprehensive examination</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-700">Personalized treatment plan</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-700">Clear explanation of next steps</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentPage;