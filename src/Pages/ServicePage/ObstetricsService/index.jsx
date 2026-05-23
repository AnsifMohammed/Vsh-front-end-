import Breadcrumb from ".././components/Breadcrumb";
import DoctorsCard from "../components/DoctorsCard";
import FAQ from "../components/Faq";
import PatientStories from "../components/Patientstories";
import Support from "../components/Support";
import TreatmentCard from "../components/TreatmentCard";
import { Award, Heart } from 'lucide-react';
import Treatments from "../components/Treatments";

function ObstetricPage() {
  const faqData = [
    {
      question: "What is include in antenatal care?",
      answer: "Antenatal care includes regular health checks, ultrasounds, blood tests, and counseling to monitor the health of both mother and baby throughout pregnancy."
    },
    {
      question: "Do you support normal deliveries?",
      answer: "Yes, we prioritize normal deliveries whenever safe for the mother and baby. Our team is trained in various techniques to support natural childbirth."
    },
    {
      question: "How do you handle high-risk pregnancies?",
      answer: "High-risk pregnancies are managed with increased monitoring, specialized scans, and a multidisciplinary team of experts to ensure the best possible outcome."
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
    console.log("View all doctors clicked");
    // Add your navigation or action logic here
  };

  const treatmentsData = [
    {
      icon: '🤰',
      title: 'Comprehensive Antenatal Care',
      description: 'Regular monitoring and support throughout your pregnancy journey.',
      successRate: 'Expert Monitoring',
      duration: '40 weeks',
      processTitle: 'The Journey:',
      steps: [
        'Monthly health checkups',
        'Fetal development scans',
        'Nutritional counseling',
        'Birth planning sessions'
      ],
      primaryButtonText: 'Join Program',
      secondaryButtonText: 'Learn More'
    },
    {
      icon: '👶',
      title: 'High-Risk Pregnancy Management',
      description: 'Specialized care for complex medical conditions during pregnancy.',
      successRate: 'Safety First',
      duration: 'Ongoing',
      processTitle: 'Clinical Approach:',
      steps: [
        'Frequent monitoring',
        'Specialist consultations',
        'Advanced diagnostics',
        'Emergency preparedness'
      ],
      primaryButtonText: 'Consult Expert',
      secondaryButtonText: 'Ask Question'
    }
  ];

  return (
    <div className="h-auto pt-14">
      <Breadcrumb
        title="Obstetrics Service"
        breadcrumbs={[
          { label: 'Home', link: '/' },
          { label: 'Obstetrics', link: '/obstetrics' }
        ]}
      />
      <TreatmentCard
        title="Exceptional Maternity Care"
        subtitle="A safe and joyful start for your little one."
        description="Vayushri Hospital provides comprehensive obstetric care, supporting you through every milestone of your pregnancy. Our labor and delivery suites are equipped with modern technology, managed by a team that values both safety and the joy of birth."
        features={[
          { icon: "check", label: "24/7 Labor & Delivery", color: "text-pink-500" },
          { icon: "trending", label: "Painless Labor Options", color: "text-blue-500" },
          { icon: "award", label: "Expert Midwives & Doctors", color: "text-purple-500" }
        ]}
        highlights={[
          { icon: "Baby", title: "Joy", subtitle: "Family-Centered Birth", color: "text-blue-600" },
          { icon: "Award", title: "Safety", subtitle: "Level III NICU", color: "text-green-500" },
          { icon: "Users", title: "Support", subtitle: "Post-natal Care", color: "text-purple-500" }
        ]}
        image="https://images.unsplash.com/photo-1565008576549-57569a49371d?w=800&q=80"
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

export default ObstetricPage;
