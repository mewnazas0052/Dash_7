import React, { useState, useEffect } from 'react';
import { faCarBattery } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Text } from '@chakra-ui/react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';

function Battery() {
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
        setTimeout(connectWebSocket,100);
      }
    };

    return () => {
      client.close();
    };
  };

  useEffect(() => {
    connectWebSocket();
  }, []);
  return (
    <Box position='fixed' bg='none' left='83%' top='80%' w='10%' h='10%'>
      <FontAwesomeIcon
        icon={faCarBattery}
        className="icon_battery"
        position='relative'
        fontSize="150%"
        color='#ffffff'
        style={{ textShadow: '0 0 10px rgba(255, 255, 255, 0.8)' }}
      />
      <Text fontSize='100%' color='#ffffff' left='50%' position='relative' top='-60%' textShadow="0 0 20px rgba(255, 255, 255, 0.8)"
      style={{ textShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
        fontFamily: 'Orbitron, sans-serif'
         }}
      
      >
        {SOC}   
      %</Text>
    </Box>
  );
}

export default Battery;
