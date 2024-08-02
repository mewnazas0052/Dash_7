import React, { useState, useEffect ,useContext} from 'react';
import { Box } from '@chakra-ui/react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
function ArcGauge({ startAngle = 30, endAngle = 330 }) {
  const [kwh_convert, setkwh_convert] = useState(0); // เริ่มต้นค่า progress ที่ 0
  const radius = 100; // รัศมีของ Gauge
  const centerX = 0;
  const centerY = 0;
  let ws = null;
  
  const connectWebSocket = () => {
    const client = new W3CWebSocket('ws://localhost:8888');

    client.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    client.onmessage = (message) => {
      try {
        const jsonData = JSON.parse(message.data);
        console.log('Received change_status:', jsonData.kwh_convert);
        setkwh_convert(jsonData.kwh_convert || 0);
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    };

    client.onclose = (event) => {
      console.log('Disconnected from WebSocket server', event);
      if (!event.wasClean) {
        console.log('WebSocket connection closed unexpectedly. Retrying...');
        setTimeout(connectWebSocket,2000);
      }
    };

    return () => {
      client.close();
    };
  };

  useEffect(() => {
    connectWebSocket();
  }, []);

  const progressAngle = ((kwh_convert / 100) * (endAngle - startAngle)) + startAngle; // คำนวณ progressAngle จากค่า progress

  // ค่า label ที่ต้องการแสดง
  const dashLabels = ["0", "20", "40", "60", "80", "100"];
  return (
    <Box className='Box_circle' position='relative' backgroundColor='none' w='100%' h='100%'>
    <div className='ArcGauge_1'>
      <svg width="117%" height="117%" viewBox="-150 -150 300 300">
        {/* Background Circle */}
        <circle
          cx={centerX}
          cy={centerY}
          r={115}
          fill="#636363" // สีของวงกลมเงา
          opacity="1" // ความโปร่งแสงของวงกลม
          filter="url(#circleGradient)" // เพิ่มเงาด้วย CSS filter
        />

                  <defs>
              <filter id="textShadow" x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow dx="2" dy="2" stdDeviation="2" floodColor="#000000"/>
              </filter>
            </defs>
            <text
              y={-10}
              textAnchor="middle"
              fill="#FFFFFF"
              fontSize="30"
              fontFamily= 'Orbitron, sans-serif'
              opacity="1"
              transform={`rotate(-90)`}
              filter="url(#textShadow)"
             

            >
              {kwh_convert}
            </text>
            <text
              y={30}
              textAnchor="middle"
              fill="#FFFFFF"
              fontSize="20"
              opacity="1"
              transform={`rotate(-90)`}
              filter="url(#textShadow)"
              fontFamily= 'Orbitron, sans-serif'
            >
              Kw
            </text>
  
        <defs>
          <filter id="text-shadow" x="-50%" y="-50%" width="250%" height="250%">
            <feDropShadow dx="2" dy="2" stdDeviation="2" floodColor="#FFFFFF" floodOpacity="1"/>
          </filter>
        </defs>
        <circle
          cx={centerX}
          cy={centerY}
          r={115}
          fill="url(#circleGradient)" // สีของวงกลมเงา
          opacity="0.8" // ความโปร่งแสงของวงกลม
          filter="url(#shadow)" // เพิ่มเงาด้วย CSS filter
          fontFamily= 'Orbitron, sans-serif'
          
        />
        {/* Filter for Shadow */}
        <defs>
          <linearGradient id="circleGradient" x1="-50%" y1="100%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#000000" stopOpacity="20" />
            <stop offset="100%" stopColor="#000000" stopOpacity="-20" />
          </linearGradient>
          <filter id="shadow" x="-50%" y="-50%" width="250%" height="250%">
            <feOffset in="SourceAlpha" dx="0" dy="4" result="offsetOut" />
            <feGaussianBlur in="offsetOut" stdDeviation="4" result="blurOut" />
            <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
          </filter>
        </defs>
        <linearGradient id="circleGradient_2" x1="1%" y1="1%" x2="0.2%" y2="0.2%">
          <stop offset="0%" stopColor="#1AD3EC" stopOpacity="100" />
          <stop offset="100%" stopColor="#00000" stopOpacity="100" />
        </linearGradient>
        <path
          d={`M ${centerX + radius * Math.cos(startAngle * Math.PI / 180)},${centerY + radius * Math.sin(startAngle * Math.PI / 180)}
              A ${radius},${radius} 0 ${progressAngle > startAngle + 180 ? 1 : 0} 1
              ${centerX + radius * Math.cos(progressAngle * Math.PI / 180)},${centerY + radius * Math.sin(progressAngle * Math.PI / 180)}`} // วาดวงรอบแบบเส้นโค้ง
          fill="none"
          stroke="#ECF0F1"
          strokeWidth={25} // ปรับความหนาของเส้น
          strokeDasharray="10,0.2"
          opacity="0.2" // ความโปร่งแสงของวงกลม
        />
         <path
            d={`M ${centerX},${centerY - radius}
                A ${radius},${radius} 0 1 1 ${centerX - 0.01},${centerY - radius}`} // วาดวงรอบแบบเส้นโค้ง
            fill="none"
            stroke="#DADADA" // สีเทาสำหรับพื้นหลัง
            strokeWidth={4} // ปรับความหนาของเส้น
            strokeDasharray="1"
            transform={`rotate(${1} ${centerX} ${centerY})`}
            
          />
        <line
          x1={centerX + (radius - 5) * Math.cos(startAngle * Math.PI / 180)} // ปรับความยาวของเข็ม
          y1={centerY + (radius - 5) * Math.sin(startAngle * Math.PI / 180)} // ปรับความยาวของเข็ม
          x2={centerX + (radius + 10) * Math.cos(startAngle * Math.PI / 180)} // ปรับความยาวของเข็ม
          y2={centerY + (radius + 10) * Math.sin(startAngle * Math.PI / 180)} // ปรับความยาวของเข็ม
          stroke="#FFFFFF"
          strokeWidth="1"
        />
        {dashLabels.map((label, index) => {
          const angle = startAngle + index * (endAngle - startAngle) / (dashLabels.length - 1);
          const x = centerX + (radius - 20) * Math.cos(angle * Math.PI / 180);
          const y = centerY + (radius - 20) * Math.sin(angle * Math.PI / 180);
          const labelRotation = angle + 90; // เพิ่ม 90 องศาเพื่อให้ label หมุนตรงกับขีด scale
          // สร้างขีด scale ย่อยๆ
          const subScaleX = centerX + (radius - 8) * Math.cos(angle * Math.PI / 180);
          const subScaleY = centerY + (radius - 8) * Math.sin(angle * Math.PI / 180);

          return (
            <g key={index}>
              {/* ขีด scale หลัก */}
              <line
                x1={centerX + (radius - 5) * Math.cos(angle * Math.PI / 180)}
                y1={centerY + (radius - 5) * Math.sin(angle * Math.PI / 180)}
                x2={x}
                y2={y}
                stroke="#FFFFFF"
                strokeWidth="1"
              />
              {/* ขีด scale ย่อย */}
              <line
                x1={centerX + (radius - 1) * Math.cos(angle * Math.PI / 180)}
                y1={centerY + (radius - 1) * Math.sin(angle * Math.PI / 180)}
                x2={subScaleX}
                y2={subScaleY}
                stroke="red"
                strokeWidth="1"
                
              />
               <text
            key={index}
            x={x}
            y={y+5}
            textAnchor="middle"
            fill="#FFFFFF"
            fontSize="12"
            opacity="1"
            transform={`rotate(-90 ${x} ${y})`} // หมุนข้อความในแนวตั้ง
            fontFamily='Orbitron, sans-serif'
        >
       
              <defs>
            <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%"> {/* ปรับขนาดของ filter เพื่อให้มีเงาของ text ทั้งหมด */}
              <feDropShadow dx="0" dy="0" stdDeviation="10" floodColor="rgba(255, 255, 255, 0.8)" /> {/* ปรับการเข้ารหัสของเงาตามต้องการ */}
            </filter>
              </defs>
            {label}
            
        </text>
            </g>
            
          );
        })}
        <line
          x1={centerX + (radius ) * Math.cos(progressAngle * Math.PI / 180)} // ปรับความยาวของเข็ม
          y1={centerY + (radius ) * Math.sin(progressAngle * Math.PI / 180)} // ปรับความยาวของเข็ม
          x2={centerX + (radius + 10) * Math.cos(progressAngle * Math.PI / 180)} // ปรับความยาวของเข็ม
          y2={centerY + (radius + 10) * Math.sin(progressAngle * Math.PI / 180)} // ปรับความยาวของเข็ม
          stroke="red"
          strokeWidth="2"
          strokeLinecap="round"
          strokeOpacity="1" // ความโปร่งแสงของเส้นเป็น 80%
        />
      </svg>
    </div>
    </Box>
  );
}

export default ArcGauge;
