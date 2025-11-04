import TestimonialCard from './TestimonialCard';

const testimonials = [
  { name: "Cameron Williamson", role: "Farmer", text: "The soil analysis service transformed our barren land into fertile ground. Our yield increased by 50%!", initials: "CW", color: "primary" },
  { name: "Robert Fox", role: "Farmer", text: "Switched to smart irrigation—saved 40% water, doubled yield! Incredible ROI.", initials: "RF", color: "green" },
  { name: "Wade Warren", role: "Farmer", text: "Organic transition made easy. Soil health improved, profits up 50%!", initials: "WW", color: "blue" },
];

export default function TestimonialsSection() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">What Farmers Say</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => <TestimonialCard key={i} {...t} />)}
        </div>
      </div>
    </section>
  );
}