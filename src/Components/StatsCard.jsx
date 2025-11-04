import { TrendingUp } from 'lucide-react';

export default function StatsCard() {
  return (
    <div className="bg-white rounded-2xl p-6 space-y-4 shadow-lg">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-primary-50 rounded-lg p-4">
          <div className="text-3xl font-bold text-primary-700">50+</div>
          <div className="text-sm text-gray-600">Products Tracked</div>
        </div>
        <div className="bg-green-50 rounded-lg p-4">
          <div className="text-3xl font-bold text-green-700">7</div>
          <div className="text-sm text-gray-600">Cities Covered</div>
        </div>
      </div>
      <div className="bg-blue-50 rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Market Activity</span>
          <TrendingUp className="text-blue-600" size={20} />
        </div>
        <div className="h-2 bg-blue-200 rounded-full">
          <div className="h-full w-3/4 bg-blue-600 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}