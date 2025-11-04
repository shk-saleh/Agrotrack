export default function FooterSection() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">A</span>
              </div>
              <span className="text-xl font-bold text-white">AgroTrack</span>
            </div>
            <p className="text-sm">
              Empowering farmers with technology, expertise, and eco-friendly practices.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">About Us</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">Our Story</a></li>
              <li><a href="#" className="hover:text-white">Key Features</a></li>
              <li><a href="#" className="hover:text-white">Testimonial</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">Mobile Engine</a></li>
              <li><a href="#" className="hover:text-white">Self Support</a></li>
              <li><a href="#" className="hover:text-white">Soil Testing</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>Email: info@agrotrack.com</li>
              <li>Phone: +92 300 1234567</li>
              <li>Address: Karachi, Pakistan</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; 2025 AgroTrack. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}