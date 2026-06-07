import DoctorsCard from "../components/DoctorsCard";
import imgShanmugapriya from '../../../assets/Doctorimages/shanmugapriya.webp';
import imgRobin from '../../../assets/Doctorimages/robin.webp';
import imgAravind from '../../../assets/Doctorimages/aravind.webp';
import FAQ from "../components/Faq";
import Support from "../components/Support";
import { Award, Baby, Users, Check } from 'lucide-react';
import Treatments from "../components/Treatments";
import { useNavigate } from "react-router-dom";

function OncologyPage() {
  const navigate = useNavigate();

  const faqData = [
    {
      question: "What is gynecological oncology?",
      answer: "Gynecological oncology is a field of medicine that focuses on cancers of the female reproductive system, including ovarian cancer, uterine cancer, vaginal cancer, cervical cancer, and vulvar cancer."
    },
    {
      question: "How important is regular screening?",
      answer: "Regular screening, such as Pap smears and HPV testing, is crucial for early detection and can significantly improve the chances of successful treatment."
    },
    {
      question: "What treatment options are available?",
      answer: "Treatment options vary depending on the type and stage of cancer and may include surgery, chemotherapy, radiation therapy, or a combination of these."
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
      icon: '🛡️',
      title: 'Advanced Cancer Screening',
      description: 'Comprehensive screening programs for early detection of gynecological cancers.',
      successRate: 'Early Detection Focus',
      duration: 'Ongoing program',
      processTitle: 'Screening Package:',
      steps: [
        'Advanced Pap & HPV testing',
        'Pelvic ultrasound examination',
        'Tumor marker blood tests',
        'Expert risk assessment'
      ],
      primaryButtonText: 'Book Screening',
      secondaryButtonText: 'Learn More'
    },
    {
      icon: '🩺',
      title: 'Multidisciplinary Cancer Care',
      description: 'Coordinated treatment plans involving surgeons, oncologists, and support staff.',
      successRate: 'Comprehensive Approach',
      duration: 'Personalized',
      processTitle: 'Care Pathway:',
      steps: [
        'Tumor board review',
        'Personalized treatment plan',
        'Supportive care treatments',
        'Regular follow-up monitoring'
      ],
      primaryButtonText: 'Request Consultation',
      secondaryButtonText: 'Ask Question'
    }
  ];

  return (
    <div className="h-auto pt-14">

      {/* ── BREADCRUMB ── */}
      <div className="container mx-auto px-4 pt-12 pb-0">
        <nav className="flex items-center gap-2 text-sm">
          <a href="/" className="text-gray-500 hover:text-gray-700 transition-colors">Home</a>
          <span className="text-gray-400">›</span>
          <span className="text-gray-900 font-medium">Oncology</span>
        </nav>
      </div>

      {/* ── HERO SECTION ── */}
      <div className="container mx-auto px-4 pt-6 pb-2">
        <div className="relative bg-gradient-to-br from-rose-50 via-white to-orange-50 rounded-2xl border border-rose-100 overflow-hidden">

          {/* Decorative blobs */}
          <div className="absolute -top-10 -right-10 w-52 h-52 rounded-full bg-rose-100/40 pointer-events-none" />
          <div className="absolute -bottom-8 -left-8 w-36 h-36 rounded-full bg-orange-100/30 pointer-events-none" />

          {/* Top row: text + image */}
          <div className="relative z-10 flex flex-col lg:flex-row items-stretch gap-8 p-8 md:p-10 lg:p-12 pb-6">

            {/* Left: text */}
            <div className="flex-1 flex flex-col justify-center">
              <span className="inline-flex items-center gap-1.5 bg-[#9b1c1c] text-white text-xs font-medium px-3 py-1.5 rounded-full uppercase tracking-wider mb-5 w-fit">
                ✦ Expert Gynecological Oncology
              </span>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1a0d0d] leading-tight mb-3">
                Advanced Cancer Care{' '}
                <span className="text-[#c4973a]">With Compassion</span>
              </h1>

              <p className="text-gray-600 text-base md:text-lg mb-4 leading-relaxed">
                Specialized oncology care focused on female reproductive health.
              </p>

              <p className="text-gray-500 text-sm leading-relaxed mb-6 max-w-xl">
                Vayushri Hospital offers specialized care for cancers of the female
                reproductive system. Our oncology team provides a compassionate and
                comprehensive approach, integrating the latest treatments with holistic
                support to guide patients through every step of their journey.
              </p>

              {/* Feature pills */}
              <div className="flex flex-wrap gap-2">
                {[
                  { label: 'Specialized Cancer Screening',  color: 'bg-rose-50 text-rose-700'   },
                  { label: 'Personalized Treatment Plans',  color: 'bg-orange-50 text-orange-700' },
                  { label: 'Expert Surgical Oncologists',   color: 'bg-purple-50 text-purple-700' },
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
                src="https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=800&q=80"
                alt="Oncology Care"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-3 shadow-md">
                <p className="text-2xl font-bold text-[#9b1c1c]">Early</p>
                <p className="text-xs text-gray-500">Detection Saves Lives</p>
              </div>
            </div>

          </div>

          {/* Bottom row: 3 stat cards */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-4 px-8 md:px-10 lg:px-12 pb-8">
            {[
              { icon: <Baby  className="w-5 h-5 text-rose-600"   />, title: 'Care',       sub: 'Compassionate Support', bg: 'bg-rose-50'   },
              { icon: <Award className="w-5 h-5 text-yellow-500" />, title: 'Technology', sub: 'Latest Therapies',       bg: 'bg-yellow-50' },
              { icon: <Users className="w-5 h-5 text-purple-600" />, title: 'Team',       sub: 'Multidisciplinary Care', bg: 'bg-purple-50' },
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
        description="Our expert team is here to guide you through your cancer care journey with compassion and expertise."
        primaryButtonText="Book Consultation"
        secondaryButtonText="WhatsApp"
        phoneNumber="+919876543210"
        whatsappNumber="+919876543210"
      />

    </div>
  );
}

export default OncologyPage;