import React, { useState, useEffect } from 'react';
import { Box, Text } from '@chakra-ui/react';

function Box_gear_2() {
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const letters = ['R', 'N', 'D'];
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * letters.length);
      setSelected(letters[randomIndex]);
    }, 1000); // สุ่มทุกๆ 1 วินาที

    return () => clearInterval(interval); // ล้าง interval เมื่อ component ถูก unmount
  }, []);

  return (
    <Box
      bg='none'
      width='10%' // ขนาดของกล่อง
      height='5%' // ขนาดของกล่อง
      position='fixed' // ใช้ fixed position
      top='5%' // ปรับตำแหน่งจากด้านบน
      left='50%' // ปรับตำแหน่งจากด้านซ้าย
      transform='translateX(-50%)' // จัดกึ่งกลางในแนวนอน
      display='flex'
      alignItems='center'
      justifyContent='center'
      border='1px solid #00000'
      borderRadius='5px'
    >
      <Box
        bg='none'
        width='33%'
        height='100%'
        boxShadow='none'
        textAlign='center'
        display='flex'
        alignItems='center'
        justifyContent='center'
      >
        <Text fontSize={selected === 'R' ? '4xl' : 'md'} color={selected === 'R' ? '#48E9E9' : '#ffffff' }>
          R
        </Text>
      </Box>
      <Box
        bg='none'
        width='33%'
        height='100%'
        boxShadow='none'
        textAlign='center'
        display='flex'
        alignItems='center'
        justifyContent='center'
      >
        <Text fontSize={selected === 'N' ? '4xl' : 'md'} color={selected === 'N' ? '#48E9E9' : '#ffffff'}>
          N
        </Text>
      </Box>
      <Box
        width='33%'
        height='100%'
        boxShadow='none'
        textAlign='center'
        display='flex'
        alignItems='center'
        justifyContent='center'
      >
        <Text fontSize={selected === 'D' ? '4xl' : 'md'} color={selected === 'D' ? '#48E9E9' : '#ffffff'}>
          D
        </Text>
      </Box>
    </Box>
  );
}

export default Box_gear_2;
