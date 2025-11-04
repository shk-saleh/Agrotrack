import { useState } from 'react';

export default function WhatWeOfferSection() {
  const offers = [
    {
      id: 1,
      title: "Market Price Tracker",
      description: "Real-time pricing & trends",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=400&fit=crop"
    },
    {
      id: 2,
      title: "Weather Monitoring",
      description: "Accurate forecasts & alerts",
      image: "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=500&h=400&fit=crop"
    },
    {
      id: 3,
      title: "AI-Based Advice",
      description: "Smart farming recommendations",
      image: "https://d17ocfn2f5o4rl.cloudfront.net/wp-content/uploads/2023/07/BP-AI-in-Agriculture-The-Future-of-Farming_body-im-3.jpg"
    },
    {
      id: 4,
      title: "Community Forum",
      description: "Connect with fellow farmers",
      image: "https://agexplorer.ffa.org/wp-content/uploads/2022/12/careers_photo_58.jpg"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % offers.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + offers.length) % offers.length);
  };

  return (
    <div className="bg-white py-16 px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <div>
            <span className="bg-green-900 text-white px-4 py-2 rounded-full text-sm font-semibold inline-block mb-4">
              SERVICES
            </span>
            <h2 className="text-4xl font-bold text-gray-900">What We Offer</h2>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={prev}
              className="w-12 h-12 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition"
            >
              ←
            </button>
            <button 
              onClick={next}
              className="w-12 h-12 rounded-full bg-green-900 hover:bg-green-800 text-white flex items-center justify-center transition"
            >
              →
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {offers.map((offer, index) => (
            <div
              key={offer.id}
              className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 group cursor-pointer h-80"
            >
              <img
                src={offer.image}
                alt={offer.title}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-medium mb-2">{offer.title}</h3>
                <p className="text-gray-300 text-sm">{offer.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}