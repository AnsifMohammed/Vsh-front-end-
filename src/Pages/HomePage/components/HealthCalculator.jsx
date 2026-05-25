
import React, { useState, useEffect } from 'react';
import { Calendar as LucideCalendar, Heart, Activity, Baby, X, ChevronLeft, ChevronRight, Share2, EyeOff, Eye, ClipboardList, CheckCircle2, Clock, Stethoscope } from 'lucide-react';
import { Calendar as PrimeCalendar } from 'primereact/calendar';
import Card from '../../../Components/Common/Card';
import FormInput from '../../../Components/Common/FormInput';
import Button from '../../../Components/Common/Button';
import api from "../../../api/api";
import babyImagepic from "../../../assets/OIP.webp"
const Modal = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm" style={{ paddingTop: '90px' }}>
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
        <div className="p-5">
          {children}
        </div>
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
  onCalculate
}) => {
  const [formData, setFormData] = useState({});

  const handleInputChange = (fieldName, value) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };

  const handleCalculate = () => {
    onCalculate(calculatorId, formData);
  };

  return (
    <div className={`${bgColor} rounded-2xl p-5 shadow-sm border border-gray-200`}>
      <div className="flex items-start gap-3 mb-4">
        <div className="flex-shrink-0 p-2 bg-white rounded-lg shadow-sm">
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="card-title text-black mb-0.5">
            {title}
          </h3>
          <p className="card-sub-title text-gray-600">
            {subtitle}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 mb-4">
        {fields.map((field) => (
          field.type === 'calendar' ? (
            <div key={field.name} className="w-full">
              <label className="block text-label font-medium text-gray-700 mb-1.5">{field.label}</label>
              <PrimeCalendar
                value={formData[field.name] ? new Date(formData[field.name]) : null}
                onChange={(e) => handleInputChange(field.name, e.value ? e.value.toISOString().split('T')[0] : '')}
                dateFormat="dd/mm/yy"
                placeholder={field.placeholder}
                className="w-full"
                inputClassName="w-full border border-gray-300 rounded-md px-4 py-2.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                maxDate={new Date(new Date().setFullYear(new Date().getFullYear() + 1))}
                minDate={new Date(new Date().setFullYear(new Date().getFullYear() - 1))}
              />
            </div>
          ) : (
            <FormInput
              key={field.name}
              type={field.type}
              label={field.label}
              placeholder={field.placeholder}
              required={field.required}
              value={formData[field.name] || ''}
              onChange={(e) => handleInputChange(field.name, e.target.value)}
              {...field.extraProps}
            />
          )
        ))}
      </div>

      <div className="grid grid-cols-1 gap-3">
        <Button
          variant="outline"
          fullWidth
          onClick={handleCalculate}
          startIcon={
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          }
        >
          <span className="truncate">Calculate</span>
        </Button>
      </div>
    </div>
  );
};

