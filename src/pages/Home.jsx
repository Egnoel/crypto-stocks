import React, { useEffect, useState } from 'react';
import { fetchCoins } from '../api/coinGecko';
import { CryptoCard } from '../components/CryptoCard';

export const Home = () => {
  const [cryptList, setCryptList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const getCryptoData = async () => {
    try {
      const data = await fetchCoins();
      setCryptList(data);
    } catch (error) {
      console.error('Error fetching crypto data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCryptoData();
  }, []);

  return (
    <div className="app">
      <div className="controls">
        <div className="filter-group"></div>
        <div className="view-toggle">
          <button
            className={viewMode === 'grid' ? 'active' : ''}
            onClick={() => setViewMode('grid')}
          >
            Grid
          </button>
          <button
            className={viewMode === 'list' ? 'active' : ''}
            onClick={() => setViewMode('list')}
          >
            List
          </button>
        </div>
      </div>
      {isLoading ? (
        <div className="loading">
          <div className="spinner" />
          <p>Loading Crypto Data...</p>
        </div>
      ) : (
        <div className={`crypto-container ${viewMode}`}>
          {cryptList.map((crypto, key) => (
            <CryptoCard key={key} crypto={crypto} />
          ))}
        </div>
      )}
    </div>
  );
};
