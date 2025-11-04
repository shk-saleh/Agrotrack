import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../Firebase/config';
import toast from 'react-hot-toast';
import FarmerSidebar from './FarmerSidebar';
import FarmerOverview from './FarmerOverview';
import MarketPrices from './MarketPrices';
import PriceTrends from './PriceTrends';
import WeatherWidget from './WeatherWidget';
import SmartAdvice from './SmartAdvice';
import TopBar from './TopBar';
import { useAuth } from '../../Context/AuthContext';

const FarmerView = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const productsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProducts(productsData);
    } catch (error) {
      toast.error('Failed to fetch products');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <FarmerOverview products={products} />;
      case 'market-prices':
        return <MarketPrices products={products} />;
      case 'price-trends':
        return <PriceTrends products={products} />;
      case 'weather':
        return <WeatherWidget />;
      case 'advice':
        return <SmartAdvice products={products} />;
      default:
        return <FarmerOverview products={products} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <FarmerSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <TopBar currentUser={currentUser} />

        {/* Content */}
        <main className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
          ) : (
            renderContent()
          )}
        </main>
      </div>
    </div>
  );
};

export default FarmerView;