const MenstrualCalendar = ({ predictions }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 8)); // September 2025
  const [showFullCalendar, setShowFullCalendar] = useState(true);

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

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

  const getDayType = (day) => {
    if (!day) return null;

    // Period days (example: 1-5, 26-30)
    if ((day >= 1 && day <= 5) || (day >= 26 && day <= 30)) {
      return 'period';
    }
    // Ovulation day (example: 12)
    if (day === 12) {
      return 'ovulation';
    }
    // Fertile window (example: 10-16)
    if (day >= 10 && day <= 16) {
      return 'fertile';
    }
    return null;
  };

  const getDayClasses = (day) => {
    const type = getDayType(day);
    const baseClasses = 'aspect-square flex flex-col items-center justify-center rounded-lg text-sm relative';

    if (!type) return `${baseClasses} text-gray-900`;

    const typeClasses = {
      period: 'bg-pink-200 text-gray-900',
      ovulation: 'bg-green-400 text-white',
      fertile: 'bg-green-200 text-gray-900',
    };

    return `${baseClasses} ${typeClasses[type]}`;
  };

  const days = getDaysInMonth(currentMonth);

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-semibold text-gray-900">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h4>
        <div className="flex items-center gap-2">
          <button onClick={previousMonth} className="p-1 hover:bg-gray-100 rounded">
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
        {dayNames.map(day => (
          <div key={day} className="text-center text-xs font-medium text-gray-600 py-2">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => (
          <div key={index} className={day ? getDayClasses(day) : ''}>
            {day && (
              <>
                <span className="font-medium">{day}</span>
                {getDayType(day) === 'ovulation' && (
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
          startIcon={showFullCalendar ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        >
          {showFullCalendar ? 'Hide' : 'Show'} Full Calendar
        </Button>
      </div>
    </div>
  );
};


const MenstrualTrackerModal = ({ isOpen, onClose, formData: initialFormData }) => {
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
    try {
      setLoading(true);
      const res = await api.post("/menstrual-cycle-tracker", {
        lastPeriodDate: localFormData.lastPeriodDate,
        cycleLength: Number(localFormData.cycleLength),
      });
      setPredictions(res.data.data);
    } catch (error) {
      alert("Failed to calculate cycle");
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
            <label className="block text-label font-medium text-gray-700 mb-1.5">Last Period Date</label>
            <PrimeCalendar
              value={localFormData.lastPeriodDate ? new Date(localFormData.lastPeriodDate) : null}
              onChange={(e) => setLocalFormData({ ...localFormData, lastPeriodDate: e.value ? e.value.toISOString().split('T')[0] : '' })}
              dateFormat="dd/mm/yy"
              placeholder="Select Date"
              className="w-full"
              inputClassName="w-full border border-gray-300 rounded-md px-4 py-2.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              maxDate={new Date(new Date().setFullYear(new Date().getFullYear() + 1))}
              minDate={new Date(new Date().setFullYear(new Date().getFullYear() - 1))}
            />
          </div>
          <FormInput
            label="Cycle Length (Days)"
            type="number"
            value={localFormData.cycleLength}
            onChange={(e) => setLocalFormData({ ...localFormData, cycleLength: e.target.value })}
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
                  {new Date(predictions.nextPeriodDate).toLocaleDateString("en-GB")}
                </p>
              </Card>

              <Card
                title="Ovulation Day"
                icon={<LucideCalendar className="w-5 h-5 text-green-500" />}
                background="green-50"
              >
                <p className="text-lg font-semibold text-gray-900">
                  {new Date(predictions.ovulationDate).toLocaleDateString("en-GB")}
                </p>
              </Card>

              <Card
                title="Fertile Window"
                icon={<Heart className="w-5 h-5 text-green-500" />}
                background="green-50"
              >
                <p className="text-sm font-semibold text-gray-900">
                  {new Date(predictions.fertileWindowStart).toLocaleDateString("en-GB")}
                  <br />
                  to {new Date(predictions.fertileWindowEnd).toLocaleDateString("en-GB")}
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


const PregnancyCalendar = ({ currentWeek, lmpDate, selectedWeek, onWeekClick }) => {
  const trimesters = [
    { name: "1st", weeks: [1, 13], color: "bg-pink-100", textColor: "text-pink-700" },
    { name: "2nd", weeks: [14, 27], color: "bg-blue-100", textColor: "text-blue-700" },
    { name: "3rd", weeks: [28, 40], color: "bg-purple-100", textColor: "text-purple-700" }
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
    38: "Pre-delivery Assessment"
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-nunito font-extrabold text-lg flex items-center gap-2">
          <LucideCalendar className="w-5 h-5 text-primary" />
          40-Week Calendar
        </h4>
        <div className="flex gap-2">
          {trimesters.map(t => (
            <div key={t.name} className="flex items-center gap-1">
              <div className={`w-3 h-3 ${t.color} rounded-sm`}></div>
              <span className="text-[10px] text-gray-500 font-bold">{t.name}</span>
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
          let bgColor = "bg-gray-50 text-gray-400 hover:bg-gray-100 cursor-pointer";
          let borderColor = "border-transparent";

          if (week <= currentWeek) {
            const tri = trimesters.find(t => week >= t.weeks[0] && week <= t.weeks[1]);
            bgColor = tri ? tri.color + " " + tri.textColor + " hover:opacity-80 cursor-pointer" : "bg-gray-200 text-gray-700 hover:bg-gray-300 cursor-pointer";
          }

          if (isCurrent && !isSelected) borderColor = "border-primary ring-2 ring-primary/20";
          if (hasScan && !isSelected) borderColor = "border-amber-400 ring-2 ring-amber-400/20";

          if (isSelected) {
            borderColor = "border-primary ring-4 ring-primary/50 shadow-md transform scale-110 z-10";
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
              <div key={week} className={`flex items-center justify-between py-2 border-b border-gray-50 last:border-0 ${isPast ? 'opacity-50' : ''}`}>
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${isDue ? 'bg-amber-500 animate-pulse' : 'bg-gray-300'}`}></div>
                  <div className="flex flex-col">
                    <span className={`text-sm ${isDue ? 'font-bold text-gray-900' : 'text-gray-600'}`}>
                      Week {week}: {name}
                    </span>
                    {lmpDate && !isNaN(new Date(lmpDate).getTime()) && (
                      <span className="text-[10px] text-gray-400 font-medium">
                        Expected: {new Date(new Date(lmpDate).getTime() + (Number(week) * 7 * 24 * 60 * 60 * 1000)).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    )}
                  </div>
                </div>
                {isPast ? (
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                ) : (
                  <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded uppercase">
                    {isDue ? 'Due Now' : 'Pending'}
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
  1: { emoji: '🌱', label: 'Poppy Seed' },
  2: { emoji: '🌱', label: 'Sesame Seed' },
  3: { emoji: '🌿', label: 'Vanilla Bean Seed' },
  4: { emoji: '🟤', label: 'Lentil' },
  5: { emoji: '🍏', label: 'Apple Seed' },
  6: { emoji: '🫛', label: 'Sweet Pea' },
  7: { emoji: '🫐', label: 'Blueberry' },
  8: { emoji: '🫑', label: 'Kidney Bean' },
  9: { emoji: '🍇', label: 'Grape' },
  10: { emoji: '🫒', label: 'Olive' },
  11: { emoji: '🍋', label: 'Lime' },
  12: { emoji: '🍋', label: 'Lime' },
  13: { emoji: '🍊', label: 'Lemon' },
  14: { emoji: '🍊', label: 'Navel Orange' },
  15: { emoji: '🍎', label: 'Apple' },
  16: { emoji: '🥑', label: 'Avocado' },
  17: { emoji: '🌰', label: 'Turnip' },
  18: { emoji: '🥦', label: 'Bell Pepper' },
  19: { emoji: '🥭', label: 'Mango' },
  20: { emoji: '🍌', label: 'Banana' },
  21: { emoji: '🥕', label: 'Carrot' },
  22: { emoji: '🍆', label: 'Eggplant' },
  23: { emoji: '🥥', label: 'Coconut' },
  24: { emoji: '🌽', label: 'Corn' },
  25: { emoji: '🥦', label: 'Cauliflower' },
  26: { emoji: '🥜', label: 'Butternut Squash' },
  27: { emoji: '🥬', label: 'Iceberg Lettuce' },
  28: { emoji: '🍆', label: 'Eggplant' },
  29: { emoji: '🎃', label: 'Butternut Squash' },
  30: { emoji: '🥦', label: 'Cabbage' },
  31: { emoji: '🥥', label: 'Coconut' },
  32: { emoji: '🎃', label: 'Jicama' },
  33: { emoji: '🍍', label: 'Pineapple' },
  34: { emoji: '🍍', label: 'Cantaloupe' },
  35: { emoji: '🍈', label: 'Honeydew Melon' },
  36: { emoji: '🥬', label: 'Romaine Lettuce Head' },
  37: { emoji: '🌿', label: 'Swiss Chard Bunch' },
  38: { emoji: '🎃', label: 'Pumpkin' },
  39: { emoji: '🍉', label: 'Watermelon' },
  40: { emoji: '🍉', label: 'Watermelon' },
};

const PregnancyCalculatorModal = ({ isOpen, onClose, formData: initialFormData }) => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [formData, setLocalFormData] = useState(initialFormData);
  const [selectedWeekTracker, setSelectedWeekTracker] = useState(null);

  const handleSaveProgress = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      window.location.href = '/login';
      return;
    }
    if (formData.lastPeriodDate) {
      localStorage.setItem(`pregnancy_progress_${user?.id || 'guest'}`, JSON.stringify({
        lastPeriodDate: formData.lastPeriodDate,
        cycleLength: formData.cycleLength,
        savedWeek: selectedWeekTracker
      }));
      alert("Pregnancy progress saved successfully!");
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
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && isOpen && !formData.lastPeriodDate) {
      const saved = localStorage.getItem(`pregnancy_progress_${user.id}`);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setLocalFormData({
            lastPeriodDate: parsed.lastPeriodDate,
            cycleLength: parsed.cycleLength || 28
          });
          // Also trigger calculation automatically? Wait, better to let them click Calculate to feel safe, or we auto calculate.
        } catch (e) { }
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
    } catch (error) {
      alert("Failed to calculate pregnancy");
    } finally {
      setLoading(false);
    }
  };

  const handleCalculate = () => {
    fetchCalculatedData(formData.lastPeriodDate, formData.cycleLength);
  };

  const handleClear = () => {
    setLocalFormData({ lastPeriodDate: '', cycleLength: '28' });
    setResult(null);
    setSelectedWeekTracker(null);
  };

  const currentViewWeek = selectedWeekTracker || result?.pregnancyWeek;
  const growthItem = result?.allGrowthData?.find(d => d.week === currentViewWeek) || result?.growth;

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
              <Button onClick={handleSaveProgress} variant="outline" size="sm" className="text-xs">Save Progress</Button>
              <Button onClick={handleClear} variant="outline" size="sm" className="text-xs text-red-500 border-red-200 hover:bg-red-50">Clear</Button>
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
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Start Date (LMP) *</label>
                <PrimeCalendar
                  value={formData.lastPeriodDate ? new Date(formData.lastPeriodDate) : null}
                  onChange={(e) => setLocalFormData({ ...formData, lastPeriodDate: e.value ? e.value.toISOString().split('T')[0] : '' })}
                  dateFormat="dd/mm/yy"
                  placeholder="Select Date"
                  className="w-full"
                  inputClassName="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  maxDate={new Date(new Date().setFullYear(new Date().getFullYear() + 1))}
                  minDate={new Date(new Date().setFullYear(new Date().getFullYear() - 1))}
                />
              </div>
              <FormInput
                type="number"
                label="Cycle Length (Days)"
                value={formData.cycleLength || "28"}
                onChange={(e) => setLocalFormData({ ...formData, cycleLength: e.target.value })}
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
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Start Date (LMP)</p>
                  <p className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <LucideCalendar className="w-4 h-4 text-primary" />
                    {new Date(formData.lastPeriodDate).toLocaleDateString("en-GB", { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Estimated Due Date</p>
                  <p className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <Baby className="w-4 h-4 text-green-500" />
                    {new Date(result.expectedDeliveryDate).toLocaleDateString("en-GB", { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                </div>
              </div>

              {/* Milestones / Days */}
              <div className={`rounded-2xl p-4 border shadow-sm flex flex-col justify-center items-center text-center ${getTrimesterColor(result.pregnancyWeek)}`}>
                <p className="text-sm font-bold opacity-80 uppercase mb-1">{result.trimester}</p>
                <div className="flex gap-4">
                  <div>
                    <p className="text-2xl font-extrabold">{result.pregnancyWeek * 7}</p>
                    <p className="text-[10px] font-semibold uppercase">Days Done</p>
                  </div>
                  <div className="w-px h-full bg-current opacity-20"></div>
                  <div>
                    <p className="text-2xl font-extrabold">{280 - (result.pregnancyWeek * 7)}</p>
                    <p className="text-[10px] font-semibold uppercase">Days Left</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
              <div className="flex justify-between items-end mb-2">
                <span className="text-xs font-bold text-gray-500">Week 0</span>
                <span className="text-sm font-bold text-gray-900">Current: Week {result.pregnancyWeek}</span>
                <span className="text-xs font-bold text-gray-500">Week 40</span>
              </div>
              <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden relative flex">
                {/* Visual block for each week for precision if needed, or simple percentage */}
                <div className={`h-full ${getTrimesterBgClass(result.pregnancyWeek)} transition-all duration-1000`} style={{ width: `${(result.pregnancyWeek / 40) * 100}%` }}></div>
              </div>
            </div>

            {/* Growth Details Journey Explorer */}
            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
              <div className="bg-gray-50 px-5 py-3 border-b border-gray-100 flex justify-between items-center">
                <button
                  onClick={() => setSelectedWeekTracker(Math.max(1, currentViewWeek - 1))}
                  disabled={currentViewWeek <= 1}
                  className="p-1.5 hover:bg-white rounded-lg border border-transparent hover:border-gray-200 transition-colors disabled:opacity-30"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="text-center">
                  <h4 className="font-bold text-gray-900 text-lg">Exploring Week {currentViewWeek}</h4>
                  <p className="text-xs text-primary font-medium">{currentViewWeek === result.pregnancyWeek ? "(Your Current Week)" : ""}</p>
                </div>
                <button
                  onClick={() => setSelectedWeekTracker(Math.min(40, currentViewWeek + 1))}
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
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  {/* Emoji fallback – always rendered, hidden only when API image loads successfully */}
                  <div
                    style={{ display: growthItem?.image ? 'none' : 'flex' }}
                    className="w-32 h-32 hover:scale-110 transition-transform duration-500 rounded-full bg-white shadow-sm mb-4 items-center justify-center text-7xl"
                  >
                    {weeklyFruitMap[currentViewWeek]?.emoji || '🌱'}
                  </div>
                  <p className="font-bold text-gray-900 text-lg mb-1">
                    Baby is the size of a{' '}
                    <span className="text-primary">
                      {growthItem?.fruit || weeklyFruitMap[currentViewWeek]?.label || 'Seed'}
                    </span>
                  </p>
                  <div className="flex gap-4 text-sm text-gray-500 font-medium">
                    <span className="bg-gray-100 px-3 py-1 rounded-full">{growthItem?.weight || "-"}</span>
                    <span className="bg-gray-100 px-3 py-1 rounded-full">{growthItem?.length || "-"} cm</span>
                  </div>
                </div>

                {/* Development Insights */}
                <div className="space-y-4">
                  <h5 className="font-bold text-gray-900 border-b border-gray-100 pb-2">Weekly Development</h5>

                  <div className="flex items-start gap-3">
                    <div className="bg-red-50 p-1.5 rounded-md flex-shrink-0"><Heart className="w-4 h-4 text-red-500" /></div>
                    <div>
                      <p className="text-xs font-bold text-gray-500 uppercase">Heartbeat & Circulatory</p>
                      <p className="text-sm font-medium text-gray-800">{growthItem?.heartbeat || "Development ongoing"}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-orange-50 p-1.5 rounded-md flex-shrink-0"><Activity className="w-4 h-4 text-orange-500" /></div>
                    <div>
                      <p className="text-xs font-bold text-gray-500 uppercase">Limb Development</p>
                      <p className="text-sm font-medium text-gray-800">{growthItem?.limb || "Development ongoing"}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-purple-50 p-1.5 rounded-md flex-shrink-0"><Stethoscope className="w-4 h-4 text-purple-500" /></div>
                    <div>
                      <p className="text-xs font-bold text-gray-500 uppercase">Organ Highlights</p>
                      <p className="text-sm font-medium text-gray-800">{growthItem?.organ || "Development ongoing"}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Image Banner linking to Consultation */}
            <div className="mt-6 rounded-2xl overflow-hidden shadow-sm relative group cursor-pointer" onClick={() => window.location.href = '/appointment'}>
              <img
                src="https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=1200&h=300&fit=crop"
                alt="Book Consultation Banner"
                className="w-full h-32 object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-blue-900/50 flex flex-col justify-center px-8">
                <h3 className="text-white font-bold text-xl mb-1">Expert Care For You & Your Baby</h3>
                <p className="text-purple-100 text-sm mb-3 max-w-md">Schedule a personalized consultation with our leading obstetricians.</p>
                <div>
                  <span className="inline-block bg-white text-purple-700 font-bold text-xs uppercase tracking-wider py-1.5 px-4 rounded-full shadow-lg">
                    Book Consultation &rarr;
                  </span>
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <p className="text-[10px] text-center text-gray-400 mt-6 max-w-xl mx-auto">
              This calculator provides estimates only based on standard 28-day cycles. True gestational age and dates may vary. Always consult a healthcare provider for professional medical advice, diagnosis, or treatment.
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
    message
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
    try {
      setLoading(true);
      const res = await api.post("/bmi", {
        height: Number(localFormData.height),
        weight: Number(localFormData.weight)
      });

      setResult(res.data.data);
    } catch (error) {
      alert("Failed to calculate BMI");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="BMI Calculator"
    >
      <div className="space-y-4">

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-3">
            <FormInput
              label="Height (cm)"
              type="number"
              value={localFormData.height}
              onChange={(e) => setLocalFormData({ ...localFormData, height: e.target.value })}
            />
            <FormInput
              label="Weight (kg)"
              type="number"
              value={localFormData.weight}
              onChange={(e) => setLocalFormData({ ...localFormData, weight: e.target.value })}
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
                <p className="text-sm text-gray-700">
                  {result.message}
                </p>
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
      id: 'menstrual',
      title: 'Menstrual Cycle Tracker',
      subtitle: 'Your cycle, your health — tracked with care.',
      icon: <LucideCalendar className="w-6 h-6 text-pink-500" />,
      bgColor: 'bg-pink-50',
      fields: [
        {
          name: 'lastPeriodDate',
          label: 'Last Period Date',
          type: 'calendar',
          placeholder: 'Select Date',
          required: true
        },
        {
          name: 'cycleLength',
          label: 'Cycle Length (Days)',
          type: 'number',
          placeholder: 'Enter cycle length',
          required: true
        },
      ],
    },
    {
      id: 'pregnancy',
      title: 'Pregnancy Assistant',
      subtitle: 'Calculate due date and pregnancy milestones',
      icon: <Baby className="w-6 h-6 text-blue-500" />,
      bgColor: 'bg-blue-50',
      fields: [
        {
          name: 'lastPeriodDate', // Changed from lastMenstrual
          label: 'Start Date (LMP)',
          type: 'calendar', // Changed to 'calendar'
          placeholder: 'Select Date',
          required: true
        },
        {
          name: 'cycleLength',
          label: 'Cycle Length (optional)',
          type: 'text',
          placeholder: '28 days'
        },
      ],
    },
    {
      id: 'bmi',
      title: 'BMI Calculator',
      subtitle: 'Calculate your Body Mass Index and health status',
      icon: <Activity className="w-6 h-6 text-green-500" />,
      bgColor: 'bg-green-50',
      fields: [
        {
          name: 'height',
          label: 'Height (cm)',
          type: 'text',
          placeholder: 'Enter height',
          required: true
        },
        {
          name: 'weight',
          label: 'Weight (kg)',
          type: 'text',
          placeholder: 'Enter weight',
          required: true
        },
      ],
    },
  ];

  const handleCalculate = (calculatorId, formData) => {
    setActiveCalculator(calculatorId);
    setCalculatorData(formData);
    setModalOpen(true);
  };

  return (
    <div className="h-auto py-8 px-4 sm:px-6 lg:px-8 pb-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 className=" sm:text-4xl  text-black mb-2 title">
            Advanced Health <span className="text-gold">Calculators</span>
          </h1>
          <p className="sub-title sm:text-base text-gray-600 mb-1">
            Get instant, professional-grade insights into your health with our comprehensive calculators
          </p>
          <p className="text-xs text-gray-500 flex items-center justify-center gap-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
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
            />
          ))}
        </div>
      </div>

      <MenstrualTrackerModal
        isOpen={modalOpen && activeCalculator === 'menstrual'}
        onClose={() => setModalOpen(false)}
        formData={calculatorData}
      />

      <PregnancyCalculatorModal
        isOpen={modalOpen && activeCalculator === 'pregnancy'}
        onClose={() => setModalOpen(false)}
        formData={calculatorData}
      />

      <BMICalculatorModal
        isOpen={modalOpen && activeCalculator === 'bmi'}
        onClose={() => setModalOpen(false)}
        formData={calculatorData}
      />

    </div>
  );
};

export default HealthCalculator;