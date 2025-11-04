import { TrendingUp, Cloud, Users, BarChart3, MessageCircle, Shield } from 'lucide-react';
import FeatureCard from './FeatureCard';

const features = [
  { icon: Users, title: "Expert Support", desc: "24/7 Access to agronomists and farming specialists.", color: "green" },
  { icon: TrendingUp, title: "Real-Time Market Prices", desc: "Stay updated with daily fruit & vegetable prices across cities.", color: "primary" },
  { icon: Cloud, title: "Weather Forecasts", desc: "Get real-time weather conditions and forecasts for your region.", color: "blue" },
  { icon: BarChart3, title: "Price Trends & Analytics", desc: "View 7-day price trends and make informed selling decisions.", color: "yellow" },
  { icon: MessageCircle, title: "Community Forum", desc: "Connect, post, and share ideas in our dedicated farmer forum.", color: "purple" },
  { icon: Shield, title: "Smart AI Advice", desc: "Receive personalized farming advice based on weather and market data.", color: "red" },
];

export default function FeaturesSection() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Our Agrotiye?</h2>
          <p className="text-xl text-gray-600">
            With over 10 years of experience, Agrotiye is dedicated to revolutionizing agriculture.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <FeatureCard key={i} {...f} />
          ))}
        </div>
      </div>
    </section>
  );
}