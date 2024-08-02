import React, { useState, useEffect } from 'react';
import { Box, Text } from '@chakra-ui/react';

function ODO() {
  const [ODO, setODO] = useState('');

  const getRandomNumber = () => {
    const randomNumber = Math.floor(Math.random() * 100) + 1; // สุ่มเลขระหว่าง 1 ถึง 100
    return `ODO: ${randomNumber} Km`; // คืนค่าพร้อมหน่วย Km
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newDistance = getRandomNumber();
      setODO(newDistance);
    }, 1000); // เปลี่ยนค่าเป็นเวลา 1000 มิลลิวินาที (1 วินาที)

    return () => clearInterval(intervalId); // ล้าง interval เมื่อคอมโพเนนต์ถูก unmount
  }, []);

  return (
    <Box
      bg='none'
      width='30%' // ขนาดของกล่อง
      height='10%' // ขนาดของกล่อง
      position='fixed' // ใช้ fixed position
      top='85%' // ปรับตำแหน่งจากด้านบน
      left='85%' // ปรับตำแหน่งจากด้านซ้าย
      transform='translateX(-50%)' // จัดกึ่งกลางในแนวนอน
      display='flex'
      alignItems='center'
      justifyContent='center'
      border='1px solid #00000'
      borderRadius='5px'
    >
      <Text fontSize='200%' fontFamily='Orbitron' color='#FFFFFF'>
        {ODO}
      </Text>
    </Box>
  );
}

export default ODO;
