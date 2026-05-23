import Breadcrumb from ".././components/Breadcrumb";
import DoctorsCard from "../components/DoctorsCard";
import FAQ from "../components/Faq";
import PatientStories from "../components/Patientstories";
import Support from "../components/Support";
import TreatmentCard from "../components/TreatmentCard";
import { Award, Heart } from 'lucide-react';
import Treatments from "../components/Treatments";

function UltraSonographyPage() {
  const faqData = [
    {
      question: "Are ultrasounds safe during pregnancy?",
      answer: "Yes, ultrasounds use sound waves, not radiation, and have been used safely in obstetrics for decades to monitor fetal development."
    },
    {
      question: "Do I need any preparation for my scan?",
      answer: "For certain scans, like early pregnancy or pelvic ultrasounds, a full bladder may be required. Our team will provide specific instructions when you book."
    },
    {
      question: "What is the difference between 3D and 4D scans?",
      answer: "A 3D scan shows still images of the baby in three dimensions, while a 4D scan adds the element of motion, allowing you to see the baby move in real-time."
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
      icon: '📡',
      title: 'Advanced Obstetric Scans',
      description: 'High-resolution imaging to monitor fetal health at every stage.',
      successRate: 'Precision Imaging',
      duration: '20-40 mins',
      processTitle: 'Available Scans:',
      steps: [
        'Early pregnancy viability',
        'NT/NB screening',
        'Anomaly scanning',
        'Growth & Doppler studies'
      ],
      primaryButtonText: 'Book Scan',
      secondaryButtonText: 'Learn More'
    },
    {
      icon: '🖥️',
      title: '3D/4D Fetal Visualization',
      description: 'Experience a detailed first look at your baby in motion.',
      successRate: 'Lifelike Detail',
      duration: '30 mins',
      processTitle: 'Experience:',
      steps: [
        'Crystal clear 3D images',
        'Real-time 4D video',
        'Digital copies available',
        'Family viewing environment'
      ],
      primaryButtonText: 'Schedule Visit',
      secondaryButtonText: 'Ask Question'
    }
  ];

  return (
    <div className="h-auto pt-14">
      <Breadcrumb
        title="Ultrasonography Service"
        breadcrumbs={[
          { label: 'Home', link: '/' },
          { label: 'Ultrasonography', link: '/ultrasonography' }
        ]}
      />
      <TreatmentCard
        title="Advanced Diagnostic Imaging"
        subtitle="Clear insights for your health journey."
        description="Vayushri Hospital features state-of-the-art ultrasonography equipment and experienced radiologists. Our imaging services provide the precision needed for accurate diagnosis and monitoring, ensuring you receive the best care based on clear data."
        features={[
          { icon: "check", label: "High-Definition 3D/4D Scans", color: "text-blue-500" },
          { icon: "trending", label: "Non-Invasive Diagnostics", color: "text-green-500" },
          { icon: "award", label: "Specialized Radiologists", color: "text-purple-500" }
        ]}
        highlights={[
          { icon: "Baby", title: "Clarity", subtitle: "Advanced Resolution", color: "text-blue-600" },
          { icon: "Award", title: "Certied", subtitle: "NABL Standards", color: "text-green-500" },
          { icon: "Users", title: "Quick", subtitle: "Instant Reports", color: "text-purple-500" }
        ]}
        image="https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&q=80"
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

export default UltraSonographyPage;
