import { useState } from 'react';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is this platform used for?",
      answer: "AgroTrack is a comprehensive platform that provides farmers with real-time market prices, weather forecasting, expert farming advice, and a community to connect with fellow farmers. It helps you make data-driven decisions to maximize your farm's productivity and profitability."
    },
    {
      question: "Do I need to create an account to use the app?",
      answer: "Yes, creating an account allows you to access personalized features, save your preferences, track your favorite crops and markets, and participate in the farmer community. Registration is free and takes just a few minutes."
    },
    {
      question: "How often are market prices and weather updates refreshed?",
      answer: "Market prices are updated in real-time throughout the day as new data becomes available. Weather forecasts are refreshed every 6 hours, and severe weather alerts are pushed immediately to ensure you have the most current information."
    },
    {
      question: "Can I access the app on mobile?",
      answer: "Absolutely! AgroTrack is available as a mobile app for both iOS and Android devices, as well as a web application. You can access your account and all features seamlessly across all devices."
    },
    {
      question: "Is this service free to use?",
      answer: "We offer a free basic plan with essential features including market prices and weather updates. Premium plans with advanced analytics, personalized advice, and additional features are available at affordable subscription rates."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-white py-16 px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <span className="bg-green-900 text-white px-4 py-2 rounded-full text-sm font-semibold inline-block mb-4">
            FAQ
          </span>
          <h2 className="text-4xl font-bold text-gray-900">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl overflow-hidden border-2 border-transparent hover:border-green-200 transition"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center p-6 text-left"
              >
                <span className="font-semibold text-gray-900 text-lg pr-8">
                  {faq.question}
                </span>
                <span className={`text-2xl text-green-900 transition-transform duration-300 flex-shrink-0 ${
                  openIndex === index ? 'rotate-45' : ''
                }`}>
                  +
                </span>
              </button>
              
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}