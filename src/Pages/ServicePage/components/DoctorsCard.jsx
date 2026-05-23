import Badge from '../../../Components/Common/Badge';
import Card from "../../../Components/Common/Card";
import Button from '../../../Components/Common/Button';
import { Award } from "lucide-react";

const DoctorCard = ({ doctor }) => {
  return (
    <Card className="text-center">
      {/* Doctor Image with Badge */}
      <div className="relative inline-block mb-4">
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-100 mx-auto">
          <img
            src={doctor.image}
            alt={doctor.name}
            className="w-full h-full object-cover"
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
      <h3 className=" card-title text-gray-900 mb-1 mt-4 ">
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
      <p className="text-gray-600  leading-relaxed card-sub-title">
        {doctor.description}
      </p>
    </Card>
  );
};

// Main Unified Specialist Doctors Component
const DoctorsCard = ({
  badgeText = "Expert Team",
  badgeIcon = <Award className='h-4 w-4' />,
  heading = "Meet Our Specialist Doctors",
  highlightText = "Specialist Doctors",
  description = "Our experienced team of specialists brings together decades of expertise in fertility, women's health, and advanced medical care to serve you better.",
  doctors = [],
  buttonText = "View All Doctors",
  onButtonClick
}) => {
  return (
    <div className="bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <Badge
            variant="primary"
            className="mb-6"
            type='soft'
            icon={badgeIcon}
          >
            {badgeText}
          </Badge>

          <h1 className=" md:text-5xl font-bold mb-4 title ">
            {heading.split(highlightText)[0]}
            <span className="text-gold">{highlightText}</span>
            {heading.split(highlightText)[1]}
          </h1>

          <p className="text-gray-600  max-w-3xl mx-auto sub-title">
            {description}
          </p>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button variant="primary" size="md" onClick={onButtonClick}>
            {buttonText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DoctorsCard;