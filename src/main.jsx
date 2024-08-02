import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';        // Default page
import App2 from './App_2.jsx';      // Dark page
import ChargeWindow from './ChargeWindow'; // Charge window page
import './index.css';

const Main = ({ initialApp }) => {
  // ใช้ Local Storage เพื่อเก็บสถานะ
  const savedApp = localStorage.getItem('selectedApp') || 'default';
  const savedWasDark = JSON.parse(localStorage.getItem('wasDark')) || false;

  const [selectedApp, setSelectedApp] = useState(savedApp);
  const [wasDark, setWasDark] = useState(savedWasDark);

  useEffect(() => {
    // บันทึกสถานะใน Local Storage
    localStorage.setItem('selectedApp', selectedApp);
    localStorage.setItem('wasDark', JSON.stringify(wasDark));

    if (initialApp === 1) {
      // ถ้า initialApp เป็น 1, ให้แสดง ChargeWindow
      if (selectedApp === 'dark') {
        setWasDark(true); // เก็บสถานะหน้า dark
      }
      setSelectedApp('charge');
    } else if (initialApp === 0) {
      // เมื่อ initialApp เป็น 0
      if (selectedApp === 'charge') {
        // ถ้าอยู่หน้า charge ให้กลับไปที่หน้า dark (หากเคยอยู่ที่หน้า dark)
        setSelectedApp(wasDark ? 'dark' : 'default');
      }
    }
  }, [initialApp, selectedApp, wasDark]);

  const handleSelectApp = (appName) => {
    // อนุญาตให้เปลี่ยนไปที่หน้า 'default' เท่านั้น
    if (appName === 'default' && selectedApp === 'dark') {
      setSelectedApp('default');
      setWasDark(false);
    } else if (appName === 'dark' && selectedApp === 'default') {
      setSelectedApp('dark');
      setWasDark(true);
    }
  };

  return (
    <React.StrictMode>
      {selectedApp === 'default' && <App onSelectApp={handleSelectApp} />}
      {selectedApp === 'dark' && <App2 onSelectApp={handleSelectApp} />}
      {selectedApp === 'charge' && <ChargeWindow />}
    </React.StrictMode>
  );
};

// ใช้ค่าเริ่มต้นสำหรับการทดสอบ
const initialApp = 1; // เปลี่ยนเป็น 1 เพื่อทดสอบการแสดงหน้า ChargeWindow

ReactDOM.createRoot(document.getElementById('root')).render(
  <Main initialApp={initialApp} />
);
