
import React from 'react';
import { Calendar, GraduationCap } from 'lucide-react';
import imgShanmugapriya from '../../../assets/Doctorimages/shanmugapriya.webp';
import imgRobin from '../../../assets/Doctorimages/robin.webp';
import imgAravind from '../../../assets/Doctorimages/aravind.webp';
import imgSneha from '../../../assets/Doctorimages/sneha.webp';
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
      <div className={`relative h-64 sm:h-72 md:h-80 overflow-hidden group ${doctor.image ? '' : 'bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center'}`}>
        {doctor.image ? (
          <img
            src={doctor.image}
            alt={doctor.name}
            className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
            style={{ objectPosition: '50% 15%' }}
          />
        ) : (
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-2 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-3xl font-bold">
              {doctor.name.split(' ').map(n => n[0]).join('')}
            </div>
            <p className="text-gray-500 text-sm">{doctor.degree}</p>
          </div>
        )}
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
        {doctor.education && (
          <div className="mb-3 sm:mb-4 bg-gray-50 rounded-xl p-2.5 sm:p-3">
            <h4 className="text-xs sm:text-sm font-bold text-gray-900 mb-1 sm:mb-1.5 flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-purple-600" />
              Education
            </h4>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{doctor.education}</p>
          </div>
        )}

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
  const [showAll, setShowAll] = React.useState(false);
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
      degree: 'Paediatrician and Neonatologist',
      experience: 'General and Vaccination Consultant',
      image: imgAravind,
      bgColor: 'bg-gradient-to-br from-teal-100 to-emerald-100',
      specialties: ['Paediatrics', 'Neonatology', 'Vaccination', 'General Consultation'],
      education: 'MBBS, MD - Madras Medical College'
    },
    {
      id: 4,
      name: 'Dr. Srividhya',
      degree: 'Embryologist',
      experience: '18 years experience. PGD pgs, ICSI freezing thawing',
      image: imgSneha,
      bgColor: 'bg-gradient-to-br from-pink-100 to-rose-100',
      specialties: ['PGD', 'PGS', 'ICSI Freezing Thawing'],
      education: 'MBBS - Government Kilpauk Medical College, Chennai • MD (Gynecology & Obstetrics) - Saveetha Medical College'
    },
    {
      id: 5,
      name: 'Dr. Kurunji',
      degree: 'Sonologist',
      experience: 'Expert in ultrasound imaging and diagnostic sonography',
      image: '',
      bgColor: 'bg-gradient-to-br from-indigo-100 to-purple-100',
      specialties: ['Ultrasound Imaging', 'Diagnostic Sonography', 'Fetal Medicine', 'Obstetric Scanning'],
      education: ''
    },
    {
      id: 6,
      name: 'Dr. Patturajan',
      degree: 'Specialist',
      experience: 'Experienced medical consultant',
      image: '',
      bgColor: 'bg-gradient-to-br from-orange-100 to-amber-100',
      specialties: ['General Medicine', 'Health Consultation', 'Preventive Care'],
      education: ''
    },
    {
      id: 7,
      name: 'Dr. Arun',
      degree: 'Anaesthetist',
      experience: 'Specialist in anaesthesia and critical care',
      image: '',
      bgColor: 'bg-gradient-to-br from-cyan-100 to-blue-100',
      specialties: ['Anaesthesia', 'Critical Care', 'Pain Management', 'Surgical Support'],
      education: ''
    },
    {
      id: 8,
      name: 'Dr. Shiva',
      degree: 'Laparoscopic Surgeon',
      experience: 'Expert in minimally invasive laparoscopic surgeries',
      image: '',
      bgColor: 'bg-gradient-to-br from-emerald-100 to-teal-100',
      specialties: ['Laparoscopic Surgery', 'Minimally Invasive Surgery', 'Gynecological Surgery', 'Diagnostic Laparoscopy'],
      education: ''
    },
    {
      id: 9,
      name: 'Dr. Babitha',
      degree: 'Specialist',
      experience: 'Experienced healthcare professional',
      image: '',
      bgColor: 'bg-gradient-to-br from-rose-100 to-pink-100',
      specialties: ['Women\'s Health', 'Consultation', 'Patient Care'],
      education: ''
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
          {(showAll ? doctors : doctors.slice(0, 4)).map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
        
        {/* View More/Less Button */}
        <div className="text-center mt-12">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-8 py-3 bg-[#6b3fa0] text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
          >
            {showAll ? 'View Less Doctors' : 'View More Doctors'}
          </button>
        </div>
      </div>
    </div>
  );
}
