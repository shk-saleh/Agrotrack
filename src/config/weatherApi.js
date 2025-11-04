export const WEATHER_API_KEY = '95020a9b59f14fcd831153946240602';
export const WEATHER_API_BASE_URL = 'https://api.weatherapi.com/v1';

export const getWeatherUrl = (city, days = 5) => {
  return `${WEATHER_API_BASE_URL}/forecast.json?key=${WEATHER_API_KEY}&q=${city}&days=${days}&aqi=no`;
};
