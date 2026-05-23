
import React from 'react';
import { Calendar, GraduationCap } from 'lucide-react';
import imgShanmugapriya from '../../../assets/Doctorimages/shanmugapriya.jpeg';
import imgRobin from '../../../assets/Doctorimages/robin.jpeg';
import imgAravind from '../../../assets/Doctorimages/aravind.jpeg';
import imgSneha from '../../../assets/Doctorimages/sneha.jpeg';
import Button from '../../../Components/Common/Button';
import Badge from '../../../Components/Common/Badge';
import { useNavigate } from 'react-router-dom';

const DoctorCard = ({ doctor }) => {
  const navigate = useNavigate();

  const handleBookNow = () => {
    navigate('/appointment');
  };

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 w-full">
      {/* Image Section with Gradient Overlay */}
      <div className="relative h-64 sm:h-72 md:h-80 overflow-hidden group">
        <img
          src={doctor.image}
          alt={doctor.name}
          className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
          style={{ objectPosition: '50% 15%' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent"></div>
      </div>

      {/* Content Section */}
      <div className="p-3 sm:p-5">
        {/* Header with Name */}
        <div className="mb-2 sm:mb-3 pb-2 sm:pb-3 border-b border-gray-100">
          <h3 className="sm:text-xl card-title text-black mb-0.5">{doctor.name}</h3>
          <p className="text-xs sm:text-sm text-gold font-medium">{doctor.degree}</p>
          <p className="sm:text-sm text-gray-600 mt-1.5 flex items-center gap-2 card-sub-title">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            {doctor.experience}
          </p>
        </div>

        {/* Specialties */}
        <div className="mb-3 sm:mb-3.5">
          <h4 className="text-xs sm:text-sm font-bold text-gray-900 mb-1.5 sm:mb-2 flex items-center gap-2">
            <span className="w-1 h-3 sm:h-4 bg-purple-600 rounded-full"></span>
            Specialties
          </h4>
          <div className="flex flex-wrap gap-2">
            {doctor.specialties.slice(0, 4).map((specialty, index) => (
              <Badge key={index} variant="primary" type="soft" className='text-black'>
                {specialty}
              </Badge>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="mb-3 sm:mb-4 bg-gray-50 rounded-xl p-2.5 sm:p-3">
          <h4 className="text-xs sm:text-sm font-bold text-gray-900 mb-1 sm:mb-1.5 flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-purple-600" />
            Education
          </h4>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{doctor.education}</p>
        </div>

        {/* Footer with Button only */}
        <div className="flex items-center justify-end pt-3 sm:pt-4 border-t-2 border-gray-100">
          <Button
            variant="primary"
            startIcon={<Calendar className="w-4 h-4" />}
            className="w-full sm:w-auto text-center cursor-pointer"
            onClick={handleBookNow}
          >
            Book Now
          </Button>
        </div>
      </div>
    </div>
  );
};


export default function DoctorCards() {
  const doctors = [
    {
      id: 1,
      name: 'Dr. Shanmugapriya',
      degree: 'MBBS, MD (Obs & Gynae)',
      experience: '19 years experience in Women\'s Health',
      image: imgShanmugapriya,
      bgColor: 'bg-gradient-to-br from-purple-100 to-pink-100',
      specialties: ['Gynecology', 'IVF', 'PCOS Treatment', 'Fertility'],
      education: 'MBBS - Madras Medical College, Chennai • MD (Obs & Gynae) - Stanley Medical College'
    },
    {
      id: 2,
      name: 'Dr. Robin',
      degree: 'MBBS, MD (Anaesthetist)',
      experience: '24 years experience in ICU Specialist and Intensivist',
      image: imgRobin,
      bgColor: 'bg-gradient-to-br from-blue-100 to-cyan-100',
      specialties: ['Anaesthesia', 'ICU Care', 'Critical Care', 'Pain Management'],
      education: 'MBBS, MD - Madras Engineering College'
    },
    {
      id: 3,
      name: 'Dr. Aravind',
      degree: 'MBBS, DNB (Reproductive Medicine)',
      experience: '10 years experience in IVF & Fertility',
      image: imgAravind,
      bgColor: 'bg-gradient-to-br from-teal-100 to-emerald-100',
      specialties: ['IVF', 'Male Infertility', 'Andrology', 'Embryology'],
      education: 'MBBS - Coimbatore Medical College • DNB (Reproductive Medicine) - National Board of Examinations'
    },
    {
      id: 4,
      name: 'Dr. Srividhya',
      degree: 'MBBS, MD (Gynecology & Obstetrics)',
      experience: '18 years experience in Obstetrics',
      image: imgSneha,
      bgColor: 'bg-gradient-to-br from-pink-100 to-rose-100',
      specialties: ['High-Risk Pregnancy', 'Obstetrics', 'Antenatal Care', 'Laparoscopy'],
      education: 'MBBS - Government Kilpauk Medical College, Chennai • MD (Gynecology & Obstetrics) - Saveetha Medical College'
    }
  ];

  return (
    <div>
      {/* Header Section */}
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="text-center mb-8 sm:mb-10">
          <h1 className=" sm:text-5xl md:text-6xl title mb-2 sm:mb-4">
            Meet Our Expert{' '}
            <span className=" text-gold">
              Doctors
            </span>
          </h1>
          <p className="text-gray-600 sub-title sm:text-lg max-w-2xl mx-auto px-4 leading-relaxed">
            Our team of experienced fertility specialists and gynecologists are here to guide you on your journey
          </p>
        </div>

        {/* Doctors Grid - 2 doctors per row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      </div>
    </div>
  );
}