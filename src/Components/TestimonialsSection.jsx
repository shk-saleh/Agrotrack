export default function TestimonialsSection() {
  const testimonials = [
    {
      id: 1,
      name: "Cameron Williamson",
      role: "Farmer",
      rating: 5,
      text: "This made today's harvest and payout process soaring — the app helped us immensely.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop"
    },
    {
      id: 2,
      name: "Robert Fox",
      role: "Farmer",
      rating: 5,
      text: "The weather data saved me what could have been a massive crop failure. Highly helpful!",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
    },
    {
      id: 3,
      name: "Dianne Russell",
      role: "Farmer",
      rating: 5,
      text: "Great platform. Helped anticipate market prices and weather, so buying into this for a season.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
    }
  ];

  return (
    <div className="bg-gray-50 py-16 px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <div>
            <span className="bg-green-900 text-white px-4 py-2 rounded-full text-sm font-semibold inline-block mb-4">
              FEEDBACK
            </span>
            <h2 className="text-4xl font-bold text-gray-900">What Farmers Say</h2>
          </div>
          <div className="flex gap-3">
            <button className="w-12 h-12 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition">
              ←
            </button>
            <button className="w-12 h-12 rounded-full bg-green-900 hover:bg-green-800 text-white flex items-center justify-center transition">
              →
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-2"
            >
              {/* Star Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">★</span>
                ))}
                <span className="text-gray-400 ml-2 font-semibold">{testimonial.rating}.0</span>
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-700 mb-6 leading-relaxed">
                {testimonial.text}
              </p>

              {/* User Info */}
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}