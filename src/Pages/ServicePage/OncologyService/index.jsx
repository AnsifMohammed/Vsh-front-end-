import Breadcrumb from ".././components/Breadcrumb";
import DoctorsCard from "../components/DoctorsCard";
import FAQ from "../components/Faq";
import PatientStories from "../components/Patientstories";
import Support from "../components/Support";
import TreatmentCard from "../components/TreatmentCard";
import { Award, Heart } from "lucide-react";
import Treatments from "../components/Treatments";

function OncologyPage() {
  const faqData = [
    {
      question: "What is gynecological oncology?",
      answer:
        "Gynecological oncology is a field of medicine that focuses on cancers of the female reproductive system, including ovarian cancer, uterine cancer, vaginal cancer, cervical cancer, and vulvar cancer.",
    },
    {
      question: "How important is regular screening?",
      answer:
        "Regular screening, such as Pap smears and HPV testing, is crucial for early detection and can significantly improve the chances of successful treatment.",
    },
    {
      question: "What treatment options are available?",
      answer:
        "Treatment options vary depending on the type and stage of cancer and may include surgery, chemotherapy, radiation therapy, or a combination of these.",
    },
  ];
  const storiesData = [
    {
      id: 2,
      name: "Dr. Robin",
      specialization: "Anaesthetist",
      credentials: "MBBS, MD - Madras Engineering College",
      experience: "24+ Years",
      description:
        "ICU Specialist and Intensivist with expertise in critical care, anaesthesia, and pain management.",
      image:
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop",
    },
    {
      quote:
        '"The comprehensive fertility assessment and guidance from the team helped us understand our options. The care and attention we received was exceptional."',
      name: "Rahul & Kavya",
      treatment: "Fertility Consultation",
      location: "Bangalore",
      icon: "🧬",
      rating: 5,
    },
    {
      quote:
        '"Dr. Anita managed my high-risk pregnancy beautifully. Regular monitoring and her expertise ensured a safe delivery of my healthy baby boy."',
      name: "Anjali Reddy",
      treatment: "High-Risk Pregnancy",
      location: "Hyderabad",
      icon: "🤰",
      rating: 5,
    },
  ];

  const doctorsData = [
    {
      id: 1,
      name: "Dr. Shanmugapriya",
      specialization: "Fertility Specialist",
      credentials: "MD, DGO, Fellowship in IVF",
      experience: "19+ Years",
      description:
        "Leading fertility specialist with expertise in advanced reproductive technologies and personalized treatment approaches.",
      image:
        "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=300&h=300&fit=crop",
    },
    {
      id: 2,
      name: "Dr. Robin",
      specialization: "Anaesthetist",
      credentials: "MBBS, MD - Madras Engineering College",
      experience: "24+ Years",
      description:
        "ICU Specialist and Intensivist with expertise in critical care, anaesthesia, and pain management.",
      image:
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop",
    },
    {
      id: 3,
      name: "Dr. Aravind",
      specialization: "Obstetrician",
      credentials: "MD, DGO, Fellowship in IVF",
      experience: "15+ Years",
      description:
        "Expert in managing complex pregnancies with a focus on maternal and fetal wellness throughout pregnancy.",
      image:
        "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=300&h=300&fit=crop",
    },
  ];

  const handleViewAllDoctors = () => {
    console.log("View all doctors clicked");
    // Add your navigation or action logic here
  };

  const treatmentsData = [
    {
      icon: "🛡️",
      title: "Advanced Cancer Screening",
      description:
        "Comprehensive screening programs for early detection of gynecological cancers.",
      successRate: "Early Detection Focus",
      duration: "Ongoing program",
      processTitle: "Screening Package:",
      steps: [
        "Advanced Pap & HPV testing",
        "Pelvic ultrasound examination",
        "Tumor marker blood tests",
        "Expert risk assessment",
      ],
      primaryButtonText: "Book Screening",
      secondaryButtonText: "Learn More",
    },
    {
      icon: "🩺",
      title: "Multidisciplinary Cancer Care",
      description:
        "Coordinated treatment plans involving surgeons, oncologists, and support staff.",
      successRate: "Comprehensive Approach",
      duration: "Personalized",
      processTitle: "Care Pathway:",
      steps: [
        "Tumor board review",
        "Personalized treatment plan",
        "Supportive care services",
        "Regular follow-up monitoring",
      ],
      primaryButtonText: "Request Consultation",
      secondaryButtonText: "Ask Question",
    },
  ];

  return (
    <div className="h-auto pt-14">
      <Breadcrumb
        title="Oncology Service"
        breadcrumbs={[
          { label: "Home", link: "/" },
          { label: "Oncology", link: "/oncology" },
        ]}
      />
      <TreatmentCard
        title="Expert Gynecological Oncology"
        subtitle="Advanced cancer care with a focus on female health."
        description="Vayushri Hospital offers specialized care for cancers of the female reproductive system. Our oncology team provides a compassionate and comprehensive approach, integrating the latest treatments with holistic support for our patients."
        features={[
          {
            icon: "check",
            label: "Specialized Cancer Screening",
            color: "text-red-500",
          },
          {
            icon: "trending",
            label: "Personalized Treatment Plans",
            color: "text-blue-500",
          },
          {
            icon: "award",
            label: "Expert Surgical Oncologists",
            color: "text-purple-500",
          },
        ]}
        highlights={[
          {
            icon: "Baby",
            title: "Care",
            subtitle: "Compassionate Support",
            color: "text-blue-600",
          },
          {
            icon: "Award",
            title: "Technology",
            subtitle: "Latest Therapies",
            color: "text-green-500",
          },
          {
            icon: "Users",
            title: "Team",
            subtitle: "Multidisciplinary Care",
            color: "text-purple-500",
          },
        ]}
        image="https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=800&q=80"
      />
      <Treatments
        title="Available Treatments"
        highlightText="Treatments"
        subtitle="Explore our comprehensive range of treatments designed for your specific needs"
        treatments={treatmentsData}
      />
      <PatientStories
        badgeText="Patient Stories"
        badgeIcon={<Heart className="w-4 h-4" />}
        heading="Stories of Hope & Success"
        highlightText="Hope & Success"
        description="Real experiences from real families who found their path to parenthood with our care and support"
        stories={storiesData}
      />
      <DoctorsCard
        badgeText="Expert Team"
        badgeIcon={<Award className="h-4 w-4" />}
        heading="Meet Our Specialist Doctors"
        highlightText="Specialist Doctors"
        description="Our experienced team of specialists brings together decades of expertise in fertility, women's health, and advanced medical care to serve you better."
        doctors={doctorsData}
        buttonText="View All Doctors"
        onButtonClick={handleViewAllDoctors}
      />

      <FAQ
        title="Frequently Asked Questions"
        highlightText="Questions"
        subtitle="Get answers to common questions about our treatments and procedures"
        faqs={faqData}
      />

      <Support
        heading="Ready to take next step?"
        description="Our expert team is here to guide you through your fertility assessment journey with personalized care and support."
        primaryButtonText="Book Consultation"
        secondaryButtonText="WhatsApp"
        phoneNumber="+919876543210"
        whatsappNumber="+919876543210"
      />
    </div>
  );
}

export default OncologyPage;
