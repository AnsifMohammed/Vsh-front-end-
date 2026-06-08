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
    <div className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 w-full flex flex-col h-full">
      {/* Image Section - Fixed Height */}
      <div className="relative h-64 sm:h-72 md:h-80 overflow-hidden flex-shrink-0 group">
        {doctor.image ? (
          <img
            src={doctor.image}
            alt={doctor.name}
            className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
            style={{ objectPosition: '50% 15%' }}
          />
        ) : (
          <div className="h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-3 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-3xl font-bold">
                {doctor.name.split(' ').map(n => n[0]).join('')}
              </div>
              <p className="text-gray-500 text-sm px-4">{doctor.degree}</p>
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent"></div>
      </div>

      {/* Content Section */}
      <div className="p-4 sm:p-6 flex flex-col flex-1">
        {/* Header - Fixed Height */}
        <div className="h-[82px] mb-4 pb-3 border-b border-gray-100">
          <h3 className="text-lg sm:text-xl font-semibold text-black mb-1 leading-tight line-clamp-2">
            {doctor.name}
          </h3>
          <p className="text-xs sm:text-sm text-gold font-medium line-clamp-1">{doctor.degree}</p>
          <p className="text-xs sm:text-sm text-gray-600 mt-1 flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></span>
            <span className="line-clamp-1">{doctor.experience}</span>
          </p>
        </div>

        {/* Specialties - Fixed Height */}
        <div className="mb-4 h-[98px]">
          <h4 className="text-xs sm:text-sm font-bold text-gray-900 mb-2.5 flex items-center gap-2">
            <span className="w-1 h-4 bg-purple-600 rounded-full"></span>
            Specialties
          </h4>
          <div className="grid grid-cols-2 gap-1.5 h-[68px] overflow-hidden">
            {doctor.specialties.slice(0, 4).map((specialty, index) => (
              <Badge
                key={index}
                variant="primary"
                type="soft"
                className="text-black text-xs py-1 px-2.5 flex items-center justify-center text-center whitespace-nowrap overflow-hidden text-ellipsis"
              >
                {specialty}
              </Badge>
            ))}
          </div>
        </div>

        {/* Education - Fixed Height */}
        <div className="mb-6 h-[92px] bg-gray-50 rounded-xl p-3.5 overflow-hidden">
          <h4 className="text-xs sm:text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-purple-600 flex-shrink-0" />
            Education
          </h4>
          {doctor.education && doctor.education.trim() !== '' ? (
            <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
              {doctor.education}
            </p>
          ) : (
            <p className="text-xs text-gray-400 italic">Education details coming soon</p>
          )}
        </div>

        {/* Footer - Pushed to Bottom */}
        <div className="mt-auto pt-2 border-t border-gray-100">
          <Button
            variant="primary"
            startIcon={<Calendar className="w-4 h-4" />}
            className="w-full text-center cursor-pointer"
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
      experience: "19 years experience in Women's Health",
      image: imgShanmugapriya,
      specialties: ['Gynecology', 'IVF', 'PCOS Treatment', 'Fertility'],
      education: 'MBBS - Madras Medical College, Chennai • MD (Obs & Gynae) - Stanley Medical College'
    },
    {
      id: 2,
      name: 'Dr. Robin',
      degree: 'MBBS, MD (Anaesthetist)',
      experience: '24 years experience in ICU Specialist and Intensivist',
      image: imgRobin,
      specialties: ['Anaesthesia', 'ICU Care', 'Critical Care', 'Pain Management'],
      education: 'MBBS, MD - Madras Engineering College'
    },
    {
      id: 3,
      name: 'Dr. Aravind',
      degree: 'Paediatrician and Neonatologist',
      experience: 'General and Vaccination Consultant',
      image: imgAravind,
      specialties: ['Paediatrics', 'Neonatology', 'Vaccination', 'General Consultation'],
      education: 'MBBS, MD - Madras Medical College'
    },
    {
      id: 4,
      name: 'Dr. Srividhya',
      degree: 'Embryologist',
      experience: '18 years experience. PGD pgs, ICSI freezing thawing',
      image: imgSneha,
      specialties: ['PGD', 'PGS', 'ICSI Freezing Thawing'],
      education: 'MBBS - Government Kilpauk Medical College, Chennai • MD (Gynecology & Obstetrics) - Saveetha Medical College'
    },
    {
      id: 5,
      name: 'Dr. Kurunji',
      degree: 'Sonologist',
      experience: 'Expert in ultrasound imaging and diagnostic sonography',
      image: '',
      specialties: ['Ultrasound Imaging', 'Diagnostic Sonography', 'Fetal Medicine', 'Obstetric Scanning'],
      education: '-'
    },
    {
      id: 6,
      name: 'Dr. Patturajan',
      degree: 'Specialist',
      experience: 'Experienced medical consultant',
      image: '',
      specialties: ['General Medicine', 'Health Consultation', 'Preventive Care'],
      education: '-'
    },
    {
      id: 7,
      name: 'Dr. Arun',
      degree: 'Anaesthetist',
      experience: 'Specialist in anaesthesia and critical care',
      image: '',
      specialties: ['Anaesthesia', 'Critical Care', 'Pain Management', 'Surgical Support'],
      education: '-'
    },
    {
      id: 8,
      name: 'Dr. Shiva',
      degree: 'Laparoscopic Surgeon',
      experience: 'Expert in minimally invasive laparoscopic surgeries',
      image: '',
      specialties: ['Laparoscopic Surgery', 'Minimally Invasive Surgery', 'Gynecological Surgery', 'Diagnostic Laparoscopy'],
      education: '-'
    },
    {
      id: 9,
      name: 'Dr. Babitha',
      degree: 'Specialist',
      experience: 'Experienced healthcare professional',
      image: '',
      specialties: ["Women's Health", 'Consultation', 'Patient Care'],
      education: '-'
    }
  ];

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

        {/* Grid - Cards will now have uniform height */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      </div>
    </div>
  );
}