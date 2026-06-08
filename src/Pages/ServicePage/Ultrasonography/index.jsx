import DoctorsCard from "../components/DoctorsCard";
import imgShanmugapriya from '../../../assets/Doctorimages/shanmugapriya.webp';
import imgRobin from '../../../assets/Doctorimages/robin.webp';
import imgAravind from '../../../assets/Doctorimages/aravind.webp';
import FAQ from "../components/Faq";
import PatientStories from "../components/Patientstories";
import Support from "../components/Support";
import { Award, Baby, Users, Check, Heart } from 'lucide-react';
import Treatments from "../components/Treatments";
import { useNavigate } from "react-router-dom";

function UltraSonographyPage() {
  const navigate = useNavigate();

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

      {/* ── BREADCRUMB ── */}
      <div className="container mx-auto px-4 pt-12 pb-0">
        <nav className="flex items-center gap-2 text-sm">
          <a href="/" className="text-gray-500 hover:text-gray-700 transition-colors">Home</a>
          <span className="text-gray-400">›</span>
          <span className="text-gray-900 font-medium">Ultrasonography</span>
        </nav>
      </div>

      {/* ── HERO SECTION ── */}
      <div className="container mx-auto px-4 pt-6 pb-2">
        <div className="relative bg-gradient-to-br from-sky-50 via-white to-violet-50 rounded-2xl border border-sky-100 overflow-hidden">

          {/* Decorative blobs */}
          <div className="absolute -top-10 -right-10 w-52 h-52 rounded-full bg-sky-100/40 pointer-events-none" />
          <div className="absolute -bottom-8 -left-8 w-36 h-36 rounded-full bg-violet-100/30 pointer-events-none" />

          {/* Top row: text + image */}
          <div className="relative z-10 flex flex-col lg:flex-row items-stretch gap-8 p-8 md:p-10 lg:p-12 pb-6">

            {/* Left: text */}
            <div className="flex-1 flex flex-col justify-center">
              <span className="inline-flex items-center gap-1.5 bg-[#0369a1] text-white text-xs font-medium px-3 py-1.5 rounded-full uppercase tracking-wider mb-5 w-fit">
                ✦ Advanced Diagnostic Imaging
              </span>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0d1826] leading-tight mb-3">
                Clear Insights for Your{' '}
                <span className="text-[#c4973a]">Health Journey</span>
              </h1>

              <p className="text-gray-600 text-base md:text-lg mb-4 leading-relaxed">
                State-of-the-art ultrasound imaging for precise diagnosis and monitoring.
              </p>

              <p className="text-gray-500 text-sm leading-relaxed mb-6 max-w-xl">
                Vayushri Hospital features state-of-the-art ultrasonography equipment
                and experienced radiologists. Our imaging services provide the precision
                needed for accurate diagnosis and monitoring, ensuring you receive the
                best care based on clear, reliable data.
              </p>

              {/* Feature pills */}
              <div className="flex flex-wrap gap-2">
                {[
                  { label: 'High-Definition 3D/4D Scans', color: 'bg-sky-50 text-sky-700'    },
                  { label: 'Non-Invasive Diagnostics',    color: 'bg-violet-50 text-violet-700' },
                  { label: 'Specialized Radiologists',    color: 'bg-blue-50 text-blue-700'   },
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
                src="https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&q=80"
                alt="Ultrasonography"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-3 shadow-md">
                <p className="text-2xl font-bold text-[#0369a1]">NABL</p>
                <p className="text-xs text-gray-500">Accredited Standards</p>
              </div>
            </div>

          </div>

          {/* Bottom row: 3 stat cards */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-4 px-8 md:px-10 lg:px-12 pb-8">
            {[
              { icon: <Baby  className="w-5 h-5 text-sky-600"    />, title: 'Clarity',   sub: 'Advanced Resolution', bg: 'bg-sky-50'    },
              { icon: <Award className="w-5 h-5 text-green-500"  />, title: 'Certified', sub: 'NABL Standards',      bg: 'bg-green-50'  },
              { icon: <Users className="w-5 h-5 text-violet-600" />, title: 'Quick',     sub: 'Instant Reports',     bg: 'bg-violet-50' },
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

      {/* ── PATIENT STORIES ── */}
      <PatientStories
        badgeText="Patient Stories"
        badgeIcon={<Heart className="w-4 h-4" />}
        heading="Stories of Hope & Success"
        highlightText="Hope & Success"
        description="Real experiences from real families who found their path to parenthood with our care and support"
        stories={storiesData}
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
        description="Our expert team is here to guide you with precise imaging and compassionate care every step of the way."
        primaryButtonText="Book Consultation"
        secondaryButtonText="WhatsApp"
        phoneNumber="+919876543210"
        whatsappNumber="+919876543210"
      />

    </div>
  );
}

export default UltraSonographyPage;