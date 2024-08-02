import React, { useState, useEffect } from 'react';
import { Box, Text } from '@chakra-ui/react';

function Distance() {
  const [distance, setDistance] = useState('');

  const getRandomNumber = () => {
    const randomNumber = Math.floor(Math.random() * 100) + 1; // สุ่มเลขระหว่าง 1 ถึง 100
    return `${randomNumber} Km`; // คืนค่าพร้อมหน่วย Km
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newDistance = getRandomNumber();
      setDistance(newDistance);
    }, 1000); // เปลี่ยนค่าเป็นเวลา 1000 มิลลิวินาที (1 วินาที)

    return () => clearInterval(intervalId); // ล้าง interval เมื่อคอมโพเนนต์ถูก unmount
  }, []);

  return (
    <Box
      bg='none'
      width='10%' // ขนาดของกล่อง
      height='5%' // ขนาดของกล่อง
      position='fixed' // ใช้ fixed position
      top='5%' // ปรับตำแหน่งจากด้านบน
      left='25%' // ปรับตำแหน่งจากด้านซ้าย
      transform='translateX(-50%)' // จัดกึ่งกลางในแนวนอน
      display='flex'
      alignItems='center'
      justifyContent='center'
      border='1px solid #00000'
      borderRadius='5px'
    >
      <Text fontSize='250%' fontFamily='DigitalFont' color='#FFFFFF'>
        {distance}
      </Text>
    </Box>
  );
}

export default Distance;
