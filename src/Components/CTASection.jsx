export default function CTASection() {
  return (
    <div className="py-16 px-8">
      <div className="max-w-6xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl h-96">
          {/* Background Images */}
          <div className="absolute inset-0 flex">
            <div className="w-1/2 bg-green-900"></div>
            <div className="w-1/2">
              <img
                src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1000&h=600&fit=crop"
                alt="Agricultural field"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/95 via-green-900/80 to-transparent"></div>

          {/* Content */}
          <div className="relative h-full flex items-center">
            <div className="px-12 md:px-16 max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Get insights that help you save costs and increase profits.
              </h2>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-white text-green-900 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition transform hover:-translate-y-1 hover:shadow-lg flex items-center justify-center gap-2">
                  Start Your Free Trial 
                  <span className="bg-green-900 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">
                    →
                  </span>
                </button>
                <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition transform hover:-translate-y-1 flex items-center justify-center gap-2">
                  AI Recommendations 
                  <span className="text-xl">✨</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}