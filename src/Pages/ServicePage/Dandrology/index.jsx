import Breadcrumb from ".././components/Breadcrumb";
import DoctorsCard from "../components/DoctorsCard";
import FAQ from "../components/Faq";
import Support from "../components/Support";
import TreatmentCard from "../components/TreatmentCard";
import { Award } from 'lucide-react';
import Treatments from "../components/Treatments";

function DandrologyPage() {
  const faqData = [
    {
      question: "What is Andrology?",
      answer: "Andrology is the medical specialty that deals with male health, particularly relating to the male reproductive system and urological problems that are unique to men."
    },
    {
      question: "When should a man consult an andrologist?",
      answer: "A consultation is recommended if there are concerns about infertility, erectile dysfunction, hormonal imbalances, or other reproductive health issues after six months of trying to conceive."
    },
    {
      question: "What are the common causes of male infertility?",
      answer: "Common causes include low sperm count, poor sperm motility, abnormal sperm shape, hormonal imbalances, and physical obstructions."
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
      icon: '🔬',
      title: 'Advanced Semen Analysis',
      description: 'Comprehensive evaluation of sperm count, motility, and morphology.',
      successRate: 'Highly Accurate',
      duration: 'Same day results',
      processTitle: 'Evaluation Process:',
      steps: [
        'Semen sample collection',
        'Microscopic examination',
        'Biochemical analysis',
        'Detailed report generation'
      ],
      primaryButtonText: 'Book Test',
      secondaryButtonText: 'Learn More'
    },
    {
      icon: '💉',
      title: 'Micro-TESE / PESA',
      description: 'Advanced surgical sperm retrieval for cases of zero sperm count.',
      successRate: '60-70% Retrieval Rate',
      duration: 'Day care procedure',
      processTitle: 'The Procedure:',
      steps: [
        'Local or general anesthesia',
        'Microscopic tissue extraction',
        'Sperm identification in lab',
        'Cryopreservation for IVF'
      ],
      primaryButtonText: 'Book Consultation',
      secondaryButtonText: 'Ask Question'
    }
  ];

  return (
    <div className="h-auto pt-14">
      <Breadcrumb
        title="Andrology"
        breadcrumbs={[
          { label: 'Home', link: '/' },
          { label: 'Andrology', link: '/andrology' }
        ]}
      />
      <TreatmentCard
        title="Male Fertility Excellence"
        subtitle="Specialized care for male reproductive health."
        description="Our andrology department offers comprehensive diagnostic and therapeutic options for male infertility and sexual health. Using advanced surgical and laboratory techniques, we provide hope to couples facing male-factor challenges."
        features={[
          { icon: "check", label: "Micro-Surgical Sperm Retrieval", color: "text-blue-500" },
          { icon: "trending", label: "Advanced Semen Lab", color: "text-green-500" },
          { icon: "award", label: "Expert Andrologists", color: "text-purple-500" }
        ]}
        highlights={[
          { icon: "Baby", title: "Precision", subtitle: "Micro-TESE Expert", color: "text-blue-600" },
          { icon: "Award", title: "Success", subtitle: "High Retrieval Rate", color: "text-yellow-500" },
          { icon: "Users", title: "Privacy", subtitle: "Confidential Care", color: "text-purple-500" }
        ]}
        image="https://images.unsplash.com/photo-1614815073689-b4d0ed38484a?w=800&q=80"
      />
      <Treatments
        title="Available Treatments"
        highlightText="Treatments"
        subtitle="Explore our comprehensive range of treatments designed for your specific needs"
        treatments={treatmentsData}
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

export default DandrologyPage;
