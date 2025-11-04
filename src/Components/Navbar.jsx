import { Link } from 'react-router-dom';
import { Button } from './Button';

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">A</span>
            </div>
            <span className="text-2xl font-bold text-gray-800">
              Agro<span className="text-primary-600">Track</span>
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <Button to="/login" variant="secondary">Login</Button>
            <Button to="/signup">Get Started</Button>
          </div>
        </div>
      </div>
    </nav>
  );
}