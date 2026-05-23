import Breadcrumb from ".././components/Breadcrumb";
import DoctorsCard from "../components/DoctorsCard";
import FAQ from "../components/Faq";
import PatientStories from "../components/Patientstories";
import Support from "../components/Support";
import TreatmentCard from "../components/TreatmentCard";
import { Award, Heart } from 'lucide-react';
import Treatments from "../components/Treatments";

function GynecologyPage() {
  const faqData = [
    {
      question: "What symptoms should I discuss with a gynecologist?",
      answer: "You should discuss irregular periods, severe menstrual pain, unusual discharge, pelvic pain, or any changes in your breast health."
    },
    {
      question: "At what age should a girl first visit a gynecologist?",
      answer: "The first visit is generally recommended between the ages of 13 and 15, primarily for education and to establish a relationship with a healthcare provider."
    },
    {
      question: "How often should I have a Pap smear?",
      answer: "Most women should start having Pap smears at age 21. The frequency depends on your age and medical history, typically every 3 to 5 years."
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
      icon: '🌸',
      title: 'PCOS & Hormonal Management',
      description: 'Comprehensive care for polycystic ovary syndrome and hormonal imbalances.',
      successRate: 'Highly Effective',
      duration: 'Ongoing management',
      processTitle: 'Care Approach:',
      steps: [
        'Hormonal profiling',
        'Nutritional guidance',
        'Metabolic assessment',
        'Personalized medication plan'
      ],
      primaryButtonText: 'Book Consultation',
      secondaryButtonText: 'Learn More'
    },
    {
      icon: '🏥',
      title: 'Menstrual Disorder Clinic',
      description: 'Expert treatment for painful, heavy, or irregular periods.',
      successRate: '95% Improvement',
      duration: 'Varies',
      processTitle: 'Diagnostic Steps:',
      steps: [
        'Pelvic ultrasound',
        'Hormone testing',
        'Hysteroscopy if needed',
        'Tailored treatment options'
      ],
      primaryButtonText: 'Book Appointment',
      secondaryButtonText: 'Contact Us'
    }
  ];

  return (
    <div className="h-auto pt-14">
      <Breadcrumb
        title="Gynecology Service"
        breadcrumbs={[
          { label: 'Home', link: '/' },
          { label: 'Gynecology', link: '/gynecology' }
        ]}
      />
      <TreatmentCard
        title="Compassionate Women's Care"
        subtitle="Expert gynecological care for every stage of life."
        description="From adolescent health to menopause, Vayushri Hospital provides a supportive environment for women to receive expert medical advice and treatment. Our specialists focus on preventive care and effective solutions for complex gynecological issues."
        features={[
          { icon: "check", label: "PCOS Excellence Center", color: "text-pink-500" },
          { icon: "trending", label: "Menstrual Disorders Clinic", color: "text-blue-500" },
          { icon: "award", label: "Board-Certified Gynecologists", color: "text-purple-500" }
        ]}
        highlights={[
          { icon: "Baby", title: "Wellness", subtitle: "Total Health Focus", color: "text-blue-600" },
          { icon: "Award", title: "Technology", subtitle: "Latest Diagnostics", color: "text-green-500" },
          { icon: "Users", title: "Compassion", subtitle: "Empathetic Care", color: "text-purple-500" }
        ]}
        image="https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80"
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

export default GynecologyPage;
