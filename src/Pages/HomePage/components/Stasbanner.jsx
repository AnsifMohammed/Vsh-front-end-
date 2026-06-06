import bannerimg from '../../../assets/stascardimg.webp'
export default function StatsBanner() {
  const stats = [
    { value: '25+', label: 'Expert Doctors' },
    { value: '200+', label: 'Years Combined' },
    { value: '15,000+', label: 'Monthly Consultations' },
    { value: '4.8', label: 'Average Rating' }
  ];

  return (
   <div
  className="relative w-full h-24 overflow-hidden"
  style={{
    backgroundImage: `url(${bannerimg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }}
>

      {/* Purple overlay */}
      <div className="absolute inset-0 bg-purple-600 opacity-80"></div>
      
      {/* Stats container */}
      <div className="relative h-full flex items-center justify-around max-w-7xl mx-auto">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className="text-white text-3xl font-bold mb-1">
              {stat.value}
            </div>
            <div className="text-purple-100 text-sm font-medium">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}