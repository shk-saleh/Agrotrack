import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, Package, MapPin, AlertCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const FarmerOverview = ({ products }) => {
  // Calculate stats
  const calculateStats = () => {
    const total = products.length;
    const avgPrice = products.reduce((acc, p) => acc + parseFloat(p.price || 0), 0) / total || 0;
    const uniqueCities = new Set(products.map(p => p.city));
    
    // Calculate trending products
    const trending = products.filter(p => {
      if (p.priceHistory && p.priceHistory.length >= 2) {
        const current = p.priceHistory[p.priceHistory.length - 1].price;
        const previous = p.priceHistory[p.priceHistory.length - 2].price;
        return current > previous;
      }
      return false;
    });

    return {
      totalProducts: total,
      avgPrice: avgPrice.toFixed(2),
      totalCities: uniqueCities.size,
      trendingUp: trending.length
    };
  };

  const stats = calculateStats();

  // Get top products by price
  const getTopProducts = () => {
    return [...products]
      .sort((a, b) => parseFloat(b.price) - parseFloat(a.price))
      .slice(0, 5);
  };

  // Get recent price changes
  const getRecentChanges = () => {
    return products
      .filter(p => p.priceHistory && p.priceHistory.length >= 2)
      .map(p => {
        const current = p.priceHistory[p.priceHistory.length - 1].price;
        const previous = p.priceHistory[p.priceHistory.length - 2].price;
        const change = ((current - previous) / previous * 100).toFixed(1);
        return { ...p, change: parseFloat(change) };
      })
      .slice(0, 6);
  };

  // Chart data for price comparison
  const getPriceComparisonData = () => {
    return products.slice(0, 6).map(p => ({
      name: p.name.substring(0, 8),
      price: parseFloat(p.price),
      city: p.city
    }));
  };

  return (
    <div className="p-8">
      {/* Welcome Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Welcome back, Farmer! 🌾</h2>
        <p className="text-gray-600 mt-2">Here's what's happening with your market today</p>
      </div>

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Products */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Package className="text-blue-600" size={24} />
            </div>
            <span className="text-xs font-medium text-gray-500">Available</span>
          </div>
          <p className="text-gray-600 text-sm mb-1">Total Products</p>
          <p className="text-3xl font-bold text-gray-800">{stats.totalProducts}</p>
        </div>

        {/* Average Market Price */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="text-green-600" size={24} />
            </div>
            <span className="flex items-center gap-1 text-green-600 text-sm font-medium">
              <TrendingUp size={14} />
              5%
            </span>
          </div>
          <p className="text-gray-600 text-sm mb-1">Avg Market Price</p>
          <p className="text-3xl font-bold text-gray-800">₨{stats.avgPrice}</p>
        </div>

        {/* Trending Products */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="text-orange-600" size={24} />
            </div>
            <span className="text-xs font-medium text-orange-600">Hot</span>
          </div>
          <p className="text-gray-600 text-sm mb-1">Trending Up</p>
          <p className="text-3xl font-bold text-gray-800">{stats.trendingUp}</p>
        </div>

        {/* Cities Coverage */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <MapPin className="text-purple-600" size={24} />
            </div>
            <span className="text-xs font-medium text-gray-500">Markets</span>
          </div>
          <p className="text-gray-600 text-sm mb-1">Cities Covered</p>
          <p className="text-3xl font-bold text-gray-800">{stats.totalCities}</p>
        </div>
      </div>

      {/* Market Alerts */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-6 mb-8">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <AlertCircle className="text-amber-600" size={24} />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-800 mb-2">Market Alert 🔔</h3>
            <p className="text-gray-700 mb-3">
              Tomato prices have increased by 15% in Karachi market. Consider selling your harvest soon for maximum profit!
            </p>
            <button className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors text-sm font-medium">
              View Details
            </button>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Price Comparison Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Price Comparison</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={getPriceComparisonData()}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
                formatter={(value) => [`₨${value}`, 'Price']}
              />
              <Bar dataKey="price" fill="#16a34a" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Price Changes */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Price Changes</h3>
          <div className="space-y-4">
            {getRecentChanges().map((product) => (
              <div key={product.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                    <span className="text-primary-700 font-bold text-sm">
                      {product.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{product.name}</p>
                    <p className="text-sm text-gray-500">{product.city}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-800">₨{product.price}</p>
                  <span className={`text-sm font-medium flex items-center gap-1 ${
                    product.change > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {product.change > 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                    {Math.abs(product.change)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Priced Products Table */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-800">Top Priced Products</h3>
          <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
            View All →
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Rank</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Product</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Category</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Price</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">City</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {getTopProducts().map((product, index) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                      index === 0 ? 'bg-yellow-100 text-yellow-700' :
                      index === 1 ? 'bg-gray-100 text-gray-700' :
                      index === 2 ? 'bg-orange-100 text-orange-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {index + 1}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                        <span className="text-primary-700 font-bold">
                          {product.name.charAt(0)}
                        </span>
                      </div>
                      <span className="font-medium text-gray-800">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-700 capitalize">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-lg font-bold text-gray-800">₨{product.price}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{product.city}</td>
                  <td className="px-4 py-3">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                      High Demand
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FarmerOverview;
