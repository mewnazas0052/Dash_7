import { useState, useEffect } from 'react';
import { Text, Box } from '@chakra-ui/react';
import Status_charge from './Status_charge';
import { GiMovementSensor } from "react-icons/gi";
import React from 'react';

function Triangle() {
  const [text_ODO, settext_ODO] = useState('');
  useEffect(() => {
    const interval = setInterval(() => {
      const random_ODO = Math.floor(Math.random() * 101); // สุ่มค่าจาก 0 ถึง 100
      settext_ODO(random_ODO);
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="Tri_grid">
  <Status_charge />
  <Box className='Box_Lidar' position='fixed' w='3%' h='6%' bg='none' top='87%' left='45%'>
  </Box>
  <Text className="Text_ODO" color='#ffffff' fontSize='100%' fontWeight='400' position='relative' top='30%' left='20%'
    style={{
    fontFamily: 'Orbitron, sans-serif',
    textShadow: '0 0 20px rgba(255, 255, 255, 0.8)'
    
  }}
  >
    ODO: {text_ODO} Km
  </Text>
</div>

  );
}

export default Triangle;
