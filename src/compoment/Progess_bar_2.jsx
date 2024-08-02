import React, { useState, useEffect } from 'react';
import { Progress, Box } from '@chakra-ui/react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';


function Progess_bar_2() {
  const [SOC, setSOC] = useState(0);
  const connectWebSocket = () => {
    const client = new W3CWebSocket('ws://localhost:8888');

    client.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    client.onmessage = (message) => {
      try {
        const jsonData = JSON.parse(message.data);
        console.log('Received change_status:', jsonData.SOC);
        setSOC(jsonData.SOC || 0);
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
  const progressValue = SOC; // กำหนดค่า progressValue จาก SOC
  const numDivisions = 15; // กำหนดจำนวนของพื้นที่แบ่งแยกใน progress bar  
    return (
      <Box className="pentagon-progress-container_2">
        <div className="progress-bar_2">
          {[...Array(numDivisions)].map((_, index) => (
            <div
            key={index}
            className={`progress-section ${90 >= (index + 1) * (100 / numDivisions) ? 'filled' : ''}`}
            style={{ '--progress': `${progressValue}%`, '--hue': `${(index / numDivisions) * 120}` }}
          ></div>
          ))}
        </div>
      </Box>
    );
  }
  
export default Progess_bar_2;