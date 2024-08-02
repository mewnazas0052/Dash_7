import React, { useState, useEffect, useContext } from 'react';
import { Box } from '@chakra-ui/react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';

function Circle_2({ startAngle = 30, endAngle = 330 }) {
    
    const radius = 100; // รัศมีของ Gauge
    const centerX = 150;
    const centerY = 150;
    const [speed_rail, setspeed_rail] = useState(0); // เริ่มต้นค่า progress ที่ 0
    let ws = null;

    useEffect(() => {
        const connectWebSocket = () => {
            // เชื่อมต่อ WebSocket server
            ws = new W3CWebSocket('ws://localhost:8888');

            // เมื่อเชื่อมต่อ WebSocket
            ws.onopen = () => {
                console.log('Connected to WebSocket server');
            };

            // เมื่อได้รับข้อมูลจาก WebSocket server
            ws.onmessage = (message) => {
                try {
                    const jsonData = JSON.parse(message.data);
                    console.log('Received change_status:', jsonData.speed_rail);

                    // อัปเดตค่า progress ด้วยค่าที่ได้รับจาก WebSocket server
                    setspeed_rail(jsonData.speed_rail);
                } catch (error) {
                    console.error('Error parsing JSON:', error);
                }
            };

            // เมื่อปิดการเชื่อมต่อ WebSocket
            ws.onclose = (event) => {
                console.log('Disconnected from WebSocket server', event);
                if (!event.wasClean) {
                    console.log('WebSocket connection closed unexpectedly.');
                    console.log('Attempting to reconnect...');
                    // เชื่อมต่อ WebSocket ใหม่
                    connectWebSocket();
                }
            };
        };

        // เรียกใช้ฟังก์ชัน connectWebSocket เพื่อเริ่มต้นการเชื่อมต่อ
        connectWebSocket();

        // คืนฟังก์ชันเพื่อปิด WebSocket connection เมื่อ component unmount
        return () => {
            if (ws) {
                ws.close();
            }
        };
    }, []);

    // ใช้ useEffect เพื่อตรวจสอบสถานะของ WebSocket และอัปเดตค่า speed_rail ทุกๆ 1 วินาที
    useEffect(() => {
      const interval = setInterval(() => {
          if (!ws || ws.readyState !== ws.OPEN) {
              setspeed_rail(0);
          }
      }, 1000);
  
      return () => {
          clearInterval(interval);
      };
  }, [ws]);
    const progressAngle = ((speed_rail || 0) / 260) * (endAngle - startAngle) + startAngle;

    // ใช้ useEffect เพื่อติดตามการเปลี่ยนแปลงใน jsonData.speed_rail
   
    // ค่า label ที่ต้องการแสดง
    const generateLabels = () => {
      const labels = [];
      const range = endAngle - startAngle;
      const increment = 250 / 10; // 260 คือขอบเขตของค่าที่ต้องการแสดง (0-260), 13 คือจำนวน Label ที่ต้องการแสดง

      for (let i = 0; i <= 260; i += increment) {
          const angle = startAngle + (i / 260) * range;

          // คำนวณตำแหน่งของ Label บน Gauge
          const x = centerX + (radius - 20) * Math.cos(angle * Math.PI / 180);
          const y = centerY + (radius - 20) * Math.sin(angle * Math.PI / 180);
          // คำนวณตำแหน่งของขีด scale ย่อย
          const subScaleX = centerX + (radius - 7) * Math.cos(angle * Math.PI / 180); // ลดรัศมีของวงกลมลงเพื่อให้อยู่ภายในวงกลม
          const subScaleY = centerY + (radius - 7) * Math.sin(angle * Math.PI / 180); // ลดรัศมีของวงกลมลงเพื่อให้อยู่ภายในวงกลม
          // เพิ่ม Label เข้าไปใน Array
          labels.push(
            <g key={i}>
            {/* ขีด scale หลัก */}
            <line
                x1={centerX + (radius - 15) * Math.cos(angle * Math.PI / 180)}
                y1={centerY + (radius - 15) * Math.sin(angle * Math.PI / 180)}
                x2={subScaleX}
                y2={subScaleY}
                stroke="#FFFFFF"
                strokeWidth="1"
            />
             <line
                    x1={centerX + (radius - 1) * Math.cos(angle * Math.PI / 180)}
                    y1={centerY + (radius - 1) * Math.sin(angle * Math.PI / 180)}
                    x2={subScaleX}
                    y2={subScaleY}
                    stroke="red"
                    strokeWidth="1"
                />
              <text
                  key={i}
                  x={x}
                  y={y}
                  textAnchor="middle"
                  fill="#FFFFFF"
                  fontSize="12"
                  opacity="1"
                  transform={`rotate(-90 ${x} ${y})`} // หมุนข้อความในแนวตั้ง
                  fontFamily='Orbitron, sans-serif'
                  
                  
              >
                  {Math.round(i)} {/* แสดงค่า Label */}
              </text>
              </g>
          );
      }

      return labels;
  };

    return (
        <Box className='Box_circle' position='relative' backgroundColor='none' w='100%' h='100%'>
            <div className='ArcGauge_2'>
                <svg width="117%" height="117%" viewBox="0 0 300 300">
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
                            <feDropShadow dx="2" dy="2" stdDeviation="2" floodColor="#000000" />
                        </filter>
                    </defs>
                    <text
                        y={-10}
                        textAnchor="middle"
                        fill="#FFFFFF"
                        fontSize="30"
                        opacity="1"
                        transform={`rotate(-90)`}
                        filter="url(#textShadow)"
                        fontFamily='Orbitron, sans-serif'
                    >
                        {speed_rail}
                    </text>
                    <defs>
                        <filter id="textShadow" x="-50%" y="-50%" width="200%" height="200%">
                            <feDropShadow dx="2" dy="2" stdDeviation="2" floodColor="#000000" />
                        </filter>
                    </defs>
                    <text
                        y={30}
                        textAnchor="middle"
                        fill="#FFFFFF"
                        fontSize="20"
                        opacity="1"
                        transform={`rotate(-90)`}
                        filter="url(#textShadow)"
                        fontFamily='Orbitron, sans-serif'
                    >
                        
                    </text>
                    <circle
                        cx={centerX}
                        cy={centerY}
                        r={115}
                        fill="url(#circleGradient)" // สีของวงกลมเงา
                        opacity="0.8" // ความโปร่งแสงของวงกลม
                        filter="url(#shadow)" // เพิ่มเงาด้วย CSS filter
                    />
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

                    {/* Background Arc */}
                    <path
                        d={`M ${centerX},${centerY - radius}
                        A ${radius},${radius} 0 1 1 ${centerX - 0.01},${centerY - radius}`} // วาดวงรอบแบบเส้นโค้ง
                        fill="none"
                        stroke="#DADADA" // สีเทาสำหรับพื้นหลัง
                        strokeWidth={5} // ปรับความหนาของเส้น
                        strokeDasharray="8,0.5"
                    />

                    {/* Progress Arc */}
                    <linearGradient id="circleGradient_2" x1="1%" y1="1%" x2="0.2%" y2="0.2%">
                        <stop offset="0%" stopColor="#1AD3EC" stopOpacity="100" />
                        <stop offset="100%" stopColor="#00000" stopOpacity="100" />
                    </linearGradient>
                    {generateLabels()}
                    
                    <line
                        x1={centerX + (radius + 10) * Math.cos(progressAngle * Math.PI / 180)} // ปรับความยาวของเข็ม
                        y1={centerY + (radius + 10) * Math.sin(progressAngle * Math.PI / 180)} // ปรับความยาวของเข็ม
                        x2={centerX + (radius - 10) * Math.cos(progressAngle * Math.PI / 180)} // ปรับความยาวของเข็ม
                        y2={centerY + (radius - 10) * Math.sin(progressAngle * Math.PI / 180)} // ปรับความยาวของเข็ม
                        stroke="red"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeOpacity="50" // ความโปร่งแสงของเส้นเป็น 80%
                    />
                </svg>
            </div>
        </Box>
    );
}
export default Circle_2;
