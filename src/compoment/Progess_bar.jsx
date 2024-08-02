import React, { useState, useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';

function Progess_bar() {
  const [Temp, setTemp] = useState(0);

  const connectWebSocket = () => {
    const client = new W3CWebSocket('ws://localhost:8888');

    client.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    client.onmessage = (message) => {
      try {
        const jsonData = JSON.parse(message.data);
        console.log('Received change_status:', jsonData.Temp);
        setTemp(jsonData.Temp || 0);
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    };

    client.onclose = (event) => {
      console.log('Disconnected from WebSocket server', event);
      if (!event.wasClean) {
        console.log('WebSocket connection closed unexpectedly. Retrying...');
        setTimeout(connectWebSocket, 2000);
      }
    };

    return () => {
      client.close();
    };
  };

  useEffect(() => {
    connectWebSocket();

    // Cleanup function for useEffect
    return () => {
      // Close WebSocket connection when component unmounts
      // No need to implement if you intend to keep WebSocket open throughout
    };
  }, []); // Only run connectWebSocket on mount

  const progressValue = Temp >= 0 && Temp <= 100 ? Temp : 0; // Ensure progressValue is within 0-100
  const numDivisions = 15; // Number of sections in the progress bar

  return (
    <Box className="pentagon-progress-container">
      <div className="progress-bar_2">
        {[...Array(numDivisions)].map((_, index) => (
          <div
            key={index}
            className={`progress-section_2 ${90 >= (index + 1) * (100 / numDivisions) ? 'filled' : ''}`}
            style={{ '--progress': `${90}%`, '--hue': `${(index / numDivisions) * 120}` }}
          ></div>
        ))}
      </div>
    </Box>
  );
}

export default Progess_bar;
