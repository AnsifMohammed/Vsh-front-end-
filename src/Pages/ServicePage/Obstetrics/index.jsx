import DoctorsCard from "../components/DoctorsCard";
import imgShanmugapriya from '../../../assets/Doctorimages/shanmugapriya.webp';
import imgRobin from '../../../assets/Doctorimages/robin.webp';
import imgAravind from '../../../assets/Doctorimages/aravind.webp';
import FAQ from "../components/Faq";
import Support from "../components/Support";
import { Award, Baby, Users, Check } from 'lucide-react';
import Treatments from "../components/Treatments";
import { useNavigate } from "react-router-dom";

function ObstetricPage() {
  const navigate = useNavigate();

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

      {/* ── BREADCRUMB ── */}
      <div className="container mx-auto px-4 pt-12 pb-0">
        <nav className="flex items-center gap-2 text-sm">
          <a href="/" className="text-gray-500 hover:text-gray-700 transition-colors">Home</a>
          <span className="text-gray-400">›</span>
          <span className="text-gray-900 font-medium">Obstetrics</span>
        </nav>
      </div>

      {/* ── HERO SECTION ── */}
      <div className="container mx-auto px-4 pt-6 pb-2">
        <div className="relative bg-gradient-to-br from-blue-50 via-white to-teal-50 rounded-2xl border border-blue-100 overflow-hidden">

          {/* Decorative blobs */}
          <div className="absolute -top-10 -right-10 w-52 h-52 rounded-full bg-blue-100/40 pointer-events-none" />
          <div className="absolute -bottom-8 -left-8 w-36 h-36 rounded-full bg-teal-100/30 pointer-events-none" />

          {/* Top row: text + image */}
          <div className="relative z-10 flex flex-col lg:flex-row items-stretch gap-8 p-8 md:p-10 lg:p-12 pb-6">

            {/* Left: text */}
            <div className="flex-1 flex flex-col justify-center">
              <span className="inline-flex items-center gap-1.5 bg-[#1a6b8a] text-white text-xs font-medium px-3 py-1.5 rounded-full uppercase tracking-wider mb-5 w-fit">
                ✦ Exceptional Maternity Care
              </span>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0d1a2e] leading-tight mb-3">
                A Safe & Joyful{' '}
                <span className="text-[#c4973a]">New Beginning</span>
              </h1>

              <p className="text-gray-600 text-base md:text-lg mb-4 leading-relaxed">
                Comprehensive obstetric care through every milestone of your pregnancy.
              </p>

              <p className="text-gray-500 text-sm leading-relaxed mb-6 max-w-xl">
                At Vayushri Hospital, our labor and delivery suites are equipped with
                modern technology and managed by a compassionate team that values both
                the safety of mother and baby and the joy of welcoming a new life into
                the world.
              </p>

              {/* Feature pills */}
              <div className="flex flex-wrap gap-2">
                {[
                  { label: '24/7 Labor & Delivery',     color: 'bg-blue-50 text-blue-700'   },
                  { label: 'Painless Labor Options',    color: 'bg-teal-50 text-teal-700'   },
                  { label: 'Expert Midwives & Doctors', color: 'bg-green-50 text-green-700' },
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
                src="https://plus.unsplash.com/premium_photo-1661606400554-a2055d50ee08?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8b2JzdGV0cmljfGVufDB8fDB8fHww"
                alt="Maternity Care"
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* Dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              {/* Floating badge */}
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-3 shadow-md">
                <p className="text-2xl font-bold text-[#1a6b8a]">III</p>
                <p className="text-xs text-gray-500">Level III NICU</p>
              </div>
            </div>

          </div>

          {/* Bottom row: 3 stat cards */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-4 px-8 md:px-10 lg:px-12 pb-8">
            {[
              { icon: <Baby  className="w-5 h-5 text-blue-600"  />, title: 'Joy',     sub: 'Family-Centered Birth', bg: 'bg-blue-50'  },
              { icon: <Award className="w-5 h-5 text-green-500" />, title: 'Safety',  sub: 'Level III NICU',        bg: 'bg-green-50' },
              { icon: <Users className="w-5 h-5 text-teal-600"  />, title: 'Support', sub: 'Post-natal Care',       bg: 'bg-teal-50'  },
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
        description="Our expert team is here to guide you through your maternity journey with personalized care and support."
        primaryButtonText="Book Consultation"
        secondaryButtonText="WhatsApp"
        phoneNumber="+91 77085 55635"
        whatsappNumber="+917708555635"
      />

    </div>
  );
}

export default ObstetricPage;