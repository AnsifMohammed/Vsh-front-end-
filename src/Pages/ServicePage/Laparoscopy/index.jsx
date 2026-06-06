import Breadcrumb from ".././components/Breadcrumb";
import DoctorsCard from "../components/DoctorsCard";
import FAQ from "../components/Faq";
import Support from "../components/Support";
import TreatmentCard from "../components/TreatmentCard";
import { Award } from 'lucide-react';
import Treatments from "../components/Treatments";

function LaparoscopyPage() {
  const faqData = [
    {
      question: "What is laparoscopic surgery?",
      answer: "Laparoscopic surgery, also known as keyhole surgery, is a modern surgical technique in which operations are performed through small incisions (usually 0.5–1.5 cm) elsewhere in the body."
    },
    {
      question: "How long is the recovery after laparoscopy?",
      answer: "Recovery time is significantly shorter than traditional surgery. Most patients can return to normal activities within 1 to 2 weeks, depending on the complexity of the procedure."
    },
    {
      question: "What are the benefits of minimally invasive surgery?",
      answer: "Benefits include smaller scars, less postoperative pain, reduced risk of infection, and shorter hospital stays."
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
      icon: '🔦',
      title: 'Diagnostic Laparoscopy',
      description: 'Visual examination of pelvic organs to diagnose causes of pain or infertility.',
      successRate: 'Precision Diagnostics',
      duration: '30-60 mins',
      processTitle: 'The Process:',
      steps: [
        'Small umbilical incision',
        'Camera insertion for inspection',
        'Minimal sedation requirements',
        'Precise diagnosis formulation'
      ],
      primaryButtonText: 'Book Procedure',
      secondaryButtonText: 'Learn More'
    },
    {
      icon: '✂️',
      title: 'Laparoscopic Myomectomy',
      description: 'Removal of uterine fibroids while preserving the uterus.',
      successRate: 'Highly Successful',
      duration: '2-3 hours',
      processTitle: 'Surgical Steps:',
      steps: [
        'Multi-port access',
        'Fibroid removal',
        'Uterine wall reconstruction',
        'Rapid recovery monitoring'
      ],
      primaryButtonText: 'Consult Surgeon',
      secondaryButtonText: 'Ask Question'
    }
  ];

  return (
    <div className="h-auto pt-14">
      <Breadcrumb
        title="Laparoscopy"
        breadcrumbs={[
          { label: 'Home', link: '/' },
          { label: 'Laparoscopy', link: '/laparoscopy' }
        ]}
      />
      <TreatmentCard
        title="Advanced Laparoscopic Surgery"
        subtitle="Precision keyhole surgery for faster recovery."
        description="Vayushri Hospital is a leader in minimally invasive gynecological surgery. Our laparoscopic specialists use high-definition imaging and specialized instruments to perform complex procedures with minimal scarring and maximum precision."
        features={[
          { icon: "check", label: "Minimal Invasive Techniques", color: "text-blue-500" },
          { icon: "trending", label: "Shorter Recovery Times", color: "text-green-500" },
          { icon: "award", label: "Expert Keyhole Surgeons", color: "text-purple-500" }
        ]}
        highlights={[
          { icon: "Baby", title: "Precision", subtitle: "HD Visual System", color: "text-blue-600" },
          { icon: "Award", title: "Safety", subtitle: "Lower Infection Risk", color: "text-green-500" },
          { icon: "Users", title: "Comfort", subtitle: "Minimal Pain", color: "text-purple-500" }
        ]}
        image="https://images.unsplash.com/photo-1551076805-e1869033e561?w=800&q=80"
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

export default LaparoscopyPage;
