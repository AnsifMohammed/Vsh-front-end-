import Breadcrumb from ".././components/Breadcrumb";
import DoctorsCard from "../components/DoctorsCard";
import FAQ from "../components/Faq";
import PatientStories from "../components/Patientstories";
import Support from "../components/Support";
import TreatmentCard from "../components/TreatmentCard";
import { Award, Heart } from 'lucide-react';
import Treatments from "../components/Treatments";
import { useNavigate } from "react-router-dom";

function IVFPage() {
  const navigate = useNavigate();
  const faqData = [
    {
      question: "What is the success rate of IVF at Vayushri Hospital?",
      answer: "Our IVF success rate ranges from 55-70% per cycle, which is above the national average. Success rates depend on various factors including age, underlying fertility issues, and treatment protocol. Our team provides personalized assessments based on your specific situation."
    },
    {
      question: "How many IVF cycles might I need?",
      answer: "The number of IVF cycles needed varies from person to person. Many patients achieve success within 1-3 cycles. Our fertility specialists will evaluate your individual circumstances and create a customized treatment plan to maximize your chances of success."
    },
    {
      question: "Is IVF treatment painful?",
      answer: "IVF treatment involves some discomfort but is generally not painful. Hormone injections may cause minor discomfort, and the egg retrieval procedure is performed under sedation to ensure your comfort. Most patients find the process manageable and well worth the outcome."
    },
    {
      question: "What is the cost of fertility treatments?",
      answer: "The cost of fertility treatments varies depending on the specific procedures required. IVF typically ranges from ₹1.5-2.5 lakhs per cycle. We offer detailed cost breakdowns during your consultation and can discuss payment plans and financing options to make treatment more accessible."
    },
    {
      question: "How long should we try before considering IVF?",
      answer: "Generally, couples under 35 should try naturally for one year before seeking fertility treatment, while those over 35 should consult after six months. However, if you have known fertility issues or medical conditions affecting fertility, it's advisable to consult a specialist sooner."
    }
  ];
  const storiesData = [
    {
      quote: '"Dr. Rajesh diagnosed my PCOS and created a perfect treatment plan. Within 8 months, my cycles were regular and I conceived naturally. Forever grateful!"',
      name: 'Meera Gupta',
      treatment: 'PCOS Treatment',
      location: 'Delhi',
      icon: '🌱',
      rating: 5
    },
    {
      quote: '"The comprehensive fertility assessment and guidance from the team helped us understand our options. The care and attention we received was exceptional."',
      name: 'Rahul & Kavya',
      treatment: 'Fertility Consultation',
      location: 'Bangalore',
      icon: '🧬',
      rating: 5
    },
    {
      quote: '"Dr. Anita managed my high-risk pregnancy beautifully. Regular monitoring and her expertise ensured a safe delivery of my healthy baby boy."',
      name: 'Anjali Reddy',
      treatment: 'High-Risk Pregnancy',
      location: 'Hyderabad',
      icon: '🤰',
      rating: 5
    }
  ];

  const doctorsData = [
    {
      id: 1,
      name: "Dr. Shanmugapriya",
      specialization: "Fertility Specialist",
      credentials: "MD, DGO, Fellowship in IVF",
      experience: "19+ Years",
      description: "Leading fertility specialist with expertise in advanced reproductive technologies and personalized treatment approaches.",
      image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=300&h=300&fit=crop"
    },
    {
      id: 2,
      name: "Dr. Robin",
      specialization: "Anaesthetist",
      credentials: "MBBS, MD - Madras Engineering College",
      experience: "24+ Years",
      description: "ICU Specialist and Intensivist with expertise in critical care, anaesthesia, and pain management.",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop"
    },
    {
      id: 3,
      name: "Dr. Aravind",
      specialization: "Obstetrician",
      credentials: "MD, DGO, Fellowship in IVF",
      experience: "15+ Years",
      description: "Expert in managing complex pregnancies with a focus on maternal and fetal wellness throughout pregnancy.",
      image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=300&h=300&fit=crop"
    }
  ];

  const handleViewAllDoctors = () => {
    navigate('/doctors');
  };

  const treatmentsData = [
    {
      icon: '💉',
      title: 'In Vitro Fertilization (IVF)',
      description: 'Most advanced reproductive technology for conception',
      successRate: '65-70% Success Rate',
      duration: '6-8 weeks per cycle',
      processTitle: 'Preparation & Process:',
      steps: [
        'Initial consultation and comprehensive fertility assessment',
        'Hormonal stimulation protocol (8-12 days)',
        'Regular monitoring with ultrasounds and blood tests',
        'Egg retrieval procedure under mild sedation',
        'Embryo culture and development (3-5 days)',
        'Embryo transfer and pregnancy test after 2 weeks'
      ],
      primaryButtonText: 'Book Consultation',
      secondaryButtonText: 'Ask Question',
      onBookConsultation: () => console.log('Book consultation clicked'),
      onAskQuestion: () => console.log('Ask question clicked')
    },
    {
      icon: '🔬',
      title: 'Intracytoplasmic Sperm Injection (ICSI)',
      description: 'Specialized technique for male factor infertility',
      successRate: '70-75% Success Rate',
      duration: '6-8 weeks per cycle',
      processTitle: 'Preparation & Process:',
      steps: [
        'Comprehensive fertility evaluation for both partners',
        'Ovarian stimulation protocol',
        'Sperm collection and preparation',
        'Single sperm injection into each egg',
        'Embryo development monitoring',
        'Embryo transfer and follow-up'
      ],
      primaryButtonText: 'Book Consultation',
      secondaryButtonText: 'Ask Question',
      onBookConsultation: () => console.log('Book consultation clicked'),
      onAskQuestion: () => console.log('Ask question clicked')
    },
    {
      icon: '🧪',
      title: 'Intrauterine Insemination (IUI)',
      description: 'Less invasive fertility treatment option',
      successRate: '15-20% Success Rate',
      duration: '2-3 weeks per cycle',
      processTitle: 'Preparation & Process:',
      steps: [
        'Ovulation monitoring and tracking',
        'Sperm preparation and washing',
        'Timed insemination procedure',
        'Post-procedure rest and monitoring',
        'Pregnancy test after 2 weeks'
      ],
      primaryButtonText: 'Book Consultation',
      secondaryButtonText: 'Ask Question',
      onBookConsultation: () => console.log('Book consultation clicked'),
      onAskQuestion: () => console.log('Ask question clicked')
    },
    {
      icon: '🧊',
      title: 'Fertility Preservation',
      description: 'Protect your future family planning options',
      successRate: '90%+ survival rate Success Rate',
      duration: '2-3 weeks for collection',
      processTitle: 'Preparation & Process:',
      steps: [
        'Initial consultation and assessment',
        'Ovarian stimulation (if needed)',
        'Egg or sperm collection',
        'Cryopreservation and storage',
        'Long-term monitoring and maintenance'
      ],
      primaryButtonText: 'Book Consultation',
      secondaryButtonText: 'Ask Question',
      onBookConsultation: () => console.log('Book consultation clicked'),
      onAskQuestion: () => console.log('Ask question clicked')
    }
  ];

  return (
    <div className="h-auto pt-14">
      <Breadcrumb
        title="IVF & Fertility"
        breadcrumbs={[
          { label: 'Home', link: '/' },
          { label: 'IVF & Fertility', link: '/ivf-fertility' }
        ]}
      />
      <TreatmentCard
        title="Your Journey to Parenthood"
        subtitle="Advanced fertility solutions with compassion and expertise."
        description="At Vayushri Hospital, we combine cutting-edge reproductive technology with personalized emotional support to help you achieve your dream of starting a family. Our state-of-the-art IVF lab and experienced specialists ensure you receive the highest standard of care."
        features={[
          { icon: "check", label: "Advanced Embryology Lab", color: "text-purple-500" },
          { icon: "trending", label: "High Success Rates", color: "text-blue-500" },
          { icon: "award", label: "Expert Fertility Team", color: "text-pink-500" }
        ]}
        highlights={[
          { icon: "Baby", title: "Success", subtitle: "70% Cycle Rate", color: "text-blue-600" },
          { icon: "Award", title: "Certified", subtitle: "NABH Accredited", color: "text-green-500" },
          { icon: "Users", title: "Counseling", subtitle: "24/7 Support", color: "text-purple-500" }
        ]}
        image="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&q=80"
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
        badgeIcon={<Award className='h-4 w-4' />}
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

export default IVFPage;
