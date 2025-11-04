import React from 'react';
import { TrendingUp, Package, DollarSign, MapPin, ArrowUp, ArrowDown } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const StatsOverview = ({ products }) => {
  // Calculate stats
  const calculateStats = () => {
    const total = products.length;
    const avgPrice = products.reduce((acc, p) => acc + parseFloat(p.price || 0), 0) / total || 0;
    const uniqueCities = new Set(products.map(p => p.city));
    const totalValue = products.reduce((acc, p) => acc + parseFloat(p.price || 0), 0);
    
    return {
      totalProducts: total,
      avgPrice: avgPrice.toFixed(2),
      totalCities: uniqueCities.size,
      totalValue: totalValue.toFixed(2)
    };
  };

  const stats = calculateStats();

  // Chart data for categories
  const getCategoryData = () => {
    const categoryCount = {};
    products.forEach(p => {
      categoryCount[p.category] = (categoryCount[p.category] || 0) + 1;
    });
    
    return Object.keys(categoryCount).map(key => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      value: categoryCount[key]
    }));
  };

  // Price trend data (last 7 products)
  const getPriceTrendData = () => {
    return products.slice(0, 7).reverse().map((p, index) => ({
      name: p.name.substring(0, 10),
      price: parseFloat(p.price)
    }));
  };

  // City distribution
  const getCityData = () => {
    const cityCount = {};
    products.forEach(p => {
      cityCount[p.city] = (cityCount[p.city] || 0) + 1;
    });
    
    return Object.keys(cityCount).map(key => ({
      city: key,
      count: cityCount[key]
    })).slice(0, 6);
  };

  const COLORS = ['#16a34a', '#0ea5e9', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

  return (
    <div className="p-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Products */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Package className="text-blue-600" size={24} />
            </div>
            <span className="flex items-center gap-1 text-green-600 text-sm font-medium">
              <ArrowUp size={16} />
              12%
            </span>
          </div>
          <p className="text-gray-600 text-sm mb-1">Total Products</p>
          <p className="text-3xl font-bold text-gray-800">{stats.totalProducts}</p>
        </div>

        {/* Average Price */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="text-green-600" size={24} />
            </div>
            <span className="flex items-center gap-1 text-green-600 text-sm font-medium">
              <ArrowUp size={16} />
              8%
            </span>
          </div>
          <p className="text-gray-600 text-sm mb-1">Average Price</p>
          <p className="text-3xl font-bold text-gray-800">₨{stats.avgPrice}</p>
        </div>

        {/* Cities Covered */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <MapPin className="text-purple-600" size={24} />
            </div>
            <span className="flex items-center gap-1 text-gray-600 text-sm font-medium">
              <ArrowUp size={16} />
              3
            </span>
          </div>
          <p className="text-gray-600 text-sm mb-1">Cities Covered</p>
          <p className="text-3xl font-bold text-gray-800">{stats.totalCities}</p>
        </div>

        {/* Total Value */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="text-orange-600" size={24} />
            </div>
            <span className="flex items-center gap-1 text-green-600 text-sm font-medium">
              <ArrowUp size={16} />
              15%
            </span>
          </div>
          <p className="text-gray-600 text-sm mb-1">Total Inventory Value</p>
          <p className="text-3xl font-bold text-gray-800">₨{stats.totalValue}</p>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Price Trend Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Price Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={getPriceTrendData()}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
                formatter={(value) => [`₨${value}`, 'Price']}
              />
              <Line 
                type="monotone" 
                dataKey="price" 
                stroke="#16a34a" 
                strokeWidth={3}
                dot={{ fill: '#16a34a', r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Category Distribution */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Category Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={getCategoryData()}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {getCategoryData().map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* City Distribution Chart */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Products by City</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={getCityData()}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="city" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
              formatter={(value) => [value, 'Products']}
            />
            <Bar dataKey="count" fill="#16a34a" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Products */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mt-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Products</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Product</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Category</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Price</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">City</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.slice(0, 5).map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium text-gray-800">{product.name}</td>
                  <td className="px-4 py-3">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-700 capitalize">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm font-semibold text-gray-800">₨{product.price}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{product.city}</td>
                  <td className="px-4 py-3">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                      Active
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

export default StatsOverview;
