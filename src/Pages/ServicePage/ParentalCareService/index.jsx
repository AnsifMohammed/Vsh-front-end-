import Breadcrumb from ".././components/Breadcrumb";
import DoctorsCard from "../components/DoctorsCard";
import FAQ from "../components/Faq";
import PatientStories from "../components/Patientstories";
import Support from "../components/Support";
import TreatmentCard from "../components/TreatmentCard";
import { Award, Heart } from 'lucide-react';
import Treatments from "../components/Treatments";

function ParentalCarePage() {
  const faqData = [
    {
      question: "What is post-natal care?",
      answer: "Post-natal care is the support and medical attention provided to a mother and her newborn following childbirth, focusing on recovery, breastfeeding, and emotional well-being."
    },
    {
      question: "Do you offer lactation support?",
      answer: "Yes, we have certified lactation consultants who provide one-on-one sessions to help mothers with breastfeeding techniques and challenges."
    },
    {
      question: "Are there workshops for new parents?",
      answer: "We conduct regular workshops on newborn care, infant CPR, and post-partum mental health to empower new parents."
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
      icon: '🤱',
      title: 'Post-natal Recovery Program',
      description: 'Physical and emotional support to help you recover after childbirth.',
      successRate: 'Complete Wellness',
      duration: '6-12 weeks',
      processTitle: 'Program Highlights:',
      steps: [
        'Post-partum checkups',
        'Pelvic floor rehabilitation',
        'Mental health screening',
        'Nutritional restoration'
      ],
      primaryButtonText: 'Join Program',
      secondaryButtonText: 'Learn More'
    },
    {
      icon: '🍼',
      title: 'Lactation & Newborn Guidance',
      description: 'Expert advice on breastfeeding and caring for your new baby.',
      successRate: 'Highly Supported',
      duration: 'Variable',
      processTitle: 'Session Topics:',
      steps: [
        'Breastfeeding techniques',
        'Newborn sleep hygiene',
        'Bathing and hygiene tips',
        'Growth monitoring'
      ],
      primaryButtonText: 'Book Consultant',
      secondaryButtonText: 'Ask Question'
    }
  ];

  return (
    <div className="h-auto pt-14">
      <Breadcrumb
        title="Parental Care Service"
        breadcrumbs={[
          { label: 'Home', link: '/' },
          { label: 'Parental Care', link: '/parentalcare' }
        ]}
      />
      <TreatmentCard
        title="Holistic Parental Support"
        subtitle="Empowering parents for a confident start."
        description="At Vayushri Hospital, we believe care extends beyond delivery. Our parental support services ensure that you have all the tools, knowledge, and emotional backing needed to navigate the beautiful journey of new parenthood."
        features={[
          { icon: "check", label: "Lactation Counseling", color: "text-blue-500" },
          { icon: "trending", label: "Post-partum Recovery", color: "text-green-500" },
          { icon: "award", label: "Certified Parenting Educators", color: "text-purple-500" }
        ]}
        highlights={[
          { icon: "Baby", title: "Success", subtitle: "Happy Families", color: "text-blue-600" },
          { icon: "Award", title: "Expertise", subtitle: "Newborn Specialists", color: "text-yellow-500" },
          { icon: "Users", title: "Community", subtitle: "Parent Support Groups", color: "text-purple-500" }
        ]}
        image="https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=800&q=80"
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

export default ParentalCarePage;
