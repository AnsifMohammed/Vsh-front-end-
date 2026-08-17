import React, { useState, useEffect } from 'react';
import { Calendar, GraduationCap } from 'lucide-react';
import imgShanmugapriya from '../../../assets/Doctorimages/shanmugapriya.webp';
import imgRobin from '../../../assets/Doctorimages/robin.webp';
import imgAravind from '../../../assets/Doctorimages/aravind.webp';
import imgSneha from '../../../assets/Doctorimages/sneha.webp';
import Button from '../../../Components/Common/Button';
import Badge from '../../../Components/Common/Badge';
import { useNavigate } from 'react-router-dom';
import api from '../../../api/api';

const getDoctorImage = (doctor) => {
  if (doctor.image) {
    return doctor.image;
  }
  const name = doctor.name.toLowerCase();
  if (name.includes("shanmugapriya")) return imgShanmugapriya;
  if (name.includes("robin")) return imgRobin;
  if (name.includes("aravind")) return imgAravind;
  if (name.includes("srividhya") || name.includes("sneha")) return imgSneha;
  return null;
};

const DoctorCard = ({ doctor }) => {
  const navigate = useNavigate();

  const handleBookNow = () => {
    const specialty = doctor.specialties && doctor.specialties.length > 0 ? doctor.specialties[0] : '';
    navigate('/appointment', {
      state: {
        doctorName: doctor.name,
        specialty: specialty
      }
    });
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 w-full flex flex-col h-full">
      {/* Image Section - Compact Height */}
      <div className="relative h-48 sm:h-52 overflow-hidden flex-shrink-0 group bg-gray-50">
        {getDoctorImage(doctor) ? (
          <img
            src={getDoctorImage(doctor)}
            alt={doctor.name}
            className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
            style={{ objectPosition: '50% 15%' }}
          />
        ) : (
          <div className="h-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xl font-bold">
                {doctor.name.split(' ').map(n => n[0]).join('')}
              </div>
              <p className="text-gray-400 text-xs px-2 truncate max-w-[150px]">{doctor.degree}</p>
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent"></div>
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col flex-1">
        {/* Header - Compact Height */}
        <div className="h-[74px] mb-3 pb-2 border-b border-gray-100">
          <h3 className="text-base font-bold text-gray-900 leading-tight line-clamp-1" title={doctor.name}>
            {doctor.name}
          </h3>
          <p className="text-xs text-gold font-semibold truncate mt-0.5" title={doctor.degree}>{doctor.degree}</p>
          <p className="text-xs text-gray-500 mt-1 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0"></span>
            <span className="truncate">{doctor.experience}</span>
          </p>
        </div>

        {/* Specialties - Compact */}
        <div className="mb-3 h-[64px]">
          <h4 className="text-xs font-bold text-gray-700 mb-1.5 flex items-center gap-1.5">
            <span className="w-1 h-3.5 bg-purple-600 rounded-full"></span>
            Specialties
          </h4>
          <div className="grid grid-cols-2 gap-1 h-[42px] overflow-hidden">
            {doctor.specialties.slice(0, 4).map((specialty, index) => (
              <Badge
                key={index}
                variant="primary"
                type="soft"
                className="text-black text-[10px] py-0.5 px-2 flex items-center justify-center text-center whitespace-nowrap overflow-hidden text-ellipsis rounded-md border border-purple-50"
              >
                {specialty}
              </Badge>
            ))}
          </div>
        </div>

        {/* Education - Compact */}
        <div className="mb-4 h-[64px] bg-gray-50 rounded-lg p-2.5 overflow-hidden">
          <h4 className="text-xs font-bold text-gray-700 mb-0.5 flex items-center gap-1.5">
            <GraduationCap className="w-3.5 h-3.5 text-purple-600 flex-shrink-0" />
            Education
          </h4>
          {doctor.education && doctor.education.trim() !== '' ? (
            <p className="text-[10px] text-gray-500 leading-normal line-clamp-2">
              {doctor.education}
            </p>
          ) : (
            <p className="text-[10px] text-gray-400 italic">Education details coming soon</p>
          )}
        </div>

        {/* Footer - Pushed to Bottom */}
        <div className="mt-auto pt-2 border-t border-gray-100">
          <Button
            variant="primary"
            startIcon={<Calendar className="w-3.5 h-3.5" />}
            className="w-full py-2 text-xs text-center cursor-pointer font-medium"
            onClick={handleBookNow}
          >
            Book Consultation
          </Button>
        </div>
      </div>
    </div>
  );
};

export default function DoctorCards() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        const response = await api.get("/doctors");
        if (response.data.success) {
          setDoctors(response.data.data);
        }
      } catch (err) {
        console.error("Failed to fetch doctors:", err);
        setError("Could not load doctors at this time.");
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="w-10 h-10 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-500 text-sm font-medium">Loading doctor profiles...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-red-500 font-semibold text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="text-center mb-8 sm:mb-10">
          <h1 className="sm:text-5xl md:text-6xl title mb-2 sm:mb-4">
            Meet Our Expert{' '}
            <span className="text-gold">Doctors</span>
          </h1>
          <p className="text-gray-600 sub-title sm:text-lg max-w-2xl mx-auto px-4 leading-relaxed">
            Our team of experienced fertility specialists and gynecologists are here to guide you on your journey
          </p>
        </div>

        {/* Grid - Compact 4-column tile layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor._id || doctor.id} doctor={doctor} />
          ))}
        </div>
      </div>
    </div>
  );
}