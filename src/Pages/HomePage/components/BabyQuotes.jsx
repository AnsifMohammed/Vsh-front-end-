import { Quote } from 'lucide-react';

const BabyQuotes = () => {
  const babyImages = [
    {
      id: 1,
      name: "baby-arjun",
      quote: "Every baby is a blessing, a gift from heaven above, a precious little angel to cherish and to love.",
      author: "Indian Proverb",
      color: "bg-amber-50"
    },
    {
      id: 2,
      name: "baby-ananya",
      quote: "A baby fills a place in your heart that you never knew was empty.",
      author: "Traditional Indian Saying",
      color: "bg-rose-50"
    },
    {
      id: 3,
      name: "baby-krishna",
      quote: "The joy of motherhood comes in moments. There will be hard times and frustrating times, but amid the challenges, there are shining moments of joy and satisfaction.",
      author: "Ancient Indian Wisdom",
      color: "bg-sky-50"
    }
  ];

  // Using colorful placeholder divs with baby icon and sanskrit-inspired names
  // These use gradients that represent warmth, joy, and hope - matching hospital theme

  return (
    <div className="min-h-[400px] py-16 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl mb-4 title text-gray-900">
            Little <span className="text-gold">Miracles</span> of Life
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto sub-title">
            Every child is a precious gift. Our hospital celebrates the joy of parenthood with love and care.
          </p>
        </div>

        {/* Baby Images Grid - Using gradient placeholders */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {babyImages.map((item) => (
            <div key={item.id} className="relative group">
              {/* Image Container */}
              <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg">
                {/* Gradient Background as placeholder for baby photo */}
                <div className={`absolute inset-0 ${item.color} flex items-center justify-center transition-transform duration-500 group-hover:scale-105`}>
                  <div className="text-center">
                    {/* Baby icon using emoji as placeholder */}
                    <div className="text-7xl mb-2">👶🏻</div>
                    <p className="text-gray-500 font-nunito text-sm uppercase tracking-wide">
                      {item.name}
                    </p>
                  </div>
                </div>

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Decorative dots pattern */}
                <div className="absolute inset-0 opacity-10 pointer-events-none"
                  style={{
                    backgroundImage: `radial-gradient(circle, #6B3FA0 1px, transparent 1px)`,
                    backgroundSize: '20px 20px'
                  }}
                />
              </div>

              {/* Quote Card below image */}
              <div className="mt-4 p-5 rounded-xl bg-white shadow-md border border-gray-100">
                <Quote className="w-5 h-5 text-purple-400 mb-2" />
                <p className="text-gray-700 font-inter italic text-sm leading-relaxed mb-3">
                  "{item.quote}"
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white text-xs font-bold">
                    ✦
                  </div>
                  <p className="text-xs text-gray-500 font-medium">
                    — {item.author}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Decorative Wave Bottom */}
        <div className="mt-16 flex justify-center">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-purple-300 animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-3 h-3 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-3 h-3 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BabyQuotes;