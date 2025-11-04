import { Link } from 'react-router-dom';

export function Button({ children, variant = "primary", to, ...props }) {
  const base = "px-6 py-3 rounded-lg font-medium transition-all";
  const variants = {
    primary: "bg-primary-600 text-white hover:bg-primary-700",
    secondary: "border-2 border-primary-600 text-primary-600 hover:bg-primary-50",
    white: "bg-white text-primary-600 hover:bg-gray-100"
  };

  return to ? (
    <Link to={to} className={`${base} ${variants[variant]}`} {...props}>
      {children}
    </Link>
  ) : (
    <button className={`${base} ${variants[variant]}`} {...props}>
      {children}
    </button>
  );
}