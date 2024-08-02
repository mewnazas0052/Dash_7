import React, { useState, useEffect } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';

function Status_box() {
  const [GEAR_all, setGEAR_all] = useState(0);
  const [Rang_convert, setRang_convert] = useState(0); // สร้าง State เพื่อเก็บค่า Range
  const [start_status, setstart_status] = useState(0); // สร้าง State เพื่อเก็บค่าสถานะ

  // เก็บค่าก่อนหน้าไว้เพื่อนำมาใช้งานต่อ
  const [prevGearText, setPrevGearText] = useState('');
  const [prevGearColor, setPrevGearColor] = useState('');

  const connectWebSocket = () => {
    // สร้าง WebSocket client
    const client = new W3CWebSocket('ws://localhost:8888');

    // เมื่อเชื่อมต่อ WebSocket
    client.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    // เมื่อได้รับข้อมูลจาก WebSocket
    client.onmessage = (message) => {
      try {
        const jsonData = JSON.parse(message.data);
        console.log('Received change_status:', jsonData.GEAR_all);
        console.log('Received_rangeValue', jsonData.Rang_convert);

        // กำหนดค่า GEAR_all จากข้อมูลใหม่หรือค่าล่าสุดหากไม่มีข้อมูลใหม่
        setGEAR_all(jsonData.GEAR_all !== undefined ? jsonData.GEAR_all : GEAR_all);
        // กำหนดค่า Rang_convert จากข้อมูลใหม่หรือค่าล่าสุดหากไม่มีข้อมูลใหม่
        setRang_convert(jsonData.Rang_convert !== undefined ? jsonData.Rang_convert : Rang_convert);
        // กำหนดค่า start_status จากข้อมูลใหม่หรือค่าล่าสุดหากไม่มีข้อมูลใหม่
        setstart_status(jsonData.start_status !== undefined ? jsonData.start_status : start_status);

      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    };

    // เมื่อปิดการเชื่อมต่อ WebSocket
    client.onclose = (event) => {
      console.log('Disconnected from WebSocket server', event);
      if (!event.wasClean) {
        console.log('WebSocket connection closed unexpectedly. Retrying...');
        setTimeout(connectWebSocket, 2000);
      }
    };

    // คืนฟังก์ชัน cleanup เพื่อปิดการเชื่อมต่อเมื่อ component ถูก unmount
    return () => {
      client.close();
    };
  }; 

  useEffect(() => {
    connectWebSocket(); // เชื่อมต่อ WebSocket เมื่อ component ถูก mount
  }, []); 

  // Determine the text and color based on GEAR_all
  let gearText, color, options_2;
  if (start_status === 0){
    options_2 = 'OK';
  } else {
    options_2 = 'Field';
  

  if (GEAR_all === 0) {
    gearText = 'N';
    color = '#37F534';
  } else {
    gearText = GEAR_all === 16 ? 'D' : GEAR_all === 20 ? 'R' : '';
    color = gearText === 'D' ? '#F70707' : gearText === 'R' ? '#105BBA' : 'black';
  }
  }
  // Style object to set the color of the text
  const textStyle = {
    color: color,
  };
  // กำหนดค่าให้ gearText และ color ตามเงื่อนไขที่กำหนด

  // เก็บค่าปัจจุบันไว้เพื่อนำมาใช้ในรอบถัดไป
  useEffect(() => {
    setPrevGearText(gearText);
    setPrevGearColor(color);
  }, [gearText, color]);

  return (
    <Box className='Box_status' w='15%' h='30%' borderRadius='10%'>
      <Box className='BoxItem_Gear' bg='#ffffff' borderRadius='20%' position='fixed' w='4%' h='7%'>
        <Box className='BoxItem_Gear_2' bgGradient='linear-gradient(360deg, #0D9288,#000000)' borderRadius='20%' position='fixed' w='3.5%' h='6.4%'>
          <Text className='Text_gear' fontSize='150%' fontWeight='500' style={{
            fontFamily: 'Orbitron, sans-serif',
            textShadow: '0 0 20px rgba(255, 255, 255, 0.8)',
            color: color
          }}>{gearText}</Text>
        </Box>
      </Box>
      <Text className='Rang' fontSize='80%' fontWeight='400' textShadow="0 0 20px rgba(255, 255, 255, 0.8)"
        style={{
          fontFamily: 'Orbitron, sans-serif',
          textShadow: '0 0 20px rgba(255, 255, 255, 0.8)'
        }}
      >Range: {Rang_convert} Km</Text>

      <Text className='Status' fontSize='150%' fontWeight='400' textShadow="0 0 20px rgba(255, 255, 255, 0.8)"
        style={{
          fontFamily: 'Orbitron, sans-serif',
          textShadow: '0 0 20px rgba(255, 255, 255, 0.8)',
        }}
      >{options_2}</Text>
    </Box>
  );
}

export default Status_box;
