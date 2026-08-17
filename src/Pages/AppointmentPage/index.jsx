import FormInput from '../../Components/Common/FormInput';
import Button from '../../Components/Common/Button';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useToast } from '../../Components/Common/ToastProvider';
import { Calendar, Phone, Mail, Clock, CheckCircle, MessageCircle, Save, Eye } from 'lucide-react';
import api from "../../api/api";

// Main Appointment Booking Component
const AppointmentPage = () => {
  const location = useLocation();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [savedAppointments, setSavedAppointments] = useState([]);
  const [showSaved, setShowSaved] = useState(false);
  const [doctors, setDoctors] = useState([]);
  
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
  });

  // Get today's date for min date validation
  const today = new Date().toISOString().split('T')[0];

  const formatAppointmentDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    const day = date.getUTCDate();
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = months[date.getUTCMonth()];
    const year = date.getUTCFullYear();
    return `${day} ${month} ${year}`;
  };

  // Check if user is logged in
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);
    
    // Load saved appointments from localStorage
    if (storedUser) {
      const saved = localStorage.getItem(`appointments_${storedUser.id}`);
      if (saved) {
        try {
          setSavedAppointments(JSON.parse(saved));
        } catch {
          console.error("Error loading saved appointments");
        }
      }
    }

    // Fetch doctors from API
    const fetchDoctors = async () => {
      try {
        const response = await api.get("/doctors");
        if (response.data.success) {
          setDoctors(response.data.data);
        }
      } catch (err) {
        console.error("Failed to load doctors:", err);
      }
    };
    fetchDoctors();
  }, []);

  // Auto-fill form if user is logged in
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        fullName: user.name || prev.fullName || '',
        emailAddress: user.email || prev.emailAddress || '',
        phoneNumber: user.phoneNumber || user.phone || prev.phoneNumber || ''
      }));
    }
  }, [user]);

  // Pre-populate doctor and specialty from location state or query params
  useEffect(() => {
    const state = location.state;
    const searchParams = new URLSearchParams(location.search);
    const docFromParam = searchParams.get('doctor');
    const specFromParam = searchParams.get('specialty');

    const selectedDoctor = state?.doctorName || state?.doctor || docFromParam;
    const selectedSpecialty = state?.specialty || specFromParam;

    if (selectedDoctor || selectedSpecialty) {
      setFormData(prev => ({
        ...prev,
        ...(selectedDoctor && { preferredDoctor: selectedDoctor }),
        ...(selectedSpecialty && { specialty: selectedSpecialty })
      }));
    }
  }, [location]);

  // Ensure preferredDoctor matches exact name in fetched doctors list if available
  useEffect(() => {
    if (doctors.length > 0 && formData.preferredDoctor) {
      const match = doctors.find(
        (doc) =>
          doc.name.toLowerCase() === formData.preferredDoctor.toLowerCase() ||
          doc.name.toLowerCase().includes(formData.preferredDoctor.toLowerCase()) ||
          formData.preferredDoctor.toLowerCase().includes(doc.name.toLowerCase())
      );
      if (match && match.name !== formData.preferredDoctor) {
        setFormData(prev => ({ ...prev, preferredDoctor: match.name }));
      }
    }
  }, [doctors, formData.preferredDoctor]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Validate phone number (Indian format)
  const isValidPhone = (phone) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  // Validate age
  const isValidAge = (age) => {
    const ageNum = parseInt(age);
    return ageNum >= 1 && ageNum <= 120;
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

    // Phone validation
    if (!isValidPhone(formData.phoneNumber)) {
      toast.error("Please enter a valid 10-digit phone number");
      return;
    }

    // Age validation
    if (!isValidAge(formData.age)) {
      toast.error("Please enter a valid age between 1 and 120");
      return;
    }

    // Date validation - don't allow past dates (timezone robust)
    const todayStr = new Date().toLocaleDateString('en-CA');
    if (formData.preferredDate < todayStr) {
      toast.error("Please select a future date");
      return;
    }

    try {
      setLoading(true);

      // Add user ID if logged in
      const appointmentData = {
        ...formData,
        userId: user?.id || null,
        bookedAt: new Date().toISOString()
      };

      const response = await api.post("/appointments", appointmentData);

      if (response.data.success) {
        toast.success("Appointment booked successfully!");

        // Save to localStorage if user is logged in
        if (user) {
          const newAppointment = {
            ...appointmentData,
            id: response.data.data._id,
            status: 'confirmed',
            createdAt: new Date().toISOString()
          };
          const updatedAppointments = [...savedAppointments, newAppointment];
          setSavedAppointments(updatedAppointments);
          localStorage.setItem(`appointments_${user.id}`, JSON.stringify(updatedAppointments));
        }

        // Reset form
        setFormData({
          fullName: user?.name || '',
          age: '',
          phoneNumber: user?.phone || '',
          emailAddress: user?.email || '',
          specialty: '',
          preferredDoctor: '',
          preferredDate: '',
          preferredTime: '',
          additionalNotes: '',
        });
      } else {
        toast.error("Failed to book appointment");
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message ||
        "Server error. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  // Save progress without booking
  const handleSaveProgress = () => {
    if (!user) {
      toast.error("Please login to save progress");
      return;
    }
    
    const progressData = {
      ...formData,
      savedAt: new Date().toISOString()
    };
    
    localStorage.setItem(`appointment_progress_${user.id}`, JSON.stringify(progressData));
    toast.success("Progress saved!");
  };

  // Load saved progress
  const handleLoadProgress = () => {
    if (!user) {
      toast.error("Please login to view saved progress");
      return;
    }
    
    const saved = localStorage.getItem(`appointment_progress_${user.id}`);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setFormData(prev => ({
          ...prev,
          ...parsed,
          savedAt: undefined
        }));
        toast.success("Progress loaded!");
      } catch {
        toast.error("Failed to load progress");
      }
    } else {
      toast.info("No saved progress found");
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

    // Phone validation
    if (!isValidPhone(formData.phoneNumber)) {
      toast.error("Please enter a valid 10-digit phone number");
      return;
    }

    const whatsappNumber = "7708555635";

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
                      min="1"
                      max="120"
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
                      placeholder="Enter 10-digit phone number"
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
                        <option value="IVF & Fertility Treatment">IVF & Fertility Treatment</option>
                        <option value="Gynecology">Gynecology</option>
                        <option value="Obstetrics">Obstetrics</option>
                        <option value="Laparoscopy">Laparoscopy</option>
                        <option value="Andrology">Andrology</option>
                        <option value="Parental Care">Parental Care</option>
                        <option value="Ultrasonography">Ultrasonography</option>
                        <option value="General Consultation">General Consultation</option>
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
                        <option value="">Any Available Doctor</option>
                        {doctors.map((doc) => (
                          <option key={doc._id} value={doc.name}>
                            {doc.name} ({doc.degree})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Preferred Date <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        name="preferredDate"
                        value={formData.preferredDate}
                        onChange={handleChange}
                        min={today}
                        className="w-full px-4 py-2.5 text-base rounded-md border border-gray-300 bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 outline-none"
                        required
                      />
                    </div>
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
                        <optgroup label="Morning">
                          <option value="09:00 AM">09:00 AM</option>
                          <option value="10:00 AM">10:00 AM</option>
                          <option value="11:00 AM">11:00 AM</option>
                          <option value="12:00 PM">12:00 PM</option>
                        </optgroup>
                        <optgroup label="Evening">
                          <option value="05:00 PM">05:00 PM</option>
                          <option value="06:00 PM">06:00 PM</option>
                          <option value="07:00 PM">07:00 PM</option>
                          <option value="08:00 PM">08:00 PM</option>
                        </optgroup>
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

                {/* Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <Button
                    onClick={handleSubmit}
                    variant="primary"
                    fullWidth
                    disabled={loading}
                  >
                    {loading ? "Booking..." : "Confirm Booking"}
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

                {/* Save/Load Progress Buttons (only for logged in users) */}
                {user && (
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                    <Button
                      onClick={handleSaveProgress}
                      variant="outline"
                      fullWidth
                      startIcon={<Save className="w-4 h-4" />}
                      className="text-sm"
                    >
                      Save Progress
                    </Button>
                    <Button
                      onClick={() => setShowSaved(!showSaved)}
                      variant="outline"
                      fullWidth
                      startIcon={<Eye className="w-4 h-4" />}
                      className="text-sm"
                    >
                      {showSaved ? "Hide Saved" : "View My Appointments"}
                    </Button>
                  </div>
                )}

                {/* Display Saved Appointments */}
                {showSaved && user && savedAppointments.length > 0 && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h3 className="text-sm font-semibold text-gray-900 mb-3">My Appointments</h3>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {savedAppointments.map((apt, index) => (
                        <div key={index} className="p-3 bg-white rounded border border-gray-200 text-sm">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium text-gray-900">{apt.specialty}</p>
                              <p className="text-gray-600">{apt.preferredDoctor || "Any doctor"}</p>
                              <p className="text-gray-500 text-xs">
                                {formatAppointmentDate(apt.preferredDate)} at {apt.preferredTime}
                              </p>
                            </div>
                            <span className={`text-xs px-2 py-1 rounded ${
                              apt.status === 'confirmed' 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-yellow-100 text-yellow-700'
                            }`}>
                              {apt.status || 'Pending'}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {showSaved && user && savedAppointments.length === 0 && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200 text-center">
                    <p className="text-sm text-gray-600">No saved appointments yet</p>
                  </div>
                )}

                {/* Login prompt for guest users */}
                {!user && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200 text-center">
                    <p className="text-sm text-blue-700">
                      <a href="/login" className="font-semibold underline">Login</a> to save your progress and view your appointments
                    </p>
                  </div>
                )}
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
                    <p className="text-sm font-medium text-gray-900">Mobile</p>
                    <p className="text-sm text-gray-600">7708555635</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Landline</p>
                    <p className="text-sm text-gray-600">2261122</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MessageCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">WhatsApp</p>
                    <p className="text-sm text-gray-600">7708555635</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Email</p>
                    <p className="text-sm text-gray-600">info@vayushrihospital.com</p>
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
                  <span className="text-gray-700">Monday - Saturday</span>
                  <span className="font-medium text-gray-900">9:00 AM - 1:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Monday - Saturday</span>
                  <span className="font-medium text-gray-900">5:00 PM - 9:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Sunday</span>
                  <span className="font-medium text-orange-600">Emergencies Only</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Emergency Services</span>
                  <span className="font-medium text-red-600">24/7 Round the Clock</span>
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