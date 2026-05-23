import Badge from '../../../Components/Common/Badge';
import Card from "../../../Components/Common/Card";
import Button from '../../../Components/Common/Button';
import { Award } from "lucide-react";
import { useNavigate } from "react-router-dom";
import imgShanmugapriya from '../../../assets/Doctorimages/shanmugapriya.jpeg';
import imgRobin from '../../../assets/Doctorimages/robin.jpeg';
import imgAravind from '../../../assets/Doctorimages/aravind.jpeg';
import imgSneha from '../../../assets/Doctorimages/sneha.jpeg';

const DoctorCard = ({ doctor }) => {

  return (
    <Card className="text-center">
      {/* Doctor Image with Badge */}
      <div className="relative inline-block mb-4">
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-100 mx-auto">
          <img
            src={doctor.image}
            alt={doctor.name}
            className="w-full h-full object-cover object-top"
          />
        </div>
        {/* Experience Badge */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-2">
          <Badge variant="primary" size="small" type='soft' className='w-20 border border-[#B9D4F9]-100 p-6'>
            {doctor.experience}
          </Badge>
        </div>
      </div>

      {/* Doctor Name */}
      <h3 className="card-title text-black mb-1 mt-4 ">
        {doctor.name}
      </h3>

      {/* Specialization Badge */}
      <p className="mb-3 font-nunito text-gold font-bold">
        {doctor.specialization}
      </p>

      {/* Credentials */}
      <p className="text-sm  mb-4 font-bold font-nunito">
        {doctor.credentials}
      </p>

      {/* Description */}
      <p className="text-gray-600 card-sub-title leading-relaxed ">
        {doctor.description}
      </p>
    </Card>
  );
};

// Main Unified Specialist Doctors Component
const SpecialistDoctors = () => {
  const navigate = useNavigate();
  const doctors = [
    {
      id: 1,
      name: "Dr. Shanmugapriya",
      specialization: "Fertility Specialist",
      credentials: "MD, DGO, Fellowship in IVF",
      experience: "19+ Years",
      description: "Leading fertility specialist with expertise in advanced reproductive technologies and personalized treatment approaches.",
      image: imgShanmugapriya
    },
    {
      id: 2,
      name: "Dr. Robin",
      specialization: "Anaesthetist",
      credentials: "MBBS, MD - Madras Engineering College",
      experience: "24+ Years",
      description: "ICU Specialist and Intensivist with expertise in critical care, anaesthesia, and pain management.",
      image: imgRobin
    },
    {
      id: 3,
      name: "Dr. Srividhya",
      specialization: "Embryologist",
      credentials: "18 years experience. PGD pgs, ICSI freezing thawing",
      experience: "18+ Years",
      description: "Expert embryologist specializing in PGD, PGS, ICSI freezing and thawing techniques.",
      image: imgSneha
    },
    {
      id: 4,
      name: "Dr. Aravind",
      specialization: "Paediatrician and Neonatologist",
      credentials: "General and Vaccination Consultant",
      experience: "12+ Years",
      description: "Expert in paediatrics and neonatology with specialization in general consultation and vaccination programs.",
      image: imgAravind
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <Badge
            variant="primary"
            className="mb-6"
            type='soft'
            icon={
              <Award className='h-4 w-4' />
            }
          >
            Expert Team
          </Badge>

          <h1 className="text-4xl md:text-5xl mb-4 title">
            Meet Our <span className="text-gold">Specialist Doctors</span>
          </h1>

          <p className="text-gray-600  max-w-3xl mx-auto sub-title">
            Our experienced team of specialists brings together decades of expertise in fertility, women's health, and advanced medical care to serve you better.
          </p>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button variant="primary" size="md" onClick={() => navigate("/doctors")} className='cursor-pointer p-4'>
            View All Doctors
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SpecialistDoctors;