import DoctorsCard from "../components/DoctorsCard";
import imgShanmugapriya from '../../../assets/Doctorimages/shanmugapriya.webp';
import imgRobin from '../../../assets/Doctorimages/robin.webp';
import imgAravind from '../../../assets/Doctorimages/aravind.webp';
import FAQ from "../components/Faq";
import Support from "../components/Support";
import { Award, Baby, Users, Check } from 'lucide-react';
import Treatments from "../components/Treatments";
import { useNavigate } from "react-router-dom";

function LaparoscopyPage() {
  const navigate = useNavigate();

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

      {/* ── BREADCRUMB ── */}
      <div className="container mx-auto px-4 pt-12 pb-0">
        <nav className="flex items-center gap-2 text-sm">
          <a href="/" className="text-gray-500 hover:text-gray-700 transition-colors">Home</a>
          <span className="text-gray-400">›</span>
          <span className="text-gray-900 font-medium">Laparoscopy</span>
        </nav>
      </div>

      {/* ── HERO SECTION ── */}
      <div className="container mx-auto px-4 pt-6 pb-2">
        <div className="relative bg-gradient-to-br from-cyan-50 via-white to-green-50 rounded-2xl border border-cyan-100 overflow-hidden">

          {/* Decorative blobs */}
          <div className="absolute -top-10 -right-10 w-52 h-52 rounded-full bg-cyan-100/40 pointer-events-none" />
          <div className="absolute -bottom-8 -left-8 w-36 h-36 rounded-full bg-green-100/30 pointer-events-none" />

          {/* Top row: text + image */}
          <div className="relative z-10 flex flex-col lg:flex-row items-stretch gap-8 p-8 md:p-10 lg:p-12 pb-6">

            {/* Left: text */}
            <div className="flex-1 flex flex-col justify-center">
              <span className="inline-flex items-center gap-1.5 bg-[#0e7490] text-white text-xs font-medium px-3 py-1.5 rounded-full uppercase tracking-wider mb-5 w-fit">
                ✦ Advanced Laparoscopic Surgery
              </span>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0d1a1e] leading-tight mb-3">
                Precision Keyhole{' '}
                <span className="text-[#c4973a]">Surgery</span>
              </h1>

              <p className="text-gray-600 text-base md:text-lg mb-4 leading-relaxed">
                Minimally invasive techniques for faster recovery and less pain.
              </p>

              <p className="text-gray-500 text-sm leading-relaxed mb-6 max-w-xl">
                Vayushri Hospital is a leader in minimally invasive gynecological surgery.
                Our laparoscopic specialists use high-definition imaging and specialized
                instruments to perform complex procedures with minimal scarring and
                maximum precision, getting you back to life sooner.
              </p>

              {/* Feature pills */}
              <div className="flex flex-wrap gap-2">
                {[
                  { label: 'Minimal Invasive Techniques', color: 'bg-cyan-50 text-cyan-700'  },
                  { label: 'Shorter Recovery Times',      color: 'bg-green-50 text-green-700' },
                  { label: 'Expert Keyhole Surgeons',     color: 'bg-blue-50 text-blue-700'   },
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
                src="https://images.unsplash.com/photo-1551076805-e1869033e561?w=800&q=80"
                alt="Laparoscopic Surgery"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-3 shadow-md">
                <p className="text-2xl font-bold text-[#0e7490]">1–2 wks</p>
                <p className="text-xs text-gray-500">Average Recovery Time</p>
              </div>
            </div>

          </div>

          {/* Bottom row: 3 stat cards */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-4 px-8 md:px-10 lg:px-12 pb-8">
            {[
              { icon: <Baby  className="w-5 h-5 text-cyan-600"  />, title: 'Precision', sub: 'HD Visual System',     bg: 'bg-cyan-50'  },
              { icon: <Award className="w-5 h-5 text-green-500" />, title: 'Safety',    sub: 'Lower Infection Risk', bg: 'bg-green-50' },
              { icon: <Users className="w-5 h-5 text-blue-600"  />, title: 'Comfort',   sub: 'Minimal Pain',         bg: 'bg-blue-50'  },
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
        description="Our expert team is here to guide you through your surgical journey with personalized care and support."
        primaryButtonText="Book Consultation"
        secondaryButtonText="WhatsApp"
        phoneNumber="+919876543210"
        whatsappNumber="+919876543210"
      />

    </div>
  );
}

export default LaparoscopyPage;