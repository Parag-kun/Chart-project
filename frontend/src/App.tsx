import './App.css';
import { useEffect, useState } from 'react';
import { CSVLink } from 'react-csv';

import BarGraph from './components/BarGraph';
import PieChart from './components/PieChart';
import { CloudBody, StockBody } from './custom-types';

function App() {
  const [wsClient, setWsClient] = useState<WebSocket | null>(null);
  const [cloudData, setCloudData] = useState<CloudBody[]>([]); 
  const [stockData, setStockData] = useState<StockBody[]>([]); 

  useEffect(() => {
      fetch('http://localhost:4000/cloud')
          .then(raw => raw.json())
          .then(res => {
              const { success, data } = res;

              if (success) {
                  setCloudData(data);
              }
          });
      
      fetch('http://localhost:4000/stock')
          .then(raw => raw.json())
          .then(res => {
              const { success, data } = res;

              if (success) {
                  setStockData(data);
              }
          });

      setWsClient(new WebSocket('ws://localhost:4000'));

      return () => wsClient?.close();
  }, []);

  if (wsClient) {
    wsClient.onmessage = (message) => {
      const { newStocks, newClouds } = JSON.parse(message.data);
      setCloudData(newClouds);
      setStockData(newStocks);
    };

    wsClient.onclose = () => wsClient.close();
    wsClient.onerror = err => console.error(err);
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', height: '100vh', flexWrap: 'wrap' }}>
      <div style={{ width: '600px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
        <BarGraph data={stockData} />
        <div style={{ fontSize: 28, color: 'gray' }}>Stock Distribution</div>
        <button style={{ padding: '12px 18px', textDecoration: 'none', border: 'none' }}>
          <CSVLink style={{ textDecoration: 'none', color: 'black', fontWeight: '500' }} data={stockData}>EXPORT TO SHEET</CSVLink>
        </button>
      </div>      
      <div style={{ width: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
        <PieChart data={cloudData} />
        <div style={{ fontSize: 28, color: 'gray' }}>Cloud Distribution</div>
        <button style={{ padding: '12px 18px', textDecoration: 'none', border: 'none' }}>
          <CSVLink style={{ textDecoration: 'none', color: 'black', fontWeight: '500' }} data={cloudData}>EXPORT TO SHEET</CSVLink>
        </button>
      </div>
    </div>
  );
};

export default App;
