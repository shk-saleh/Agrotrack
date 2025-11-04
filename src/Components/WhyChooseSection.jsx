export default function WhyChooseSection() {
  return (
    <div className="bg-gray-50 py-16 px-8">
      <div className="max-w-6xl mx-auto">
        <span className="bg-green-900 text-white px-4 py-2 rounded-full text-sm font-semibold inline-block mb-4">
          FEATURES
        </span>
        <h2 className="text-4xl font-bold text-gray-900 mb-12">
          Why Choose AgroTrack?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Live Market Rates */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-2">
            <div className="text-5xl mb-4">📈</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Live Market Rates
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Stay informed with real-time insights on commodity rates.
            </p>
          </div>

          {/* Weather Insights */}
          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-8 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-2">
            <div className="text-5xl mb-4">🌤️</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Weather Insights
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Get real-time weather conditions and forecasts for your region.
            </p>
          </div>

          {/* Image Card - Ladybug */}
          <div className="rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition transform hover:-translate-y-2 row-span-2">
            <img 
              src="https://images.unsplash.com/photo-1492031215329-791748e1d32d?w=500&h=400&fit=crop" 
              alt="Ladybug on leaf" 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Farmer Community */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-2">
            <div className="text-5xl mb-4">👥</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Farmer Community
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Connect, share, and learn from our global network of farmers.
            </p>
          </div>

          {/* Smart Advice */}
          <div className="bg-green-900 p-8 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-2 text-white">
            <h3 className="text-xl font-bold mb-4">Smart Advice</h3>
            <p className="text-green-100 mb-6 leading-relaxed">
              Get data-driven farming tips based on market trends and weather patterns.
            </p>
            <div className="bg-yellow-400 w-20 h-20 rounded-full flex items-center justify-center text-4xl mx-auto">
              💡
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="text-center max-w-3xl mx-auto mt-16">
          <p className="text-lg text-gray-600 leading-relaxed">
            With the <span className="font-semibold text-green-900">Smart Agriculture Market Tracker</span>, farmers gain the power of information to help make smarter, data-driven decisions through transparent market information, predictive insights, and a collaborative community.
          </p>
        </div>
      </div>
    </div>
  );
}