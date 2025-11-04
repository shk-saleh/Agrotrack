import React, { useState, useEffect } from 'react';
import { Cloud, Droplets, Wind, Sun, CloudRain, Eye, Thermometer } from 'lucide-react';

const WeatherWidget = () => {
  const [weather, setWeather] = useState({
    city: 'Karachi',
    temp: 28,
    humidity: 65,
    windSpeed: 15,
    visibility: 10,
    pressure: 1013,
    description: 'Partly Cloudy',
    icon: '02d',
    forecast: [
      { day: 'Today', temp: 28, condition: 'Partly Cloudy', icon: '02d' },
      { day: 'Tomorrow', temp: 30, condition: 'Sunny', icon: '01d' },
      { day: 'Wednesday', temp: 27, condition: 'Cloudy', icon: '03d' },
      { day: 'Thursday', temp: 26, condition: 'Rainy', icon: '10d' },
      { day: 'Friday', temp: 29, condition: 'Sunny', icon: '01d' },
    ]
  });

  const cities = ['Karachi', 'Lahore', 'Islamabad', 'Peshawar', 'Quetta', 'Multan', 'Faisalabad'];

  const getWeatherIcon = (condition) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
        return <Sun className="text-yellow-500" size={48} />;
      case 'rainy':
        return <CloudRain className="text-blue-500" size={48} />;
      case 'cloudy':
      case 'partly cloudy':
        return <Cloud className="text-gray-500" size={48} />;
      default:
        return <Cloud className="text-gray-500" size={48} />;
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Weather Forecast</h2>
        <p className="text-gray-600 mt-2">Plan your farming activities based on weather</p>
      </div>

      {/* City Selector */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6 border border-gray-100">
        <select
          value={weather.city}
          onChange={(e) => setWeather({ ...weather, city: e.target.value })}
          className="w-full md:w-96 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none bg-white"
        >
          {cities.map(city => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
      </div>

      {/* Current Weather Card */}
      <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl shadow-lg p-8 text-white mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-2">Current Weather - {weather.city}</h3>
            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-6xl font-bold">{weather.temp}°C</span>
              <span className="text-2xl text-blue-100">{weather.description}</span>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="flex items-center gap-2">
                <Droplets size={20} />
                <span>Humidity: {weather.humidity}%</span>
              </div>
              <div className="flex items-center gap-2">
                <Wind size={20} />
                <span>Wind: {weather.windSpeed} km/h</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye size={20} />
                <span>Visibility: {weather.visibility} km</span>
              </div>
              <div className="flex items-center gap-2">
                <Thermometer size={20} />
                <span>Pressure: {weather.pressure} hPa</span>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            {getWeatherIcon(weather.description)}
          </div>
        </div>
      </div>

      {/* 5-Day Forecast */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-8">
        <h3 className="text-xl font-bold text-gray-800 mb-6">5-Day Forecast</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {weather.forecast.map((day, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4 text-center">
              <p className="font-semibold text-gray-800 mb-3">{day.day}</p>
              <div className="flex justify-center mb-3">
                {getWeatherIcon(day.condition)}
              </div>
              <p className="text-2xl font-bold text-gray-800 mb-1">{day.temp}°C</p>
              <p className="text-sm text-gray-600">{day.condition}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Farming Recommendations */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">🌾 Farming Recommendations</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-green-600 font-bold">✓</span>
            </div>
            <div>
              <p className="font-medium text-gray-800">Good day for irrigation</p>
              <p className="text-sm text-gray-600">Moderate temperature and humidity levels are ideal</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-yellow-600 font-bold">!</span>
            </div>
            <div>
              <p className="font-medium text-gray-800">Prepare for rain on Thursday</p>
              <p className="text-sm text-gray-600">Adjust watering schedule accordingly</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-blue-600 font-bold">i</span>
            </div>
            <div>
              <p className="font-medium text-gray-800">Monitor crop health</p>
              <p className="text-sm text-gray-600">Current conditions may affect pest activity</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
