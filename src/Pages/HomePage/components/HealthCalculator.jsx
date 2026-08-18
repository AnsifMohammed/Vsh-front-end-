import React, { useState, useEffect } from "react";
import {
  Calendar as LucideCalendar,
  Heart,
  Activity,
  Baby,
  X,
  ChevronLeft,
  ChevronRight,
  Share2,
  EyeOff,
  Eye,
  ClipboardList,
  CheckCircle2,
  Clock,
  Stethoscope,
  HelpCircle,
  Sparkles,
  Lightbulb,
  Scale,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { Calendar as PrimeCalendar } from "primereact/calendar";
import Card from "../../../Components/Common/Card";
import FormInput from "../../../Components/Common/FormInput";
import api from "../../../api/api";
import babyImagepic from "../../../assets/OIP.webp";
import { toast } from "../../../Components/Common/ToastProvider";

// Helper to block minus, plus, and exponent keys on numeric inputs
const handleNumberKeyDown = (e) => {
  if (e.key === "-" || e.key === "e" || e.key === "E" || e.key === "+") {
    e.preventDefault();
  }
};
const Modal = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm"
      style={{ paddingTop: "90px" }}
    >
      <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[85vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-5 py-4 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
};

const CalculatorCard = ({
  title,
  subtitle,
  icon,
  bgColor,
  fields,
  calculatorId,
  onCalculate,
  onOpenGuide,
}) => {
  const [formData, setFormData] = useState({});

  const handleInputChange = (fieldName, value, isNumber = false) => {
    let cleanValue = value;
    if (isNumber && typeof value === "string") {
      cleanValue = value.replace(/[^0-9.]/g, "");
    }
    setFormData((prev) => ({
      ...prev,
      [fieldName]: cleanValue,
    }));
  };

  const handleCalculate = () => {
    onCalculate(calculatorId, formData);
  };

  return (
    <div
      className={`${bgColor} rounded-2xl p-5 shadow-sm border border-gray-200 flex flex-col justify-between`}
    >
      <div>
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 p-2 bg-white rounded-lg shadow-sm">
              {icon}
            </div>
            <div className="flex-1">
              <h3 className="card-title text-black mb-0.5">{title}</h3>
              <p className="card-sub-title text-gray-600">{subtitle}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenGuide?.(calculatorId);
            }}
            className="flex-shrink-0 p-1.5 text-gray-400 hover:text-purple-600 hover:bg-white/80 rounded-full transition-colors cursor-pointer"
            title={`How to use ${title}`}
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>

      <div className="grid grid-cols-1 gap-3 mb-4">
        {fields.map((field) =>
          field.type === "calendar" ? (
            <div key={field.name} className="w-full">
              <label className="block text-label font-medium text-gray-700 mb-1.5">
                {field.label}
              </label>
              <PrimeCalendar
                value={
                  formData[field.name] ? new Date(formData[field.name]) : null
                }
                onChange={(e) =>
                  handleInputChange(
                    field.name,
                    e.value ? e.value.toISOString().split("T")[0] : "",
                  )
                }
                dateFormat="dd/mm/yy"
                placeholder={field.placeholder}
                className="w-full"
                inputClassName="w-full border border-gray-300 rounded-md px-4 py-2.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                maxDate={
                  new Date(new Date().setFullYear(new Date().getFullYear() + 1))
                }
                minDate={
                  new Date(new Date().setFullYear(new Date().getFullYear() - 1))
                }
              />
            </div>
          ) : (
            <FormInput
              key={field.name}
              type={field.type}
              label={field.label}
              placeholder={field.placeholder}
              required={field.required}
              min={field.type === "number" ? "1" : undefined}
              onKeyDown={field.type === "number" ? handleNumberKeyDown : undefined}
              value={formData[field.name] || ""}
              onChange={(e) =>
                handleInputChange(
                  field.name,
                  e.target.value,
                  field.type === "number"
                )
              }
              {...field.extraProps}
            />
          ),
        )}
      </div>

      </div>

      <div className="grid grid-cols-1 gap-3 pt-2">
        <Button
          variant="outline"
          fullWidth
          onClick={handleCalculate}
          startIcon={
            <svg
              className="w-4 h-4 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
          }
        >
          <span className="truncate">Calculate</span>
        </Button>
      </div>
    </div>
  );
};

