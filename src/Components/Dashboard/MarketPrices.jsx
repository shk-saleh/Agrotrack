import React, { useState } from 'react';
import { Search, Filter, TrendingUp, TrendingDown, Eye } from 'lucide-react';

const MarketPrices = ({ products }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const cities = ['All', 'Karachi', 'Lahore', 'Islamabad', 'Peshawar', 'Quetta', 'Multan', 'Faisalabad'];
  const categories = ['All', 'vegetable', 'fruit', 'grain'];

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity = selectedCity === 'All' || product.city === selectedCity;
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCity && matchesCategory;
  });

  // Get price change
  const getPriceChange = (product) => {
    if (!product.priceHistory || product.priceHistory.length < 2) {
      return { change: 0, percentage: 0 };
    }
    
    const history = product.priceHistory;
    const currentPrice = history[history.length - 1].price;
    const previousPrice = history[history.length - 2].price;
    const change = currentPrice - previousPrice;
    const percentage = ((change / previousPrice) * 100).toFixed(1);
    
    return { change, percentage };
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Market Prices</h2>
        <p className="text-gray-600 mt-2">Real-time prices across different cities</p>
      </div>

      {/* Filters Section */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
            />
          </div>

          {/* City Filter */}
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none bg-white"
          >
            {cities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none bg-white"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat === 'All' ? 'All Categories' : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.length === 0 ? (
          <div className="col-span-full bg-white rounded-xl shadow-sm p-12 text-center border border-gray-100">
            <Filter className="mx-auto mb-3 text-gray-400" size={48} />
            <p className="text-lg font-medium text-gray-600">No products found</p>
            <p className="text-sm text-gray-500 mt-1">Try adjusting your filters</p>
          </div>
        ) : (
          filteredProducts.map((product) => {
            const priceChange = getPriceChange(product);
            return (
              <div key={product.id} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
                {/* Product Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                      <span className="text-primary-700 font-bold text-lg">
                        {product.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800">{product.name}</h3>
                      <p className="text-sm text-gray-500">{product.city}</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-700 capitalize">
                    {product.category}
                  </span>
                </div>

                {/* Price Info */}
                <div className="mb-4">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-3xl font-bold text-gray-800">₨{product.price}</span>
                    <span className="text-gray-500">/ {product.unit}</span>
                  </div>
                  
                  {priceChange.change !== 0 && (
                    <div className={`flex items-center gap-1 ${
                      priceChange.change > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {priceChange.change > 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                      <span className="text-sm font-medium">
                        {priceChange.percentage}% from yesterday
                      </span>
                    </div>
                  )}
                </div>

                {/* Action Button */}
                <button
                  onClick={() => setSelectedProduct(product)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  <Eye size={18} />
                  View Details
                </button>
              </div>
            );
          })
        )}
      </div>

      {/* Results Count */}
      {filteredProducts.length > 0 && (
        <div className="mt-6 text-center text-sm text-gray-600">
          Showing {filteredProducts.length} of {products.length} products
        </div>
      )}
    </div>
  );
};

export default MarketPrices;
