import React, { useState, useEffect } from 'react';
import { TbRecharging } from 'react-icons/tb';
import { Box } from '@chakra-ui/react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';

function StatusCharge() {
  const [change_status, setChangeStatus] = useState(0);
  const [value, setValue] = useState(0);

  const connectWebSocket = () => {
    const client = new W3CWebSocket('ws://localhost:8888');

    client.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    client.onmessage = (message) => {
      try {
        const jsonData = JSON.parse(message.data);
        console.log('Received change_status:', jsonData.change_status);
        setChangeStatus(jsonData.change_status || 0);
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

  useEffect(() => {
    if (change_status === 4) {
      setValue(1);
    } else {
      setValue(0);
    }
  }, [change_status]);

  return (
    <Box
      className='Box_charge'
      position='fixed'
      w='3%'
      h='5%'
      bg='none'
      top='87%'
      left='35%'
      display={value === 1 ? 'block' : 'none'} // Show Box when value is 1
    >
      <TbRecharging  
        className="icon_charge"
        fontSize="200%"
        color='#00FFC5'
        style={{ textShadow: '0 0 10px rgba(255, 255, 255, 0.5)' }}
      />
    </Box>
  );
}

export default StatusCharge;
