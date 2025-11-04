export default function HeroSection() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-6 bg-white/95 shadow-sm">
        <div className="text-2xl font-bold text-green-900">
          Agro<span className="text-green-600">Track</span>
        </div>
        <ul className="hidden md:flex gap-8">
          <li>
            <a
              href="#home"
              className="text-gray-700 hover:text-green-600 font-medium transition"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#features"
              className="text-gray-700 hover:text-green-600 font-medium transition"
            >
              Features
            </a>
          </li>
          <li>
            <a
              href="#service"
              className="text-gray-700 hover:text-green-600 font-medium transition"
            >
              Service
            </a>
          </li>
          <li>
            <a
              href="#testimonial"
              className="text-gray-700 hover:text-green-600 font-medium transition"
            >
              Testimonial
            </a>
          </li>
          <li>
            <a
              href="#faq"
              className="text-gray-700 hover:text-green-600 font-medium transition"
            >
              FAQ
            </a>
          </li>
        </ul>
        <button className="bg-green-900 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-800 transition flex items-center gap-2">
          Get Started <span>→</span>
        </button>
      </nav>

      {/* Hero Content */}
      <section className="text-center px-8 py-24 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          Empowering Farmers with Real-Time Market & Weather Insights
        </h1>
        <p className="text-lg text-gray-600 mb-10 leading-relaxed">
          Get real-time crop prices, weather forecasting, and expert farming
          advice — right at your fingertips.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="bg-green-900 text-white px-8 py-4 rounded-full font-semibold hover:bg-green-800 transition transform hover:-translate-y-1 hover:shadow-lg flex items-center gap-2">
            Explore Our Solutions <span>→</span>
          </button>
          <button className="bg-white text-green-600 px-8 py-4 rounded-full font-semibold border-2 border-gray-200 hover:border-green-600 transition transform hover:-translate-y-1 hover:shadow-lg flex items-center gap-2">
            Get a Free Consultation <span>✓</span>
          </button>
        </div>
      </section>
    </div>
  );
}
