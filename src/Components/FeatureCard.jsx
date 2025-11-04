export default function FeatureCard({ icon: Icon, title, desc, color }) {
  return (
    <div className={`bg-gradient-to-br from-${color}-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow`}>
      <div className={`w-16 h-16 bg-${color}-100 rounded-lg flex items-center justify-center mb-6`}>
        <Icon className={`text-${color}-600`} size={32} />
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-3">{title}</h3>
      <p className="text-gray-600">{desc}</p>
    </div>
  );
}