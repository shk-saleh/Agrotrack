import React from 'react';
import { Lightbulb, TrendingUp, Cloud, AlertTriangle, CheckCircle } from 'lucide-react';

const SmartAdvice = ({ products }) => {
  const adviceCategories = [
    {
      id: 'market',
      title: 'Market Insights',
      icon: TrendingUp,
      color: 'blue',
      advice: [
        {
          priority: 'high',
          title: 'High Demand Alert',
          message: 'Tomato prices have increased by 15% in Karachi. Consider selling your harvest soon for maximum profit.',
          action: 'View Market Prices'
        },
        {
          priority: 'medium',
          title: 'Price Prediction',
          message: 'Onion prices are expected to rise by 10% next week due to reduced supply.',
          action: 'Track Trends'
        },
        {
          priority: 'low',
          title: 'Market Opportunity',
          message: 'Consider diversifying into potato farming. Current market shows consistent demand.',
          action: 'Learn More'
        }
      ]
    },
    {
      id: 'weather',
      title: 'Weather-Based Advice',
      icon: Cloud,
      color: 'purple',
      advice: [
        {
          priority: 'high',
          title: 'Rain Expected',
          message: 'Heavy rain forecasted for Thursday. Avoid watering crops and prepare drainage systems.',
          action: 'View Forecast'
        },
        {
          priority: 'medium',
          title: 'Temperature Alert',
          message: 'High temperatures expected next week. Increase watering frequency for better crop health.',
          action: 'Set Reminder'
        }
      ]
    },
    {
      id: 'seasonal',
      title: 'Seasonal Recommendations',
      icon: Lightbulb,
      color: 'green',
      advice: [
        {
          priority: 'medium',
          title: 'Best Planting Time',
          message: 'November is ideal for planting winter vegetables like cauliflower and cabbage.',
          action: 'View Calendar'
        },
        {
          priority: 'low',
          title: 'Harvest Planning',
          message: 'Your current crops will be ready for harvest in 2-3 weeks. Plan your logistics accordingly.',
          action: 'Create Plan'
        }
      ]
    },
    {
      id: 'crop-health',
      title: 'Crop Health Tips',
      icon: AlertTriangle,
      color: 'orange',
      advice: [
        {
          priority: 'high',
          title: 'Pest Alert',
          message: 'Increased aphid activity reported in your region. Apply organic pesticides as preventive measure.',
          action: 'Get Solution'
        },
        {
          priority: 'medium',
          title: 'Nutrient Recommendation',
          message: 'Your soil may need nitrogen supplementation. Consider adding organic compost.',
          action: 'Shop Fertilizers'
        }
      ]
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'border-red-500 bg-red-50';
      case 'medium':
        return 'border-yellow-500 bg-yellow-50';
      case 'low':
        return 'border-green-500 bg-green-50';
      default:
        return 'border-gray-500 bg-gray-50';
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'high':
        return <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">High Priority</span>;
      case 'medium':
        return <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">Medium</span>;
      case 'low':
        return <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">Low Priority</span>;
      default:
        return null;
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800">🧠 Smart Farmer Advice</h2>
        <p className="text-gray-600 mt-2">AI-powered recommendations for better farming decisions</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="text-green-600" size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">12</p>
              <p className="text-sm text-gray-600">Active Recommendations</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="text-red-600" size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">3</p>
              <p className="text-sm text-gray-600">High Priority Alerts</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Lightbulb className="text-blue-600" size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">8</p>
              <p className="text-sm text-gray-600">Tips Applied This Week</p>
            </div>
          </div>
        </div>
      </div>

      {/* Advice Categories */}
      <div className="space-y-8">
        {adviceCategories.map((category) => {
          const Icon = category.icon;
          return (
            <div key={category.id} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-12 h-12 bg-${category.color}-100 rounded-lg flex items-center justify-center`}>
                  <Icon className={`text-${category.color}-600`} size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-800">{category.title}</h3>
              </div>

              <div className="space-y-4">
                {category.advice.map((item, index) => (
                  <div
                    key={index}
                    className={`border-l-4 ${getPriorityColor(item.priority)} rounded-lg p-4`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-bold text-gray-800">{item.title}</h4>
                      {getPriorityBadge(item.priority)}
                    </div>
                    <p className="text-gray-700 mb-3">{item.message}</p>
                    <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium">
                      {item.action} →
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* AI Insights Panel */}
      <div className="mt-8 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <Lightbulb className="text-indigo-600" size={24} />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-800 mb-2">💡 AI-Powered Insight</h3>
            <p className="text-gray-700 mb-4">
              Based on your location and current market trends, we recommend focusing on tomato and onion cultivation. 
              These crops show highest profit potential with current weather conditions and market demand in your region.
            </p>
            <div className="flex gap-3">
              <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium">
                Get Detailed Plan
              </button>
              <button className="px-6 py-2 border-2 border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors font-medium">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartAdvice;
