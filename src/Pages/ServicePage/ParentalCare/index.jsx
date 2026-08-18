import DoctorsCard from "../components/DoctorsCard";
import imgShanmugapriya from '../../../assets/Doctorimages/shanmugapriya.webp';
import imgRobin from '../../../assets/Doctorimages/robin.webp';
import imgAravind from '../../../assets/Doctorimages/aravind.webp';
import FAQ from "../components/Faq";
import Support from "../components/Support";
import { Award, Baby, Users, Check } from 'lucide-react';
import Treatments from "../components/Treatments";
import { useNavigate } from "react-router-dom";

function ParentalCarePage() {
  const navigate = useNavigate();

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

      {/* ── BREADCRUMB ── */}
      <div className="container mx-auto px-4 pt-12 pb-0">
        <nav className="flex items-center gap-2 text-sm">
          <a href="/" className="text-gray-500 hover:text-gray-700 transition-colors">Home</a>
          <span className="text-gray-400">›</span>
          <span className="text-gray-900 font-medium">Parental Care</span>
        </nav>
      </div>

      {/* ── HERO SECTION ── */}
      <div className="container mx-auto px-4 pt-6 pb-2">
        <div className="relative bg-gradient-to-br from-amber-50 via-white to-yellow-50 rounded-2xl border border-amber-100 overflow-hidden">

          {/* Decorative blobs */}
          <div className="absolute -top-10 -right-10 w-52 h-52 rounded-full bg-amber-100/40 pointer-events-none" />
          <div className="absolute -bottom-8 -left-8 w-36 h-36 rounded-full bg-yellow-100/30 pointer-events-none" />

          {/* Top row: text + image */}
          <div className="relative z-10 flex flex-col lg:flex-row items-stretch gap-8 p-8 md:p-10 lg:p-12 pb-6">

            {/* Left: text */}
            <div className="flex-1 flex flex-col justify-center">
              <span className="inline-flex items-center gap-1.5 bg-[#92610a] text-white text-xs font-medium px-3 py-1.5 rounded-full uppercase tracking-wider mb-5 w-fit">
                ✦ Holistic Parental Support
              </span>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1a1206] leading-tight mb-3">
                Empowering You for{' '}
                <span className="text-[#c4973a]">New Parenthood</span>
              </h1>

              <p className="text-gray-600 text-base md:text-lg mb-4 leading-relaxed">
                Comprehensive post-natal support for a confident, joyful start.
              </p>

              <p className="text-gray-500 text-sm leading-relaxed mb-6 max-w-xl">
                At Vayushri Hospital, we believe care extends beyond delivery. Our
                parental support programs ensure you have all the tools, knowledge,
                and emotional backing needed to navigate the beautiful journey of
                new parenthood with confidence.
              </p>

              {/* Feature pills */}
              <div className="flex flex-wrap gap-2">
                {[
                  { label: 'Lactation Counseling',        color: 'bg-amber-50 text-amber-700'  },
                  { label: 'Post-partum Recovery',        color: 'bg-yellow-50 text-yellow-700' },
                  { label: 'Certified Parenting Educators', color: 'bg-orange-50 text-orange-700' },
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
                src="https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=800&q=80"
                alt="Parental Care"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-3 shadow-md">
                <p className="text-2xl font-bold text-[#92610a]">100%</p>
                <p className="text-xs text-gray-500">Dedicated Support</p>
              </div>
            </div>

          </div>

          {/* Bottom row: 3 stat cards */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-4 px-8 md:px-10 lg:px-12 pb-8">
            {[
              { icon: <Baby  className="w-5 h-5 text-amber-600"  />, title: 'Success',   sub: 'Happy Families',        bg: 'bg-amber-50'  },
              { icon: <Award className="w-5 h-5 text-yellow-500" />, title: 'Expertise',  sub: 'Newborn Specialists',   bg: 'bg-yellow-50' },
              { icon: <Users className="w-5 h-5 text-orange-500" />, title: 'Community', sub: 'Parent Support Groups',  bg: 'bg-orange-50' },
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
        description="Our expert team is here to support you and your family through every milestone of new parenthood."
        primaryButtonText="Book Consultation"
        secondaryButtonText="WhatsApp"
        phoneNumber="+91 77085 55635"
        whatsappNumber="+917708555635"
      />

    </div>
  );
}

export default ParentalCarePage;