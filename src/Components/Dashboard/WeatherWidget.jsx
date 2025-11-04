import React, { useState, useEffect } from 'react';
import { Cloud, Droplets, Wind, Sun, CloudRain, Eye, Thermometer, AlertTriangle, CheckCircle, Loader } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { WEATHER_API_KEY, getWeatherUrl } from '../../config/weatherApi';

const WeatherWidget = () => {
  const [selectedCity, setSelectedCity] = useState('Karachi');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cities = ['Karachi', 'Lahore', 'Islamabad', 'Peshawar', 'Quetta', 'Multan', 'Faisalabad'];

  useEffect(() => {
    fetchWeatherData(selectedCity);
  }, [selectedCity]);

  const fetchWeatherData = async (city) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(getWeatherUrl(city, 5));
      const data = response.data;

      // Transform API data to our format
      const weatherData = {
        city: data.location.name,
        country: data.location.country,
        localTime: data.location.localtime,
        current: {
          temp: Math.round(data.current.temp_c),
          feelsLike: Math.round(data.current.feelslike_c),
          condition: data.current.condition.text,
          icon: data.current.condition.icon,
          humidity: data.current.humidity,
          windSpeed: Math.round(data.current.wind_kph),
          windDir: data.current.wind_dir,
          pressure: data.current.pressure_mb,
          visibility: data.current.vis_km,
          uv: data.current.uv,
          isDay: data.current.is_day,
          cloudCover: data.current.cloud,
          precipitation: data.current.precip_mm
        },
        forecast: data.forecast.forecastday.map(day => ({
          date: day.date,
          dayName: new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' }),
          maxTemp: Math.round(day.day.maxtemp_c),
          minTemp: Math.round(day.day.mintemp_c),
          avgTemp: Math.round(day.day.avgtemp_c),
          condition: day.day.condition.text,
          icon: day.day.condition.icon,
          chanceOfRain: day.day.daily_chance_of_rain,
          chanceOfSnow: day.day.daily_chance_of_snow,
          avgHumidity: day.day.avghumidity,
          maxWind: Math.round(day.day.maxwind_kph),
          totalPrecip: day.day.totalprecip_mm,
          avgVisibility: day.day.avgvis_km,
          uv: day.day.uv
        }))
      };

      setWeather(weatherData);
    } catch (err) {
      console.error('Weather API Error:', err);
      setError('Failed to fetch weather data. Please check your API key.');
      toast.error('Failed to load weather data');
    } finally {
      setLoading(false);
    }
  };

  // Smart farming recommendations based on weather
  const getWeatherRecommendations = () => {
    if (!weather) return [];

    const recommendations = [];
    const current = weather.current;
    const todayForecast = weather.forecast[0];

    // Rain-based recommendations
    if (todayForecast.chanceOfRain > 70) {
      recommendations.push({
        type: 'alert',
        priority: 'high',
        icon: '🌧️',
        title: 'High Rain Probability',
        message: `${todayForecast.chanceOfRain}% chance of rain today. Avoid watering crops and ensure proper drainage systems are in place.`,
        actions: ['Skip Irrigation', 'Check Drainage']
      });
    } else if (todayForecast.chanceOfRain > 40) {
      recommendations.push({
        type: 'warning',
        priority: 'medium',
        icon: '⛅',
        title: 'Possible Rain',
        message: `${todayForecast.chanceOfRain}% chance of rain. Consider postponing irrigation until evening.`,
        actions: ['Monitor Weather', 'Plan Accordingly']
      });
    } else if (todayForecast.chanceOfRain < 20 && current.humidity < 40) {
      recommendations.push({
        type: 'success',
        priority: 'low',
        icon: '💧',
        title: 'Good Day for Irrigation',
        message: 'Low rain probability and dry conditions. Ideal time for watering your crops.',
        actions: ['Water Crops', 'Check Soil Moisture']
      });
    }

    // Temperature-based recommendations
    if (current.temp > 35) {
      recommendations.push({
        type: 'alert',
        priority: 'high',
        icon: '🌡️',
        title: 'High Temperature Alert',
        message: `Temperature is ${current.temp}°C. Increase watering frequency and provide shade for sensitive crops.`,
        actions: ['Increase Irrigation', 'Provide Shade']
      });
    } else if (current.temp < 10) {
      recommendations.push({
        type: 'alert',
        priority: 'high',
        icon: '❄️',
        title: 'Cold Temperature Warning',
        message: `Temperature is ${current.temp}°C. Protect sensitive plants from frost damage.`,
        actions: ['Cover Crops', 'Frost Protection']
      });
    } else if (current.temp >= 20 && current.temp <= 30) {
      recommendations.push({
        type: 'success',
        priority: 'low',
        icon: '🌱',
        title: 'Optimal Growing Conditions',
        message: `Temperature is perfect at ${current.temp}°C for most crops. Great conditions for plant growth.`,
        actions: ['Regular Maintenance', 'Monitor Growth']
      });
    }

    // Humidity-based recommendations
    if (current.humidity > 80) {
      recommendations.push({
        type: 'warning',
        priority: 'medium',
        icon: '💨',
        title: 'High Humidity Alert',
        message: `Humidity at ${current.humidity}%. Increased risk of fungal diseases. Ensure good air circulation.`,
        actions: ['Improve Ventilation', 'Monitor for Diseases']
      });
    } else if (current.humidity < 30) {
      recommendations.push({
        type: 'warning',
        priority: 'medium',
        icon: '🏜️',
        title: 'Low Humidity',
        message: `Humidity at ${current.humidity}%. Soil may dry out quickly. Increase irrigation frequency.`,
        actions: ['Water More Frequently', 'Mulch Soil']
      });
    }

    // Wind-based recommendations
    if (current.windSpeed > 40) {
      recommendations.push({
        type: 'alert',
        priority: 'high',
        icon: '💨',
        title: 'Strong Wind Alert',
        message: `Wind speed at ${current.windSpeed} km/h. Secure loose structures and protect young plants.`,
        actions: ['Secure Equipment', 'Stake Plants']
      });
    }

    // UV Index recommendations
    if (current.uv >= 8) {
      recommendations.push({
        type: 'warning',
        priority: 'medium',
        icon: '☀️',
        title: 'High UV Index',
        message: `UV index is ${current.uv}. Provide shade for sensitive crops and protect workers.`,
        actions: ['Shade Sensitive Crops', 'Worker Protection']
      });
    }

    // Multi-day forecast recommendations
    const upcomingRain = weather.forecast.slice(1, 4).filter(day => day.chanceOfRain > 60);
    if (upcomingRain.length >= 2) {
      recommendations.push({
        type: 'warning',
        priority: 'medium',
        icon: '📅',
        title: 'Heavy Rain Expected',
        message: `Rain predicted for ${upcomingRain.length} of the next 3 days. Plan harvest and planting activities accordingly.`,
        actions: ['Plan Harvest', 'Adjust Schedule']
      });
    }

    // Check for extreme weather in forecast
    const extremeTemp = weather.forecast.find(day => day.maxTemp > 38 || day.minTemp < 5);
    if (extremeTemp) {
      recommendations.push({
        type: 'alert',
        priority: 'high',
        icon: '⚠️',
        title: 'Extreme Weather Ahead',
        message: `Extreme temperatures expected on ${extremeTemp.dayName}. Take preventive measures now.`,
        actions: ['Prepare Protection', 'Plan Ahead']
      });
    }

    // If no specific recommendations, provide general advice
    if (recommendations.length === 0) {
      recommendations.push({
        type: 'success',
        priority: 'low',
        icon: '✅',
        title: 'Normal Conditions',
        message: 'Weather conditions are favorable. Continue with regular farming activities.',
        actions: ['Regular Maintenance', 'Monitor Crops']
      });
    }

    return recommendations;
  };

  const getWeatherIcon = (iconUrl, size = 64) => {
    return <img src={`https:${iconUrl}`} alt="weather" width={size} height={size} />;
  };

  const getPriorityStyle = (priority) => {
    switch (priority) {
      case 'high':
        return 'border-red-500 bg-red-50';
      case 'medium':
        return 'border-yellow-500 bg-yellow-50';
      case 'low':
        return 'border-green-500 bg-green-50';
      default:
        return 'border-blue-500 bg-blue-50';
    }
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <Loader className="animate-spin mx-auto mb-4 text-primary-600" size={48} />
            <p className="text-gray-600">Loading weather data...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <AlertTriangle className="mx-auto mb-4 text-red-600" size={48} />
          <p className="text-red-800 font-semibold mb-2">Weather Data Unavailable</p>
          <p className="text-red-600 text-sm">{error}</p>
          <button
            onClick={() => fetchWeatherData(selectedCity)}
            className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!weather) return null;

  const recommendations = getWeatherRecommendations();

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Weather Forecast</h2>
        <p className="text-gray-600 mt-2">Real-time weather data with smart farming recommendations</p>
      </div>

      {/* City Selector */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6 border border-gray-100">
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium text-gray-700">Select City:</label>
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="flex-1 md:flex-none md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none bg-white"
          >
            {cities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
          <button
            onClick={() => fetchWeatherData(selectedCity)}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
          >
            Refresh
          </button>
        </div>
      </div>

      {/* Current Weather Card */}
      <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl shadow-lg p-8 text-white mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-2xl font-bold mb-1">Current Weather</h3>
            <p className="text-blue-100">{weather.city}, {weather.country}</p>
            <p className="text-sm text-blue-200">{weather.localTime}</p>
          </div>
          <div className="text-right">
            {getWeatherIcon(weather.current.icon, 80)}
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-6xl font-bold">{weather.current.temp}°C</span>
              <span className="text-2xl text-blue-100">
                Feels like {weather.current.feelsLike}°C
              </span>
            </div>
            <p className="text-xl text-blue-100">{weather.current.condition}</p>
          </div>
        </div>

        {/* Weather Details Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-blue-400">
          <div className="flex items-center gap-2">
            <Droplets size={20} />
            <div>
              <p className="text-sm text-blue-200">Humidity</p>
              <p className="font-semibold">{weather.current.humidity}%</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Wind size={20} />
            <div>
              <p className="text-sm text-blue-200">Wind</p>
              <p className="font-semibold">{weather.current.windSpeed} km/h {weather.current.windDir}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Eye size={20} />
            <div>
              <p className="text-sm text-blue-200">Visibility</p>
              <p className="font-semibold">{weather.current.visibility} km</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Thermometer size={20} />
            <div>
              <p className="text-sm text-blue-200">Pressure</p>
              <p className="font-semibold">{weather.current.pressure} mb</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Sun size={20} />
            <div>
              <p className="text-sm text-blue-200">UV Index</p>
              <p className="font-semibold">{weather.current.uv}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Cloud size={20} />
            <div>
              <p className="text-sm text-blue-200">Cloud Cover</p>
              <p className="font-semibold">{weather.current.cloudCover}%</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <CloudRain size={20} />
            <div>
              <p className="text-sm text-blue-200">Precipitation</p>
              <p className="font-semibold">{weather.current.precipitation} mm</p>
            </div>
          </div>
        </div>
      </div>

      {/* Smart Farming Recommendations */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
            <CheckCircle className="text-green-600" size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Smart Farming Recommendations</h3>
            <p className="text-sm text-gray-600">Based on current weather conditions</p>
          </div>
        </div>

        <div className="space-y-4">
          {recommendations.map((rec, index) => (
            <div
              key={index}
              className={`border-l-4 ${getPriorityStyle(rec.priority)} rounded-lg p-4`}
            >
              <div className="flex items-start gap-3">
                <span className="text-3xl">{rec.icon}</span>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-bold text-gray-800">{rec.title}</h4>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                      rec.priority === 'high' ? 'bg-red-200 text-red-800' :
                      rec.priority === 'medium' ? 'bg-yellow-200 text-yellow-800' :
                      'bg-green-200 text-green-800'
                    }`}>
                      {rec.priority.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-3">{rec.message}</p>
                  <div className="flex flex-wrap gap-2">
                    {rec.actions.map((action, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700"
                      >
                        ✓ {action}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5-Day Forecast */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h3 className="text-xl font-bold text-gray-800 mb-6">5-Day Forecast</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {weather.forecast.map((day, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4 text-center hover:shadow-md transition-shadow">
              <p className="font-semibold text-gray-800 mb-2">
                {index === 0 ? 'Today' : day.dayName}
              </p>
              <p className="text-xs text-gray-500 mb-3">
                {new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </p>
              <div className="flex justify-center mb-3">
                {getWeatherIcon(day.icon, 48)}
              </div>
              <p className="text-sm font-medium text-gray-700 mb-2">{day.condition}</p>
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-xl font-bold text-gray-800">{day.maxTemp}°</span>
                <span className="text-gray-400">/</span>
                <span className="text-sm text-gray-600">{day.minTemp}°</span>
              </div>
              {day.chanceOfRain > 0 && (
                <div className="flex items-center justify-center gap-1 text-blue-600 text-xs">
                  <CloudRain size={14} />
                  <span>{day.chanceOfRain}%</span>
                </div>
              )}
              <div className="mt-2 pt-2 border-t border-gray-200 text-xs text-gray-600">
                <p>Humidity: {day.avgHumidity}%</p>
                <p>Wind: {day.maxWind} km/h</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;