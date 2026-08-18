import DoctorsCard from "../components/DoctorsCard";
import imgShanmugapriya from '../../../assets/Doctorimages/shanmugapriya.webp';
import imgRobin from '../../../assets/Doctorimages/robin.webp';
import imgAravind from '../../../assets/Doctorimages/aravind.webp';
import FAQ from "../components/Faq";
import Support from "../components/Support";
import { Award, Baby, Users, Check } from 'lucide-react';
import Treatments from "../components/Treatments";
import { useNavigate } from "react-router-dom";
import BreadcrumbHero from ".././components/Breadcrumb";

function IVFPage() {
  const navigate = useNavigate();

  const faqData = [
    {
      question: "What is the success rate of IVF at Vayushri Hospital?",
      answer: "Our IVF success rate ranges from 55-70% per cycle, which is above the national average. Success rates depend on various factors including age, underlying fertility issues, and treatment protocol. Our team provides personalized assessments based on your specific situation."
    },
    {
      question: "How many IVF cycles might I need?",
      answer: "The number of IVF cycles needed varies from person to person. Many patients achieve success within 1-3 cycles. Our fertility specialists will evaluate your individual circumstances and create a customized treatment plan to maximize your chances of success."
    },
    {
      question: "Is IVF treatment painful?",
      answer: "IVF treatment involves some discomfort but is generally not painful. Hormone injections may cause minor discomfort, and the egg retrieval procedure is performed under sedation to ensure your comfort. Most patients find the process manageable and well worth the outcome."
    },
    {
      question: "What is the cost of fertility treatments?",
      answer: "The cost of fertility treatments varies depending on the specific procedures required. IVF typically ranges from ₹1.5-2.5 lakhs per cycle. We offer detailed cost breakdowns during your consultation and can discuss payment plans and financing options to make treatment more accessible."
    },
    {
      question: "How long should we try before considering IVF?",
      answer: "Generally, couples under 35 should try naturally for one year before seeking fertility treatment, while those over 35 should consult after six months. However, if you have known fertility issues or medical conditions affecting fertility, it's advisable to consult a specialist sooner."
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
      icon: '💉',
      title: 'In Vitro Fertilization (IVF)',
      description: 'Most advanced reproductive technology for conception',
      successRate: '65-70% Success Rate',
      duration: '6-8 weeks per cycle',
      processTitle: 'Preparation & Process:',
      steps: [
        'Initial consultation and comprehensive fertility assessment',
        'Hormonal stimulation protocol (8-12 days)',
        'Regular monitoring with ultrasounds and blood tests',
        'Egg retrieval procedure under mild sedation',
        'Embryo culture and development (3-5 days)',
        'Embryo transfer and pregnancy test after 2 weeks'
      ],
      primaryButtonText: 'Book Consultation',
      secondaryButtonText: 'Ask Question',
    },
    {
      icon: '🔬',
      title: 'Intracytoplasmic Sperm Injection (ICSI)',
      description: 'Specialized technique for male factor infertility',
      successRate: '70-75% Success Rate',
      duration: '6-8 weeks per cycle',
      processTitle: 'Preparation & Process:',
      steps: [
        'Comprehensive fertility evaluation for both partners',
        'Ovarian stimulation protocol',
        'Sperm collection and preparation',
        'Single sperm injection into each egg',
        'Embryo development monitoring',
        'Embryo transfer and follow-up'
      ],
      primaryButtonText: 'Book Consultation',
      secondaryButtonText: 'Ask Question',
    },
    {
      icon: '🧪',
      title: 'Intrauterine Insemination (IUI)',
      description: 'Less invasive fertility treatment option',
      successRate: '15-20% Success Rate',
      duration: '2-3 weeks per cycle',
      processTitle: 'Preparation & Process:',
      steps: [
        'Ovulation monitoring and tracking',
        'Sperm preparation and washing',
        'Timed insemination procedure',
        'Post-procedure rest and monitoring',
        'Pregnancy test after 2 weeks'
      ],
      primaryButtonText: 'Book Consultation',
      secondaryButtonText: 'Ask Question',
    },
    {
      icon: '🧊',
      title: 'Fertility Preservation',
      description: 'Protect your future family planning options',
      successRate: '90%+ survival rate',
      duration: '2-3 weeks for collection',
      processTitle: 'Preparation & Process:',
      steps: [
        'Initial consultation and assessment',
        'Ovarian stimulation (if needed)',
        'Egg or sperm collection',
        'Cryopreservation and storage',
        'Long-term monitoring and maintenance'
      ],
      primaryButtonText: 'Book Consultation',
      secondaryButtonText: 'Ask Question',
    }
  ];

  return (
    <div className="h-auto pt-14">

      {/* ── BREADCRUMB ── */}
      {/* <BreadcrumbHero
        title="IVF & Fertility"
        breadcrumbs={[
          { label: 'Home', link: '/' },
          { label: 'IVF & Fertility', link: '/ivf-fertility' }
        ]}
      /> */}
      {/* ── BREADCRUMB ── */}
      <div className="container mx-auto px-4 pt-12 pb-0">
        <nav className="flex items-center gap-2 text-sm">
          {/* <span className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-full px-3 py-1.5 text-gray-500 shadow-sm">
            🌸 Fertility Care
          </span>
          <span className="text-gray-400">›</span> */}
          <a href="/" className="text-gray-500 hover:text-gray-700 transition-colors">Home</a>
          <span className="text-gray-400">›</span>
          <span className="text-gray-900 font-medium">IVF & Fertility</span>
        </nav>
      </div>

      {/* ── HERO SECTION ── */}
      <div className="container mx-auto px-4 pt-6 pb-2">
        <div className="relative bg-gradient-to-br from-purple-50 via-white to-pink-50 rounded-2xl border border-purple-100 overflow-hidden">

          {/* Decorative blobs */}
          <div className="absolute -top-10 -right-10 w-52 h-52 rounded-full bg-purple-100/40 pointer-events-none" />
          <div className="absolute -bottom-8 -left-8 w-36 h-36 rounded-full bg-pink-100/30 pointer-events-none" />

          {/* Top row: text + image */}
          <div className="relative z-10 flex flex-col lg:flex-row items-stretch gap-8 p-8 md:p-10 lg:p-12 pb-6">

            {/* Left: text */}
            <div className="flex-1 flex flex-col justify-center">
              <span className="inline-flex items-center gap-1.5 bg-[#6b3fa0] text-white text-xs font-medium px-3 py-1.5 rounded-full uppercase tracking-wider mb-5 w-fit">
                ✦ Trusted Fertility Center in Chennai
              </span>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1a0d2e] leading-tight mb-3">
                Your Journey to{' '}
                <span className="text-[#c4973a]">Parenthood</span>
              </h1>

              <p className="text-gray-600 text-base md:text-lg mb-4 leading-relaxed">
                Advanced fertility solutions with compassion and expertise.
              </p>

              <p className="text-gray-500 text-sm leading-relaxed mb-6 max-w-xl">
                At Vayushri Hospital, we combine cutting-edge reproductive technology
                with personalized emotional support to help you achieve your dream of
                starting a family. Our state-of-the-art IVF lab and experienced
                specialists ensure you receive the highest standard of care.
              </p>

              {/* Feature pills */}
              <div className="flex flex-wrap gap-2">
                {[
                  { label: 'Advanced Embryology Lab', color: 'bg-purple-50 text-purple-700' },
                  { label: 'High Success Rates',      color: 'bg-blue-50 text-blue-700'   },
                  { label: 'Expert Fertility Team',   color: 'bg-pink-50 text-pink-700'   },
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
                src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&q=80"
                alt="IVF Lab"
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* Dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              {/* Floating badge */}
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-3 shadow-md">
                <p className="text-2xl font-bold text-[#6b3fa0]">70%</p>
                <p className="text-xs text-gray-500">Cycle Success Rate</p>
              </div>
            </div>

          </div>

          {/* Bottom row: 3 stat cards */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-4 px-8 md:px-10 lg:px-12 pb-8">
            {[
              { icon: <Baby  className="w-5 h-5 text-blue-600"   />, title: 'Success',   sub: '70% Cycle Rate',  bg: 'bg-blue-50'   },
              { icon: <Award className="w-5 h-5 text-yellow-500" />, title: 'Certified',  sub: 'NABH Accredited', bg: 'bg-yellow-50' },
              { icon: <Users className="w-5 h-5 text-purple-600" />, title: 'Counseling', sub: '24/7 Support',    bg: 'bg-purple-50' },
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
        description="Our expert team is here to guide you through your fertility assessment journey with personalized care and support."
        primaryButtonText="Book Consultation"
        secondaryButtonText="WhatsApp"
        phoneNumber="+91 77085 55635"
        whatsappNumber="+917708555635"
      />

    </div>
  );
}

export default IVFPage;