import React from 'react';
import stats from '../assets/Images/stats.png';
import leaf from '../assets/Images/leaf.png';
import idea from '../assets/Images/idea.png';



export default function WhyChooseSection() {
  return (
    <div className="py-16" id=''>
      <div className="max-w-6xl mx-auto  px-8">
        <span className="bg-green-900 text-white px-4 py-2 rounded-full text-sm font-semibold inline-block mb-4">
          FEATURES
        </span>
        <h2 className="text-4xl font-bold text-gray-900 mb-12">
          Why Choose AgroTrack?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Live Market Rates */}
          <div className=" bg-lime-50 p-8 rounded-2xl transition transform hover:-translate-y-2">
            <img src={stats} className='w-12 mb-4' alt="" />
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Live Market Rates
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Stay informed with real-time insights on commodity rates.
            </p>
          </div>

          {/* Weather Insights */}
          <div className="p-8 bg-gray-100 rounded-2xl transition transform hover:-translate-y-2">
            <div className="text-5xl mb-4">🌤️</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Weather Insights
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Get real-time weather conditions and forecasts for your region.
            </p>
          </div>

          {/* Image Card - Ladybug */}
          <div className="bg-green-800 p-10 rounded-2xl overflow-hidden transition transform hover:-translate-y-2 row-span-2">
              <h3 className="text-xl font-bold text-white mb-3">
                Smart advice
              </h3>
              <p className="text-gray-100 leading-relaxed mb-10">
                Receive AI-based farming tips based on weather market trends.
              </p>
              <img src={idea} alt="" />
          </div>

          {/* Farmer Community */}
          <div className="bg-green-50 p-8 rounded-2xl transition transform hover:-translate-y-2">
            <div className="text-5xl mb-6">👥</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Farmer Community
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Connect, share, and learn from our global network of farmers.
            </p>
          </div>

          {/* Smart Advice */}
          <div className="rounded-2xl transition transform hover:-translate-y-2 text-white">
            <img src={leaf} alt="" />
          </div>

        </div>

      </div>

      <div className="bg-gray-50 mt-10 text-center w-full p-30 mt-24">
            <p className="text-gray-700 text-3xl leading-relaxed">
              With the Smart Agriculture Market Tracker, farmers gain the power of data. Our mission is to help farmers make smarter, data-driven decisions through transparent market information, predictive insights, and a collaborative community.
            </p>
      </div>

    </div>
  );
}