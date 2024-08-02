import React, { useState, useEffect } from "react";
import { WiCelsius } from "react-icons/wi";
import { Box, Text } from '@chakra-ui/react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';

function Temp() {
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

    return (
        <Box className='Box_temp' color='#ffffff'  position='fixed' top='80%' left='8%' bg='none' w='10% '>
          <Text className='Text_temp' fontSize='100%' position='relative' textShadow="0 0 20px rgba(255, 255, 255, 0.5)"
          left='1%'
            style={{
              fontFamily: 'Orbitron, sans-serif',
  }}
          >
          {Temp}
          <WiCelsius  style={{ textShadow: '0 0 20px rgba(255, 255, 255, 0.8)',
           marginTop:'-40%',
           left: '30%', // ตำแหน่งด้านซ้ายจากขอบซ้ายของหน้าต่าง
           fontSize: '250%', // ปรับขนาดตัวอักษร
           position:'relative'
           }}/>
          </Text> 
         
        </Box>
    );
}

export default Temp;
