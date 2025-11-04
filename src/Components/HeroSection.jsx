import { Button } from './Button';
import StatsCard from './StatsCard';

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-primary-50 to-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Eco-Friendly Farming, Exceptional Harvests
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Empowering Farmers with Technology, Expertise, and Eco-Friendly Practices.
            </p>
            <div className="flex gap-4">
              <Button to="/signup" className="text-lg px-8 py-4">
                Explore Our Solutions
              </Button>
              <Button variant="secondary" className="text-lg px-8 py-4">
                Get a Free Consultation
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-br from-primary-400 to-primary-600 rounded-3xl p-8 shadow-2xl">
              <StatsCard />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}