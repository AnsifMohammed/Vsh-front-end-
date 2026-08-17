import Badge from "../../../Components/Common/Badge";
import Card from "../../../Components/Common/Card";
import {
  Heart, // IVF & Fertility
  Stethoscope, // Gynecology
  Baby, // Obstetrics
  User, // Andrology
  Scissors, // Laparoscopy
  Activity, // Oncology Services
  HeartPulse, // Prenatal Care
  ScanLine, // Ultrasonography
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const HealthcareTreatments = ({ selectedFilter }) => {
  const navigate = useNavigate();

  const treatments = [
    {
      id: 1,
      title: "IVF & Fertility",
      description: "Advanced fertility treatments with highest success rates",
      badge: "85% Success Rate",
      badgeVariant: "purple",
      icon: <Baby />,
      bgColor: "bg-purple-50",
      iconBgColor: "bg-purple-100",
      iconColor: "text-purple-600",
      route: "Ivf&Fertility",
      tags: ["general"],
    },
    {
      id: 2,
      title: "Gynecology",
      description: "Comprehensive women's health and wellness care",
      badge: "30+ Years Experience",
      badgeVariant: "purple",
      icon: <Heart />,
      bgColor: "bg-white",
      iconBgColor: "bg-pink-100",
      iconColor: "text-pink-600",
      route: "gynecology",
      tags: ["women"],
    },
    {
      id: 3,
      title: "Obstetrics",
      description: "Safe and supportive pregnancy and delivery care",
      badge: "60,000+ Deliveries",
      badgeVariant: "purple",
      icon: <ScanLine />,
      bgColor: "bg-white",
      iconBgColor: "bg-green-100",
      iconColor: "text-green-600",
      route: "obstetrics",
      tags: ["women"],
    },
    {
      id: 4,
      title: "Andrology",
      description: "Male fertility and reproductive health treatments",
      badge: "Expert Male Care",
      badgeVariant: "purple",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
      bgColor: "bg-white",
      iconBgColor: "bg-blue-100",
      iconColor: "text-blue-600",
      route: "andrology",
      tags: ["men"],
    },
    {
      id: 5,
      title: "Laparoscopy",
      description:
        "Minimally invasive surgical procedures offer precise treatment",
      badge: "Minimal Recovery Time",
      badgeVariant: "purple",
      icon: <Scissors />,
      bgColor: "bg-white",
      iconBgColor: "bg-purple-100",
      iconColor: "text-purple-600",
      route: "laparoscopy",
      tags: ["general"],
    },
    {
      id: 7,
      title: "Prenatal Care",
      description: "Complete pregnancy monitoring and support",
      badge: "24/7 Support",
      badgeVariant: "purple",
      icon: <User />,
      bgColor: "bg-white",
      iconBgColor: "bg-teal-100",
      iconColor: "text-teal-600",
      route: "parentalcare",
      tags: ["women"],
    },
    {
      id: 8,
      title: "Ultrasonography",
      description: "Personalized treatment planning and guidance",
      badge: "Free First Visit",
      badgeVariant: "purple",
      icon: <Stethoscope />,
      bgColor: "bg-white",
      iconBgColor: "bg-gray-100",
      iconColor: "text-gray-600",
      route: "ultrasonography",
      tags: ["general"],
    },
  ];

  const filteredTreatments = treatments.filter((treatment) => {
    if (!selectedFilter) return true;
    return (
      treatment.tags.includes(selectedFilter) || treatment.tags.includes("general")
    );
  });

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <Badge
            variant="primary"
            type="soft"
            className="mb-6 font-nunito font-bold"
            icon={<Stethoscope className=" h-4 w-4 bg-purple-50" />}
          >
            Our Specialties
          </Badge>

          <h1 className=" md:text-5xl font-bold mb-4 title">
            Comprehensive{" "}
            <span className="text-gold ">Healthcare Services</span>
          </h1>

          <p className="text-gray-600  max-w-3xl mx-auto sub-title">
            From fertility treatments to complete women's health care, we offer
            specialized services with advanced technology and compassionate
            care.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredTreatments.map((treatment) => (
            <Card
              key={treatment.id}
              onClick={() => navigate(`/${treatment.route}`)}
              className={`${treatment.bgColor} ${treatment.id === 1 ? "bg-purple-50" : ""} cursor-pointer
`}
            >
              {/* Icon */}
              <div
                className={`w-12 h-12 ${treatment.iconBgColor} rounded-lg flex items-center justify-center mb-4 ${treatment.iconColor}`}
              >
                {treatment.icon}
              </div>

              {/* Title */}
              <h3 className="card-title text-black mb-2 ">{treatment.title}</h3>

              {/* Description */}
              <p className="text-gray-600  mb-4 leading-relaxed card-sub-title">
                {treatment.description}
              </p>

              {/* Badge */}
              <Badge
                variant="primary"
                type="soft"
                className="mb-6 font-inter text-sm"
              >
                {treatment.badge}
              </Badge>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HealthcareTreatments;
