import DoctorsCard from "../components/DoctorsCard";
import imgShanmugapriya from '../../../assets/Doctorimages/shanmugapriya.webp';
import imgRobin from '../../../assets/Doctorimages/robin.webp';
import imgAravind from '../../../assets/Doctorimages/aravind.webp';
import FAQ from "../components/Faq";
import Support from "../components/Support";
import TreatmentCard from "../components/TreatmentCard";
import { Award, Baby, Users, Check } from 'lucide-react';
import Treatments from "../components/Treatments";
import { useNavigate } from "react-router-dom";

function GynecologyPage() {
  const navigate = useNavigate();

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

  const doctorsData = [
    {
      id: 1,
      name: "Dr. Shanmugapriya",
      specialization: "Fertility Specialist",
      credentials: "MD, DGO, Fellowship in IVF",
      experience: "19+ Years",
      description: "Leading fertility specialist with expertise in advanced reproductive technologies and personalized treatment approaches.",
      image: imgShanmugapriya
    },
    {
      id: 2,
      name: "Dr. Robin",
      specialization: "Anaesthetist",
      credentials: "MBBS, MD - Madras Engineering College",
      experience: "24+ Years",
      description: "ICU Specialist and Intensivist with expertise in critical care, anaesthesia, and pain management.",
      image: imgRobin
    },
    {
      id: 3,
      name: "Dr. Aravind",
      specialization: "Obstetrician",
      credentials: "MD, DGO, Fellowship in IVF",
      experience: "15+ Years",
      description: "Expert in managing complex pregnancies with a focus on maternal and fetal wellness throughout pregnancy.",
      image: imgAravind
    }
  ];

  const handleViewAllDoctors = () => {
    navigate('/doctors');
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

      {/* ── BREADCRUMB ── */}
      <div className="container mx-auto px-4 pt-12 pb-0">
        <nav className="flex items-center gap-2 text-sm">
          <a href="/" className="text-gray-500 hover:text-gray-700 transition-colors">Home</a>
          <span className="text-gray-400">›</span>
          <span className="text-gray-900 font-medium">Gynecology</span>
        </nav>
      </div>

      {/* ── HERO SECTION ── */}
      <div className="container mx-auto px-4 pt-6 pb-2">
        <div className="relative bg-gradient-to-br from-pink-50 via-white to-purple-50 rounded-2xl border border-pink-100 overflow-hidden">

          {/* Decorative blobs */}
          <div className="absolute -top-10 -right-10 w-52 h-52 rounded-full bg-pink-100/40 pointer-events-none" />
          <div className="absolute -bottom-8 -left-8 w-36 h-36 rounded-full bg-purple-100/30 pointer-events-none" />

          {/* Top row: text + image */}
          <div className="relative z-10 flex flex-col lg:flex-row items-stretch gap-8 p-8 md:p-10 lg:p-12 pb-6">

            {/* Left: text */}
            <div className="flex-1 flex flex-col justify-center">
              <span className="inline-flex items-center gap-1.5 bg-[#a03f6b] text-white text-xs font-medium px-3 py-1.5 rounded-full uppercase tracking-wider mb-5 w-fit">
                ✦ Compassionate Women's Care
              </span>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1a0d2e] leading-tight mb-3">
                Expert Care for{' '}
                <span className="text-[#c4973a]">Every Woman</span>
              </h1>

              <p className="text-gray-600 text-base md:text-lg mb-4 leading-relaxed">
                Trusted gynecological care at every stage of your life.
              </p>

              <p className="text-gray-500 text-sm leading-relaxed mb-6 max-w-xl">
                At Vayushri Hospital, we provide a supportive and confidential environment
                for women to receive expert medical advice and treatment. From adolescent
                health to menopause, our specialists focus on preventive care and effective
                solutions for complex gynecological conditions.
              </p>

              {/* Feature pills */}
              <div className="flex flex-wrap gap-2">
                {[
                  { label: 'PCOS Excellence Center',       color: 'bg-pink-50 text-pink-700'   },
                  { label: 'Menstrual Disorders Clinic',   color: 'bg-purple-50 text-purple-700' },
                  { label: 'Board-Certified Gynecologists', color: 'bg-blue-50 text-blue-700'   },
                ].map((f, i) => (
                  <span key={i} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${f.color}`}>
                    <Check className="w-3 h-3" /> {f.label}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: large image with floating badge */}
            <div className="relative flex-shrink-0 w-full lg:w-[420px] min-h-[320px] lg:min-h-[420px] rounded-2xl overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80"
                alt="Gynecology Care"
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* Dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              {/* Floating badge */}
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-3 shadow-md">
                <p className="text-2xl font-bold text-[#a03f6b]">95%</p>
                <p className="text-xs text-gray-500">Patient Satisfaction</p>
              </div>
            </div>

          </div>

          {/* Bottom row: 3 stat cards */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-4 px-8 md:px-10 lg:px-12 pb-8">
            {[
              { icon: <Baby  className="w-5 h-5 text-pink-600"   />, title: 'Wellness',    sub: 'Total Health Focus',  bg: 'bg-pink-50'   },
              { icon: <Award className="w-5 h-5 text-yellow-500" />, title: 'Technology',  sub: 'Latest Diagnostics',  bg: 'bg-yellow-50' },
              { icon: <Users className="w-5 h-5 text-purple-600" />, title: 'Compassion',  sub: 'Empathetic Care',     bg: 'bg-purple-50' },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-3 bg-white border border-gray-100 rounded-xl px-5 py-4 shadow-sm">
                <div className={`w-10 h-10 rounded-lg ${s.bg} flex items-center justify-center flex-shrink-0`}>
                  {s.icon}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">{s.title}</p>
                  <p className="text-xs text-gray-500">{s.sub}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* ── TREATMENTS ── */}
      <Treatments
        title="Available Treatments"
        highlightText="Treatments"
        subtitle="Explore our comprehensive range of treatments designed for your specific needs"
        treatments={treatmentsData}
      />

      {/* ── DOCTORS ── */}
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

      {/* ── FAQ ── */}
      <FAQ
        title="Frequently Asked Questions"
        highlightText="Questions"
        subtitle="Get answers to common questions about our treatments and procedures"
        faqs={faqData}
      />

      {/* ── SUPPORT ── */}
      <Support
        heading="Ready to take next step?"
        description="Our expert team is here to guide you through your women's health journey with personalized care and support."
        primaryButtonText="Book Consultation"
        secondaryButtonText="WhatsApp"
        phoneNumber="+919876543210"
        whatsappNumber="+919876543210"
      />

    </div>
  );
}

export default GynecologyPage;