// 🌟 Friendly "How to Use" Popup Card Component
const HowToUseModal = ({
  isOpen,
  onClose,
  initialTab = "menstrual",
  onOpenCalculator,
}) => {
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab, isOpen]);

  if (!isOpen) return null;

  const guideTabs = [
    {
      id: "menstrual",
      label: "Period Tracker",
      icon: <LucideCalendar className="w-4 h-4 text-pink-500" />,
      activeClass: "bg-pink-50 text-pink-700 border-pink-300 ring-2 ring-pink-500/20 shadow-sm",
    },
    {
      id: "pregnancy",
      label: "Pregnancy Assistant",
      icon: <Baby className="w-4 h-4 text-blue-500" />,
      activeClass: "bg-blue-50 text-blue-700 border-blue-300 ring-2 ring-blue-500/20 shadow-sm",
    },
    {
      id: "bmi",
      label: "BMI Calculator",
      icon: <Activity className="w-4 h-4 text-emerald-500" />,
      activeClass: "bg-emerald-50 text-emerald-700 border-emerald-300 ring-2 ring-emerald-500/20 shadow-sm",
    },
  ];

  const guideDetails = {
    menstrual: {
      title: "Menstrual Cycle & Ovulation Tracker",
      tagline: "Track natural rhythms, predict upcoming periods & fertile days effortlessly.",
      badge: "Fertility & Period Rhythm",
      badgeColor: "bg-pink-100 text-pink-700 border-pink-200",
      themeColor: "text-pink-600",
      accentBg: "bg-pink-50/70 border-pink-100",
      stepNumBg: "bg-pink-500 text-white",
      buttonColor: "bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:opacity-95 shadow-pink-500/20",
      steps: [
        {
          num: "1",
          title: "Select Last Period Date",
          desc: "Click the calendar and pick the first day your last period started (Day 1 of bleeding).",
          highlight: "Day 1 of your cycle",
        },
        {
          num: "2",
          title: "Enter Your Cycle Length",
          desc: "Count the number of days from the start of one period to the start of the next (typically 28 days, ranging 21–35).",
          highlight: "Standard is 28 days",
        },
        {
          num: "3",
          title: "Get Instant Smart Predictions",
          desc: "View your predicted next period date, ovulation day, and a 6-day fertile window to plan ahead with peace of mind.",
          highlight: "Period + Ovulation + Fertile window",
        },
      ],
      tip: "Every body is uniquely beautiful! Cycles can naturally fluctuate by 2–4 days due to stress, travel, or sleep patterns.",
    },
    pregnancy: {
      title: "Pregnancy Milestone & Due Date Calculator",
      tagline: "Explore baby size comparisons, developmental milestones, and clinical scan timelines.",
      badge: "40-Week Baby Journey",
      badgeColor: "bg-blue-100 text-blue-700 border-blue-200",
      themeColor: "text-blue-600",
      accentBg: "bg-blue-50/70 border-blue-100",
      stepNumBg: "bg-blue-500 text-white",
      buttonColor: "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:opacity-95 shadow-blue-500/20",
      steps: [
        {
          num: "1",
          title: "Select Start Date (LMP)",
          desc: "Choose the first day of your Last Menstrual Period (LMP) right before pregnancy.",
          highlight: "First day of last period",
        },
        {
          num: "2",
          title: "Confirm Cycle Length (Optional)",
          desc: "Defaults to 28 days. Adjust if your typical menstrual cycle was shorter or longer.",
          highlight: "Default 28 days",
        },
        {
          num: "3",
          title: "Follow Your 40-Week Journey",
          desc: "See your estimated due date, trimester progress, weekly fruit size (poppy seed to watermelon!), and medical scan schedule.",
          highlight: "Due date + Scans + Milestones",
        },
      ],
      tip: "Due dates are an estimated 40-week timeline (280 days). Full-term deliveries commonly occur anytime between 37 and 42 weeks!",
    },
    bmi: {
      title: "BMI (Body Mass Index) & Health Calculator",
      tagline: "Understand your body composition category and personalized wellness guidance.",
      badge: "Health & Weight Insights",
      badgeColor: "bg-emerald-100 text-emerald-700 border-emerald-200",
      themeColor: "text-emerald-600",
      accentBg: "bg-emerald-50/70 border-emerald-100",
      stepNumBg: "bg-emerald-500 text-white",
      buttonColor: "bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:opacity-95 shadow-emerald-500/20",
      steps: [
        {
          num: "1",
          title: "Enter Height in Centimeters",
          desc: "Stand straight without footwear against a flat wall to measure your accurate height (e.g., 165 cm).",
          highlight: "Measured in centimeters (cm)",
        },
        {
          num: "2",
          title: "Enter Weight in Kilograms",
          desc: "For best accuracy, weigh yourself in the morning before meals on an accurate digital scale (e.g., 62 kg).",
          highlight: "Measured in kilograms (kg)",
        },
        {
          num: "3",
          title: "Review Category & Guidance",
          desc: "Discover if your BMI is Underweight (<18.5), Normal (18.5–24.9), Overweight (25–29.9), or Obese (30+) with medical advice.",
          highlight: "Instant health category feedback",
        },
      ],
      tip: "BMI is a helpful general screening indicator. For comprehensive fertility & prenatal care, our clinical specialists provide individualized support.",
    },
  };

  const current = guideDetails[activeTab] || guideDetails.menstrual;

  const handleLaunch = () => {
    onClose();
    if (onOpenCalculator) {
      onOpenCalculator(activeTab);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-900 font-inter leading-none">
              How to Use Our Calculators
            </h3>
            <p className="text-xs text-gray-500 font-normal mt-0.5">
              Simple 3-step guide for fast, accurate health insights
            </p>
          </div>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Tab Selection */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 p-1 bg-gray-50 rounded-2xl border border-gray-100">
          {guideTabs.map((tab) => {
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer border ${
                  isSelected
                    ? tab.activeClass
                    : "border-transparent text-gray-600 hover:text-gray-900 hover:bg-white/60"
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Active Tab Banner */}
        <div className={`p-4 rounded-2xl border ${current.accentBg}`}>
          <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
            <h4 className="text-lg font-bold text-gray-900 font-inter">
              {current.title}
            </h4>
            <span
              className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${current.badgeColor}`}
            >
              {current.badge}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            {current.tagline}
          </p>
        </div>

        {/* 3 Step Guide Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          {current.steps.map((step) => (
            <div
              key={step.num}
              className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm flex flex-col justify-between hover:border-gray-300 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-extrabold ${current.stepNumBg}`}
                  >
                    {step.num}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                    Step {step.num}
                  </span>
                </div>
                <h5 className="text-sm font-bold text-gray-900 mb-1.5 font-inter">
                  {step.title}
                </h5>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>
              <div className="mt-3 pt-2.5 border-t border-gray-100">
                <span className="text-[11px] font-semibold text-gray-500 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                  <span className="truncate">{step.highlight}</span>
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Friendly Pro-Tip Alert */}
        <div className="bg-amber-50/80 border border-amber-200/70 rounded-2xl p-4 flex items-start gap-3 text-amber-900 text-xs sm:text-sm leading-relaxed">
          <div className="p-1.5 bg-amber-100 text-amber-700 rounded-lg flex-shrink-0 mt-0.5">
            <Lightbulb className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-amber-900 block mb-0.5">Friendly Doctor's Tip:</span>
            <span>{current.tip}</span>
          </div>
        </div>

        {/* Action Row & Privacy Note */}
        <div className="pt-2 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>100% Private & Safe. Your data is never shared.</span>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-gray-200 text-gray-700 text-xs font-semibold hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              type="button"
              onClick={handleLaunch}
              className={`w-full sm:w-auto px-5 py-2.5 rounded-xl font-bold text-xs shadow-md transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer transform active:scale-95 ${current.buttonColor}`}
            >
              <span>Try this calculator</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};


const MenstrualCalendar = ({ predictions }) => {
  const defaultMonth = predictions?.nextPeriodDate
    ? new Date(predictions.nextPeriodDate)
    : new Date();
  const [currentMonth, setCurrentMonth] = useState(
    new Date(defaultMonth.getFullYear(), defaultMonth.getMonth()),
  );
  const [showFullCalendar, setShowFullCalendar] = useState(true);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  const isSameDay = (day, dateObj) => {
    if (!dateObj) return false;
    const d = new Date(dateObj);
    return (
      d.getFullYear() === currentMonth.getFullYear() &&
      d.getMonth() === currentMonth.getMonth() &&
      d.getDate() === day
    );
  };

  const getDayType = (day) => {
    if (!day || !predictions) return null;

    // Check if this day matches any prediction date
    if (predictions.nextPeriodDate) {
      // Show period starting from nextPeriodDate, spanning cycleLength days
      const periodStart = new Date(predictions.nextPeriodDate);
      const periodEnd = new Date(periodStart);
      periodEnd.setDate(periodStart.getDate() + (predictions.cycleLength ? predictions.cycleLength - 1 : 4));

      const d = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      if (d >= periodStart && d <= periodEnd) {
        return "period";
      }
    }

    if (isSameDay(day, predictions.ovulationDate)) {
      return "ovulation";
    }

    if (predictions.fertileWindowStart && predictions.fertileWindowEnd) {
      const fertileStart = new Date(predictions.fertileWindowStart);
      const fertileEnd = new Date(predictions.fertileWindowEnd);
      const d = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      if (d >= fertileStart && d <= fertileEnd) {
        return "fertile";
      }
    }

    // Also check lastPeriodDate if it falls in the current month for period marking
    if (isSameDay(day, predictions.lastPeriodDate)) {
      return "period";
    }

    return null;
  };

  const getDayClasses = (day) => {
    const type = getDayType(day);
    const baseClasses =
      "aspect-square flex flex-col items-center justify-center rounded-lg text-sm relative";

    if (!type) return `${baseClasses} text-gray-900`;

    const typeClasses = {
      period: "bg-pink-200 text-gray-900",
      ovulation: "bg-green-400 text-white",
      fertile: "bg-green-200 text-gray-900",
    };

    return `${baseClasses} ${typeClasses[type]}`;
  };

  const days = getDaysInMonth(currentMonth);

  const previousMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1),
    );
  };

  const nextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1),
    );
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-semibold text-gray-900">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h4>
        <div className="flex items-center gap-2">
          <button
            onClick={previousMonth}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button onClick={nextMonth} className="p-1 hover:bg-gray-100 rounded">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3 mb-3 text-xs">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 bg-pink-200 rounded"></div>
          <span className="text-gray-600">Period</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 bg-green-400 rounded"></div>
          <span className="text-gray-600">Ovulation</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 bg-green-200 rounded"></div>
          <span className="text-gray-600">Fertile Window</span>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map((day) => (
          <div
            key={day}
            className="text-center text-xs font-medium text-gray-600 py-2"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => (
          <div key={index} className={day ? getDayClasses(day) : ""}>
            {day && (
              <>
                <span className="font-medium">{day}</span>
                {getDayType(day) === "ovulation" && (
                  <span className="text-[10px] absolute bottom-0.5">●</span>
                )}
              </>
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 flex gap-2">
        <Button
          variant="purple"
          fullWidth
          startIcon={<Share2 className="w-4 h-4" />}
        >
          Share
        </Button>
        <Button
          variant="outline"
          fullWidth
          onClick={() => setShowFullCalendar(!showFullCalendar)}
          startIcon={
            showFullCalendar ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )
          }
        >
          {showFullCalendar ? "Hide" : "Show"} Full Calendar
        </Button>
      </div>
    </div>
  );
};

const MenstrualTrackerModal = ({
  isOpen,
  onClose,
  formData: initialFormData,
}) => {
  const [loading, setLoading] = useState(false);
  const [predictions, setPredictions] = useState(null);
  const [localFormData, setLocalFormData] = useState(initialFormData);

  useEffect(() => {
    setLocalFormData(initialFormData);
  }, [initialFormData]);

  // 🔥 FETCH LATEST PREDICTION (GET API)
  useEffect(() => {
    if (!isOpen) return;

    const fetchLatestPrediction = async () => {
      try {
        const res = await api.get("/menstrual-cycle-tracker");
        setPredictions(res.data.data);
      } catch (err) {
        console.log("No previous cycle data");
      }
    };

    fetchLatestPrediction();
  }, [isOpen]);

  // POST (calculate)
  const handlePrediction = async () => {
    const cycle = Number(localFormData.cycleLength);
    if (!localFormData.lastPeriodDate || isNaN(cycle) || cycle <= 0) {
      toast.warning("Please enter a valid positive cycle length.");
      return;
    }

    try {
      setLoading(true);
      const res = await api.post("/menstrual-cycle-tracker", {
        lastPeriodDate: localFormData.lastPeriodDate,
        cycleLength: cycle,
      });
      setPredictions(res.data.data);
      toast.success("Cycle predicted successfully!");
    } catch (error) {
      toast.error("Failed to calculate cycle predictions.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Menstrual Cycle Tracker"
      scrollable={!!predictions}
    >
      <div className="space-y-4">
        {/* Inputs */}
        <div className="grid grid-cols-2 gap-3 items-end">
          <div className="w-full">
            <label className="block text-label font-medium text-gray-700 mb-1.5">
              Last Period Date
            </label>
            <PrimeCalendar
              value={
                localFormData.lastPeriodDate
                  ? new Date(localFormData.lastPeriodDate)
                  : null
              }
              onChange={(e) =>
                setLocalFormData({
                  ...localFormData,
                  lastPeriodDate: e.value
                    ? e.value.toISOString().split("T")[0]
                    : "",
                })
              }
              dateFormat="dd/mm/yy"
              placeholder="Select Date"
              className="w-full"
              inputClassName="w-full border border-gray-300 rounded-md px-4 py-2.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              maxDate={
                new Date(new Date().setFullYear(new Date().getFullYear() + 1))
              }
              minDate={
                new Date(new Date().setFullYear(new Date().getFullYear() - 1))
              }
            />
          </div>
          <FormInput
            label="Cycle Length (Days)"
            type="number"
            min="1"
            onKeyDown={handleNumberKeyDown}
            value={localFormData.cycleLength}
            onChange={(e) => {
              const val = e.target.value.replace(/[^0-9]/g, "");
              setLocalFormData({
                ...localFormData,
                cycleLength: val,
              });
            }}
          />
        </div>

        {/* Calculate Button */}
        <button
          onClick={handlePrediction}
          disabled={loading}
          className="w-full bg-pink-500 text-white py-2.5 rounded-lg"
        >
          {loading ? "Calculating..." : "Your Cycle Predictions"}
        </button>

        {/* 🔥 DISPLAY GET / POST DATA */}
        {predictions && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Card
                title="Next Period"
                icon={<LucideCalendar className="w-5 h-5 text-pink-500" />}
                background="pink-50"
              >
                <p className="text-lg font-semibold text-gray-900">
                  {new Date(predictions.nextPeriodDate).toLocaleDateString(
                    "en-GB",
                  )}
                </p>
              </Card>

              <Card
                title="Ovulation Day"
                icon={<LucideCalendar className="w-5 h-5 text-green-500" />}
                background="green-50"
              >
                <p className="text-lg font-semibold text-gray-900">
                  {new Date(predictions.ovulationDate).toLocaleDateString(
                    "en-GB",
                  )}
                </p>
              </Card>

              <Card
                title="Fertile Window"
                icon={<Heart className="w-5 h-5 text-green-500" />}
                background="green-50"
              >
                <p className="text-sm font-semibold text-gray-900">
                  {new Date(predictions.fertileWindowStart).toLocaleDateString(
                    "en-GB",
                  )}
                  <br />
                  to{" "}
                  {new Date(predictions.fertileWindowEnd).toLocaleDateString(
                    "en-GB",
                  )}
                </p>
              </Card>
            </div>

            <MenstrualCalendar predictions={predictions} />
          </>
        )}
      </div>
    </Modal>
  );
};

const PregnancyCalendar = ({
  currentWeek,
  lmpDate,
  selectedWeek,
  onWeekClick,
}) => {
  const trimesters = [
    {
      name: "1st",
      weeks: [1, 13],
      color: "bg-pink-100",
      textColor: "text-pink-700",
    },
    {
      name: "2nd",
      weeks: [14, 27],
      color: "bg-blue-100",
      textColor: "text-blue-700",
    },
    {
      name: "3rd",
      weeks: [28, 40],
      color: "bg-purple-100",
      textColor: "text-purple-700",
    },
  ];

  const scans = {
    8: "Viability Scan",
    12: "NT / NB Scan",
    13: "Double Marker Test",
    20: "Anomaly Scan (TIFFA)",
    24: "Glucose Tolerance Test",
    28: "Growth Scan",
    32: "Growth Scan & Doppler",
    36: "Position & Growth Scan",
    38: "Pre-delivery Assessment",
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-nunito font-extrabold text-lg flex items-center gap-2">
          <LucideCalendar className="w-5 h-5 text-primary" />
          40-Week Calendar
        </h4>
        <div className="flex gap-2">
          {trimesters.map((t) => (
            <div key={t.name} className="flex items-center gap-1">
              <div className={`w-3 h-3 ${t.color} rounded-sm`}></div>
              <span className="text-[10px] text-gray-500 font-bold">
                {t.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-8 gap-1.5 sm:gap-2">
        {Array.from({ length: 40 }, (_, i) => {
          const week = i + 1;
          const isCurrent = week === currentWeek;
          const isSelected = week === selectedWeek;
          const hasScan = scans[week];
          let bgColor =
            "bg-gray-50 text-gray-400 hover:bg-gray-100 cursor-pointer";
          let borderColor = "border-transparent";

          if (week <= currentWeek) {
            const tri = trimesters.find(
              (t) => week >= t.weeks[0] && week <= t.weeks[1],
            );
            bgColor = tri
              ? tri.color +
                " " +
                tri.textColor +
                " hover:opacity-80 cursor-pointer"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300 cursor-pointer";
          }

          if (isCurrent && !isSelected)
            borderColor = "border-primary ring-2 ring-primary/20";
          if (hasScan && !isSelected)
            borderColor = "border-amber-400 ring-2 ring-amber-400/20";

          if (isSelected) {
            borderColor =
              "border-primary ring-4 ring-primary/50 shadow-md transform scale-110 z-10";
          }

          return (
            <div
              key={week}
              onClick={() => onWeekClick && onWeekClick(week)}
              className={`
                aspect-square flex flex-col items-center justify-center rounded-lg text-[10px] font-bold border-2 transition-all relative
                ${bgColor} ${borderColor}
              `}
              title={hasScan ? `Week ${week}: ${hasScan}` : `Week ${week}`}
            >
              {week}
              {hasScan && (
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-amber-500 rounded-full border border-white"></div>
              )}
              {isCurrent && (
                <div className="absolute -bottom-1 w-1 h-1 bg-primary rounded-full"></div>
              )}
            </div>
          );
        })}
      </div>

      {/* SCAN UPDATES LIST */}
      <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
        <h5 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-3 flex items-center gap-2">
          <ClipboardList className="w-3.5 h-3.5 text-amber-500" />
          Upcoming Scans & Tests
        </h5>
        <div className="space-y-2.5">
          {Object.entries(scans).map(([week, name]) => {
            const isPast = Number(week) < currentWeek;
            const isDue = Number(week) === currentWeek;

            return (
              <div
                key={week}
                className={`flex items-center justify-between py-2 border-b border-gray-50 last:border-0 ${isPast ? "opacity-50" : ""}`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-2 h-2 rounded-full ${isDue ? "bg-amber-500 animate-pulse" : "bg-gray-300"}`}
                  ></div>
                  <div className="flex flex-col">
                    <span
                      className={`text-sm ${isDue ? "font-bold text-gray-900" : "text-gray-600"}`}
                    >
                      Week {week}: {name}
                    </span>
                    {lmpDate && !isNaN(new Date(lmpDate).getTime()) && (
                      <span className="text-[10px] text-gray-400 font-medium">
                        Expected:{" "}
                        {new Date(
                          new Date(lmpDate).getTime() +
                            Number(week) * 7 * 24 * 60 * 60 * 1000,
                        ).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    )}
                  </div>
                </div>
                {isPast ? (
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                ) : (
                  <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded uppercase">
                    {isDue ? "Due Now" : "Pending"}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// 🍓 Weekly fruit size map – emoji + label for all 40 weeks
const weeklyFruitMap = {
  1: { emoji: "🌱", label: "Poppy Seed" },
  2: { emoji: "🌱", label: "Sesame Seed" },
  3: { emoji: "🌿", label: "Vanilla Bean Seed" },
  4: { emoji: "🟤", label: "Lentil" },
  5: { emoji: "🍏", label: "Apple Seed" },
  6: { emoji: "🫛", label: "Sweet Pea" },
  7: { emoji: "🫐", label: "Blueberry" },
  8: { emoji: "🫑", label: "Kidney Bean" },
  9: { emoji: "🍇", label: "Grape" },
  10: { emoji: "🫒", label: "Olive" },
  11: { emoji: "🍋", label: "Lime" },
  12: { emoji: "🍋", label: "Lime" },
  13: { emoji: "🍊", label: "Lemon" },
  14: { emoji: "🍊", label: "Navel Orange" },
  15: { emoji: "🍎", label: "Apple" },
  16: { emoji: "🥑", label: "Avocado" },
  17: { emoji: "🌰", label: "Turnip" },
  18: { emoji: "🥦", label: "Bell Pepper" },
  19: { emoji: "🥭", label: "Mango" },
  20: { emoji: "🍌", label: "Banana" },
  21: { emoji: "🥕", label: "Carrot" },
  22: { emoji: "🍆", label: "Eggplant" },
  23: { emoji: "🥥", label: "Coconut" },
  24: { emoji: "🌽", label: "Corn" },
  25: { emoji: "🥦", label: "Cauliflower" },
  26: { emoji: "🥜", label: "Butternut Squash" },
  27: { emoji: "🥬", label: "Iceberg Lettuce" },
  28: { emoji: "🍆", label: "Eggplant" },
  29: { emoji: "🎃", label: "Butternut Squash" },
  30: { emoji: "🥦", label: "Cabbage" },
  31: { emoji: "🥥", label: "Coconut" },
  32: { emoji: "🎃", label: "Jicama" },
  33: { emoji: "🍍", label: "Pineapple" },
  34: { emoji: "🍍", label: "Cantaloupe" },
  35: { emoji: "🍈", label: "Honeydew Melon" },
  36: { emoji: "🥬", label: "Romaine Lettuce Head" },
  37: { emoji: "🌿", label: "Swiss Chard Bunch" },
  38: { emoji: "🎃", label: "Pumpkin" },
  39: { emoji: "🍉", label: "Watermelon" },
  40: { emoji: "🍉", label: "Watermelon" },
};

const PregnancyCalculatorModal = ({
  isOpen,
  onClose,
  formData: initialFormData,
}) => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [formData, setLocalFormData] = useState(initialFormData);
  const [selectedWeekTracker, setSelectedWeekTracker] = useState(null);

  const handleSaveProgress = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      window.location.href = "/login";
      return;
    }
    if (formData.lastPeriodDate) {
      localStorage.setItem(
        `pregnancy_progress_${user?.id || "guest"}`,
        JSON.stringify({
          lastPeriodDate: formData.lastPeriodDate,
          cycleLength: formData.cycleLength,
          savedWeek: selectedWeekTracker,
        }),
      );
      toast.success("Pregnancy progress saved successfully!");
    }
  };

  useEffect(() => {
    setLocalFormData(initialFormData);
  }, [initialFormData]);

  useEffect(() => {
    if (result) {
      setSelectedWeekTracker(result.pregnancyWeek);
    }
  }, [result]);

  // Handle local storage autoload
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && isOpen && !formData.lastPeriodDate) {
      const saved = localStorage.getItem(`pregnancy_progress_${user.id}`);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setLocalFormData({
            lastPeriodDate: parsed.lastPeriodDate,
            cycleLength: parsed.cycleLength || 28,
          });
          // Also trigger calculation automatically? Wait, better to let them click Calculate to feel safe, or we auto calculate.
        } catch (e) {}
      }
    }
  }, [isOpen]);

  const fetchCalculatedData = async (lmp, cycle) => {
    try {
      setLoading(true);
      const res = await api.post("/pregnancy", {
        lastMenstrualPeriod: lmp,
        cycleLength: Number(cycle) || 28,
      });
      setResult(res.data.data);
      toast.success("Pregnancy estimated successfully!");
    } catch (error) {
      toast.error("Failed to calculate pregnancy milestones.");
    } finally {
      setLoading(false);
    }
  };

  const handleCalculate = () => {
    const cycle = Number(formData.cycleLength || 28);
    if (isNaN(cycle) || cycle <= 0) {
      toast.warning("Cycle length must be a positive number.");
      return;
    }
    fetchCalculatedData(formData.lastPeriodDate, cycle);
  };

  const handleClear = () => {
    setLocalFormData({ lastPeriodDate: "", cycleLength: "28" });
    setResult(null);
    setSelectedWeekTracker(null);
  };

  const currentViewWeek = selectedWeekTracker || result?.pregnancyWeek;
  const growthItem =
    result?.allGrowthData?.find((d) => d.week === currentViewWeek) ||
    result?.growth;

  const getTrimesterColor = (week) => {
    if (week <= 13) return "bg-pink-100 text-pink-700 border-pink-200";
    if (week <= 27) return "bg-orange-100 text-orange-700 border-orange-200";
    return "bg-purple-100 text-purple-700 border-purple-200";
  };

  const getTrimesterBgClass = (week) => {
    if (week <= 13) return "bg-pink-400";
    if (week <= 27) return "bg-orange-400";
    return "bg-purple-400";
  };

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex justify-between items-center w-full">
          <span>Pregnancy Assistant</span>
          {result && (
            <div className="flex gap-2">
              <Button
                onClick={handleSaveProgress}
                variant="outline"
                size="sm"
                className="text-xs"
              >
                Save Progress
              </Button>
              <Button
                onClick={handleClear}
                variant="outline"
                size="sm"
                className="text-xs text-red-500 border-red-200 hover:bg-red-50"
              >
                Clear
              </Button>
            </div>
          )}
        </div>
      }
    >
      <div className="space-y-6">
        {/* INPUT FORM (Hidden if result is showing) */}
        {!result && (
          <div className="bg-gray-50 rounded-xl p-5 border border-gray-100 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Start Date (LMP) *
                </label>
                <PrimeCalendar
                  value={
                    formData.lastPeriodDate
                      ? new Date(formData.lastPeriodDate)
                      : null
                  }
                  onChange={(e) =>
                    setLocalFormData({
                      ...formData,
                      lastPeriodDate: e.value
                        ? e.value.toISOString().split("T")[0]
                        : "",
                    })
                  }
                  dateFormat="dd/mm/yy"
                  placeholder="Select Date"
                  className="w-full"
                  inputClassName="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  maxDate={
                    new Date(
                      new Date().setFullYear(new Date().getFullYear() + 1),
                    )
                  }
                  minDate={
                    new Date(
                      new Date().setFullYear(new Date().getFullYear() - 1),
                    )
                  }
                />
              </div>
              <FormInput
                type="number"
                label="Cycle Length (Days)"
                min="1"
                onKeyDown={handleNumberKeyDown}
                value={formData.cycleLength || "28"}
                onChange={(e) => {
                  const val = e.target.value.replace(/[^0-9]/g, "");
                  setLocalFormData({ ...formData, cycleLength: val });
                }}
              />
            </div>
            <Button
              variant="purple"
              fullWidth
              onClick={handleCalculate}
              disabled={loading || !formData.lastPeriodDate}
              className="mt-2"
            >
              {loading ? "Calculating..." : "Calculate My Pregnancy"}
            </Button>
          </div>
        )}

        {/* RESULTS OVERVIEW */}
        {result && (
          <div className="space-y-6">
            {/* Top Dashboard Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Dates */}
              <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm col-span-1 md:col-span-2 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                    Start Date (LMP)
                  </p>
                  <p className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <LucideCalendar className="w-4 h-4 text-primary" />
                    {new Date(formData.lastPeriodDate).toLocaleDateString(
                      "en-GB",
                      { day: "numeric", month: "short", year: "numeric" },
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                    Estimated Due Date
                  </p>
                  <p className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <Baby className="w-4 h-4 text-green-500" />
                    {new Date(result.expectedDeliveryDate).toLocaleDateString(
                      "en-GB",
                      { day: "numeric", month: "short", year: "numeric" },
                    )}
                  </p>
                </div>
              </div>

              {/* Milestones / Days */}
              <div
                className={`rounded-2xl p-4 border shadow-sm flex flex-col justify-center items-center text-center ${getTrimesterColor(result.pregnancyWeek)}`}
              >
                <p className="text-sm font-bold opacity-80 uppercase mb-1">
                  {result.trimester}
                </p>
                <div className="flex gap-4">
                  <div>
                    <p className="text-2xl font-extrabold">
                      {result.pregnancyWeek * 7}
                    </p>
                    <p className="text-[10px] font-semibold uppercase">
                      Days Done
                    </p>
                  </div>
                  <div className="w-px h-full bg-current opacity-20"></div>
                  <div>
                    <p className="text-2xl font-extrabold">
                      {280 - result.pregnancyWeek * 7}
                    </p>
                    <p className="text-[10px] font-semibold uppercase">
                      Days Left
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
              <div className="flex justify-between items-end mb-2">
                <span className="text-xs font-bold text-gray-500">Week 0</span>
                <span className="text-sm font-bold text-gray-900">
                  Current: Week {result.pregnancyWeek}
                </span>
                <span className="text-xs font-bold text-gray-500">Week 40</span>
              </div>
              <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden relative flex">
                {/* Visual block for each week for precision if needed, or simple percentage */}
                <div
                  className={`h-full ${getTrimesterBgClass(result.pregnancyWeek)} transition-all duration-1000`}
                  style={{ width: `${(result.pregnancyWeek / 40) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Growth Details Journey Explorer */}
            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
              <div className="bg-gray-50 px-5 py-3 border-b border-gray-100 flex justify-between items-center">
                <button
                  onClick={() =>
                    setSelectedWeekTracker(Math.max(1, currentViewWeek - 1))
                  }
                  disabled={currentViewWeek <= 1}
                  className="p-1.5 hover:bg-white rounded-lg border border-transparent hover:border-gray-200 transition-colors disabled:opacity-30"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="text-center">
                  <h4 className="font-bold text-gray-900 text-lg">
                    Exploring Week {currentViewWeek}
                  </h4>
                  <p className="text-xs text-primary font-medium">
                    {currentViewWeek === result.pregnancyWeek
                      ? "(Your Current Week)"
                      : ""}
                  </p>
                </div>
                <button
                  onClick={() =>
                    setSelectedWeekTracker(Math.min(40, currentViewWeek + 1))
                  }
                  disabled={currentViewWeek >= 40}
                  className="p-1.5 hover:bg-white rounded-lg border border-transparent hover:border-gray-200 transition-colors disabled:opacity-30"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Visual Growth */}
                <div className="flex flex-col items-center justify-center text-center p-4 bg-gradient-to-b from-blue-50/50 to-white rounded-xl border border-blue-50/50">
                  {/* Fruit visual: show emoji if API image fails or is missing */}
                  {growthItem?.image ? (
                    <img
                      src={growthItem.image}
                      className="w-32 h-32 object-contain hover:scale-110 transition-transform duration-500 rounded-full bg-white p-2 shadow-sm mb-4"
                      alt={growthItem?.fruit || "Growth stage"}
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.nextSibling.style.display = "flex";
                      }}
                    />
                  ) : null}
                  {/* Emoji fallback – always rendered, hidden only when API image loads successfully */}
                  <div
                    style={{ display: growthItem?.image ? "none" : "flex" }}
                    className="w-32 h-32 hover:scale-110 transition-transform duration-500 rounded-full bg-white shadow-sm mb-4 items-center justify-center text-7xl"
                  >
                    {weeklyFruitMap[currentViewWeek]?.emoji || "🌱"}
                  </div>
                  <p className="font-bold text-gray-900 text-lg mb-1">
                    Baby is the size of a{" "}
                    <span className="text-primary">
                      {growthItem?.fruit ||
                        weeklyFruitMap[currentViewWeek]?.label ||
                        "Seed"}
                    </span>
                  </p>
                  <div className="flex gap-4 text-sm text-gray-500 font-medium">
                    <span className="bg-gray-100 px-3 py-1 rounded-full">
                      {growthItem?.weight || "-"}
                    </span>
                    <span className="bg-gray-100 px-3 py-1 rounded-full">
                      {growthItem?.length || "-"} cm
                    </span>
                  </div>
                </div>

                {/* Development Insights */}
                <div className="space-y-4">
                  <h5 className="font-bold text-gray-900 border-b border-gray-100 pb-2">
                    Weekly Development
                  </h5>

                  <div className="flex items-start gap-3">
                    <div className="bg-red-50 p-1.5 rounded-md flex-shrink-0">
                      <Heart className="w-4 h-4 text-red-500" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-500 uppercase">
                        Heartbeat & Circulatory
                      </p>
                      <p className="text-sm font-medium text-gray-800">
                        {growthItem?.heartbeat || "Development ongoing"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-orange-50 p-1.5 rounded-md flex-shrink-0">
                      <Activity className="w-4 h-4 text-orange-500" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-500 uppercase">
                        Limb Development
                      </p>
                      <p className="text-sm font-medium text-gray-800">
                        {growthItem?.limb || "Development ongoing"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-purple-50 p-1.5 rounded-md flex-shrink-0">
                      <Stethoscope className="w-4 h-4 text-purple-500" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-500 uppercase">
                        Organ Highlights
                      </p>
                      <p className="text-sm font-medium text-gray-800">
                        {growthItem?.organ || "Development ongoing"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Image Banner linking to Consultation */}
            <div
              className="mt-6 rounded-2xl overflow-hidden shadow-sm relative group cursor-pointer"
              onClick={() => (window.location.href = "/appointment")}
            >
              <img
                src="https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=1200&h=300&fit=crop"
                alt="Book Consultation Banner"
                className="w-full h-32 object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-blue-900/50 flex flex-col justify-center px-8">
                <h3 className="text-white font-bold text-xl mb-1">
                  Expert Care For You & Your Baby
                </h3>
                <p className="text-purple-100 text-sm mb-3 max-w-md">
                  Schedule a personalized consultation with our leading
                  obstetricians.
                </p>
                <div>
                  <span className="inline-block bg-white text-purple-700 font-bold text-xs uppercase tracking-wider py-1.5 px-4 rounded-full shadow-lg">
                    Book Consultation &rarr;
                  </span>
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <p className="text-[10px] text-center text-gray-400 mt-6 max-w-xl mx-auto">
              This calculator provides estimates only based on standard 28-day
              cycles. True gestational age and dates may vary. Always consult a
              healthcare provider for professional medical advice, diagnosis, or
              treatment.
            </p>
          </div>
        )}
      </div>
    </Modal>
  );
};

const calculateBMI = (heightCm, weightKg) => {
  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);

  let category = "";
  let message = "";

  if (bmi < 18.5) {
    category = "Underweight";
    message =
      "Your BMI is below the healthy range. You may benefit from a nutritious diet and professional guidance.";
  } else if (bmi < 25) {
    category = "Normal";
    message =
      "Your BMI falls within the healthy range. Maintain your lifestyle with balanced nutrition and regular activity.";
  } else if (bmi < 30) {
    category = "Overweight";
    message =
      "Your BMI is slightly above the healthy range. Small lifestyle changes can improve overall health.";
  } else {
    category = "Obese";
    message =
      "Your BMI is significantly above the healthy range. Medical guidance can help support long-term well-being.";
  }

  return {
    bmi: bmi.toFixed(1),
    category,
    message,
  };
};

const BMICalculatorModal = ({ isOpen, onClose, formData: initialFormData }) => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [localFormData, setLocalFormData] = useState(initialFormData);

  useEffect(() => {
    setLocalFormData(initialFormData);
  }, [initialFormData]);

  // 🔹 GET latest BMI when modal opens
  useEffect(() => {
    if (!isOpen) return;

    const fetchLatestBMI = async () => {
      try {
        const res = await api.get("/bmi");
        setResult(res.data.data);
      } catch (err) {
        console.log("No previous BMI data");
      }
    };

    fetchLatestBMI();
  }, [isOpen]);

  // 🔹 POST calculate BMI
  const handleCalculate = async () => {
    const h = Number(localFormData.height);
    const w = Number(localFormData.weight);
    if (!h || !w || isNaN(h) || isNaN(w) || h <= 0 || w <= 0) {
      toast.warning("Please enter valid positive numbers for height and weight.");
      return;
    }

    try {
      setLoading(true);
      const res = await api.post("/bmi", {
        height: h,
        weight: w,
      });

      setResult(res.data.data);
      toast.success("BMI calculated successfully!");
    } catch (error) {
      toast.error("Failed to calculate BMI");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="BMI Calculator">
      <div className="space-y-4">
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-3">
            <FormInput
              label="Height (cm)"
              type="number"
              min="1"
              onKeyDown={handleNumberKeyDown}
              value={localFormData.height}
              onChange={(e) => {
                const val = e.target.value.replace(/[^0-9.]/g, "");
                setLocalFormData({ ...localFormData, height: val });
              }}
            />
            <FormInput
              label="Weight (kg)"
              type="number"
              min="1"
              onKeyDown={handleNumberKeyDown}
              value={localFormData.weight}
              onChange={(e) => {
                const val = e.target.value.replace(/[^0-9.]/g, "");
                setLocalFormData({ ...localFormData, weight: val });
              }}
            />
          </div>

          <Button
            variant="outline"
            fullWidth
            onClick={handleCalculate}
            disabled={loading}
            className="border-primary text-primary hover:bg-primary/5"
          >
            {loading ? "Calculating..." : "Update BMI Results"}
          </Button>

          {/* RESULT */}
          {result && (
            <>
              {/* INFO CARDS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Card title="Your BMI">
                  <p className="text-2xl font-bold text-gray-900">
                    {result.bmi}
                  </p>
                </Card>

                <Card title="Category">
                  <p className="text-lg font-semibold text-green-600">
                    {result.category}
                  </p>
                </Card>
              </div>

              {/* HEALTH INFO */}
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
                <p className="text-sm text-gray-700">{result.message}</p>
              </div>

              {/* ACTION */}
              <Button variant="purple" fullWidth>
                Book Consultation
              </Button>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
};

const HealthCalculator = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeCalculator, setActiveCalculator] = useState(null);
  const [calculatorData, setCalculatorData] = useState({});

  const calculators = [
    {
      id: "menstrual",
      title: "Menstrual Cycle Tracker",
      subtitle: "Smart period tracking to help you stay prepared every month.",
      icon: <LucideCalendar className="w-6 h-6 text-pink-500" />,
      bgColor: "bg-pink-50",
      fields: [
        {
          name: "lastPeriodDate",
          label: "Last Period Date",
          type: "calendar",
          placeholder: "Select Date",
          required: true,
        },
        {
          name: "cycleLength",
          label: "Cycle Length (Days)",
          type: "number",
          placeholder: "Enter cycle length (e.g. 28)",
          required: true,
          extraProps: { min: "1", onKeyDown: handleNumberKeyDown }
        },
      ],
    },
    {
      id: "pregnancy",
      title: "Pregnancy Assistant",
      subtitle: "Calculate due date and pregnancy milestones",
      icon: <Baby className="w-6 h-6 text-blue-500" />,
      bgColor: "bg-blue-50",
      fields: [
        {
          name: "lastPeriodDate", // Changed from lastMenstrual
          label: "Start Date (LMP)",
          type: "calendar", // Changed to 'calendar'
          placeholder: "Select Date",
          required: true,
        },
        {
          name: "cycleLength",
          label: "Cycle Length (Days)",
          type: "number",
          placeholder: "28",
          extraProps: { min: "1", onKeyDown: handleNumberKeyDown }
        },
      ],
    },
    {
      id: "bmi",
      title: "BMI Calculator",
      subtitle: "Calculate your Body Mass Index and health status",
      icon: <Activity className="w-6 h-6 text-green-500" />,
      bgColor: "bg-green-50",
      fields: [
        {
          name: "height",
          label: "Height (cm)",
          type: "number",
          placeholder: "Enter height",
          required: true,
          extraProps: { min: "1", onKeyDown: handleNumberKeyDown }
        },
        {
          name: "weight",
          label: "Weight (kg)",
          type: "number",
          placeholder: "Enter weight",
          required: true,
          extraProps: { min: "1", onKeyDown: handleNumberKeyDown }
        },
      ],
    },
  ];

  const [guideModalOpen, setGuideModalOpen] = useState(false);
  const [guideTab, setGuideTab] = useState("menstrual");

  const handleOpenGuide = (tab = "menstrual") => {
    setGuideTab(tab);
    setGuideModalOpen(true);
  };

  const handleCalculate = (calculatorId, formData = {}) => {
    setActiveCalculator(calculatorId);
    setCalculatorData(formData);
    setModalOpen(true);
  };

  return (
    <div className="h-auto py-8 px-4 sm:px-6 lg:px-8 pb-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className=" sm:text-4xl  text-black mb-2 title">
            Advanced Health <span className="text-gold">Calculators</span>
          </h1>
          <p className="sub-title sm:text-base text-gray-600 mb-2">
            Get instant, professional-grade insights into your health with our
            comprehensive calculators
          </p>

          {/* Friendly Guide Trigger Button */}
          <div className="flex justify-center items-center gap-3 my-3">
            <button
              type="button"
              onClick={() => handleOpenGuide("menstrual")}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-50 via-pink-50 to-purple-50 hover:from-purple-100 hover:to-pink-100 border border-purple-200 text-[#6B3FA0] font-bold text-xs sm:text-sm shadow-sm transition-all duration-200 hover:shadow hover:scale-[1.02] cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-purple-600 animate-pulse" />
              <span>How to Use These Calculators</span>
              <span className="bg-purple-200/80 text-purple-900 text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
                Quick Guide
              </span>
            </button>
          </div>

          <p className="text-xs text-gray-500 flex items-center justify-center gap-1 mt-2">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
            Your data stays within you (not saved)
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          {calculators.map((calc) => (
            <CalculatorCard
              key={calc.id}
              title={calc.title}
              subtitle={calc.subtitle}
              icon={calc.icon}
              bgColor={calc.bgColor}
              fields={calc.fields}
              calculatorId={calc.id}
              onCalculate={handleCalculate}
              onOpenGuide={handleOpenGuide}
            />
          ))}
        </div>
      </div>

      <HowToUseModal
        isOpen={guideModalOpen}
        onClose={() => setGuideModalOpen(false)}
        initialTab={guideTab}
        onOpenCalculator={(id) => handleCalculate(id, {})}
      />

      <MenstrualTrackerModal
        isOpen={modalOpen && activeCalculator === "menstrual"}
        onClose={() => setModalOpen(false)}
        formData={calculatorData}
      />

      <PregnancyCalculatorModal
        isOpen={modalOpen && activeCalculator === "pregnancy"}
        onClose={() => setModalOpen(false)}
        formData={calculatorData}
      />

      <BMICalculatorModal
        isOpen={modalOpen && activeCalculator === "bmi"}
        onClose={() => setModalOpen(false)}
        formData={calculatorData}
      />
    </div>
  );
};

export default HealthCalculator;
