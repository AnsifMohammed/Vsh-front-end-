import { useEffect, useState } from "react";
import { Baby, Heart, Clock, Star } from "lucide-react";
import api from "../../../api/api";  // adjust path if needed

const AnimatedNumber = ({ value, duration = 2000 }) => {
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    // Parse the value: remove commas and '+'
    const target = parseFloat(String(value).replace(/,/g, '').replace('+', ''));
    if (isNaN(target)) {
      setCurrentValue(value);
      return;
    }

    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);

      const current = Math.floor(progress * target);
      setCurrentValue(current);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCurrentValue(target);
      }
    };

    window.requestAnimationFrame(step);
  }, [value, duration]);

  // If the original value had a '+' or was a rating, format it back
  if (typeof value === 'string' && value.includes('+')) {
    return <span>{currentValue.toLocaleString()}+</span>;
  }
  if (value % 1 !== 0 || (typeof value === 'number' && value < 10)) {
    // Handle ratings (e.g., 4.9)
    const displayValue = (currentValue / 10).toFixed(1);
    // This is a bit tricky for ratings, let's refine the logic:
    // For simplicity, if it's the rating (usually < 10), we animate differently or just return the final for now
    // Actually, let's just animate the decimal specifically if needed.
    return <span>{value}</span>;
  }

  return <span>{currentValue.toLocaleString()}</span>;
};

const StatsCard = () => {
  const [statsData, setStatsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/counters");
        if (res.data && res.data.data) {
          setStatsData(res.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch stats", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="w-full px-4 py-20 text-center text-gray-600">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-4 w-48 bg-gray-200 rounded mb-4"></div>
          <p>Loading statistics...</p>
        </div>
      </div>
    );
  }

  if (!statsData) return null;

  const stats = [
    {
      icon: Heart,
      value: statsData.familiesHelped,
      suffix: "+",
      label: "Families Helped",
      iconColor: "text-purple-500"
    },
    {
      icon: Baby,
      value: statsData.babiesDelivered,
      suffix: "+",
      label: "Babies Delivered",
      iconColor: "text-purple-500"
    },
    {
      icon: Clock,
      value: statsData.yearsExperience,
      suffix: "+",
      label: "Years Experience",
      iconColor: "text-purple-500"
    },
    {
      icon: Star,
      value: statsData.googleRating,
      suffix: "",
      label: "Rated on Google",
      iconColor: "text-purple-500"
    }
  ];

  return (
    <div className="w-full py-16">
      <div className="bg-purple-200 border-y border-primary/20 p-8 w-full">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="flex items-center gap-4">
                {/* Icon */}
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm">
                    <Icon className={`w-6 h-6 ${stat.iconColor}`} />
                  </div>
                </div>

                {/* Text */}
                <div className="flex flex-col">
                  <span className="font-nunito font-extrabold text-[30px] text-primary">
                    <AnimatedNumber value={stat.value} />{stat.suffix}
                  </span>
                  <span className="font-inter font-medium text-[18px] text-gray-600">
                    {stat.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
