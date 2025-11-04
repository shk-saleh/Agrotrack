import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Calendar } from 'lucide-react';

const PriceTrends = ({ products }) => {
  const [selectedProduct, setSelectedProduct] = useState(products[0]?.id || '');

  const product = products.find(p => p.id === selectedProduct);

  const formatChartData = (priceHistory) => {
    if (!priceHistory || priceHistory.length === 0) return [];
    
    return priceHistory.map((item, index) => ({
      day: `Day ${index + 1}`,
      price: item.price,
      date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    }));
  };

  const getStats = () => {
    if (!product?.priceHistory || product.priceHistory.length === 0) {
      return { highest: 0, lowest: 0, average: 0, current: 0 };
    }

    const prices = product.priceHistory.map(h => h.price);
    return {
      highest: Math.max(...prices),
      lowest: Math.min(...prices),
      average: (prices.reduce((a, b) => a + b, 0) / prices.length).toFixed(2),
      current: prices[prices.length - 1]
    };
  };

  const stats = getStats();

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Price Trends</h2>
        <p className="text-gray-600 mt-2">Track 7-day price movements for better decisions</p>
      </div>

      {/* Product Selector */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-100">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Product to Analyze
        </label>
        <select
          value={selectedProduct}
          onChange={(e) => setSelectedProduct(e.target.value)}
          className="w-full md:w-96 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none bg-white"
        >
          {products.map(p => (
            <option key={p.id} value={p.id}>
              {p.name} - {p.city} (₨{p.price})
            </option>
          ))}
        </select>
      </div>

      {product && (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <p className="text-gray-600 text-sm mb-1">Current Price</p>
              <p className="text-3xl font-bold text-gray-800">₨{stats.current}</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <p className="text-gray-600 text-sm mb-1">Highest Price</p>
              <p className="text-3xl font-bold text-green-600">₨{stats.highest}</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <p className="text-gray-600 text-sm mb-1">Lowest Price</p>
              <p className="text-3xl font-bold text-red-600">₨{stats.lowest}</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <p className="text-gray-600 text-sm mb-1">Average Price</p>
              <p className="text-3xl font-bold text-blue-600">₨{stats.average}</p>
            </div>
          </div>

          {/* Price Trend Chart */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-800">{product.name} - 7 Day Trend</h3>
                <p className="text-sm text-gray-500 mt-1">{product.city} • {product.category}</p>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar size={18} />
                <span className="text-sm">Last 7 days</span>
              </div>
            </div>

            {product.priceHistory && product.priceHistory.length > 0 ? (
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={formatChartData(product.priceHistory)}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                  <YAxis 
                    label={{ value: 'Price (₨)', angle: -90, position: 'insideLeft' }}
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip 
                    formatter={(value) => [`₨${value}`, 'Price']}
                    labelFormatter={(label) => `Date: ${label}`}
                    contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="price" 
                    stroke="#16a34a" 
                    strokeWidth={3}
                    dot={{ fill: '#16a34a', r: 6 }}
                    activeDot={{ r: 8 }}
                    name="Price"
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <TrendingUp className="mx-auto mb-3 text-gray-400" size={48} />
                <p>No price history available for this product yet.</p>
              </div>
            )}
          </div>

          {/* Insights */}
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-3">💡 Market Insights</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">•</span>
                <span>Best time to sell: When price reaches ₨{stats.highest} or higher</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>Price volatility: {((stats.highest - stats.lowest) / stats.average * 100).toFixed(1)}%</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-600 font-bold">•</span>
                <span>Consider market conditions and seasonal trends before making decisions</span>
              </li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default PriceTrends;
