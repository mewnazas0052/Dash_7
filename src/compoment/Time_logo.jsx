import React, { useState, useEffect } from 'react';
import {Box,Text,Grid} from '@chakra-ui/react'

function Time_logo() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const updateCurrentTime = () => {
      setCurrentTime(new Date());
    };

    const intervalId = setInterval(updateCurrentTime, 1000); // อัปเดตเวลาในทุก ๆ วินาที

    return () => clearInterval(intervalId); // ล้าง interval เมื่อ component ถูก unmount
  }, []);

  const formatTime = (date) => {
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // เปลี่ยน 0 เป็น 12
    const strHours = String(hours).padStart(2, '0');
    return `${strHours}:${minutes} ${ampm}`;
  };

  return (
    <Grid>
            <Box
      bg='none'
      width='10%' // ขนาดของกล่อง
      height='5%' // ขนาดของกล่อง
      position='fixed' // ใช้ fixed position
      top='5%' // ปรับตำแหน่งจากด้านบน
      left='80%' // ปรับตำแหน่งจากด้านซ้าย
      transform='translateX(-50%)' // จัดกึ่งกลางในแนวนอน
      display='flex'
      alignItems='center'
      justifyContent='center'
      border='1px solid #000000'
      borderRadius='5px'
    >
      <Text fontSize='150%' color='#FFFFFF'>
        {formatTime(currentTime)}
      </Text>
      </Box>
      <Box
      bg='none'
      width='12%' // ขนาดของกล่อง
      height='5%' // ขนาดของกล่อง
      position='fixed' // ใช้ fixed position
      top='5%' // ปรับตำแหน่งจากด้านบน
      left='92%' // ปรับตำแหน่งจากด้านซ้าย
      transform='translateX(-50%)' // จัดกึ่งกลางในแนวนอน
      display='flex'
      alignItems='center'
      justifyContent='center'
      border='1px solid #000000'
      borderRadius='5px'
    >
      <Text
        fontSize='300%'
        fontFamily={`'LilyUPC', sans-serif`} // แก้ไข syntax ให้ถูกต้องที่นี่
        fontWeight="bold"
        color="#ffffff"
        className="text-stroke"
        textShadow="2px 2px 4px #7EFFE8"
        transform="skew(-10deg)" // ทำให้ตัวหนังสือเอียง
      >
    MERCURY
      </Text>
      </Box>
    </Grid>

  );
}

export default Time_logo;
