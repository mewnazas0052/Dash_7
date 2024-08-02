import React from 'react';
import { Box, Text } from '@chakra-ui/react';

function Logo() {
  return (
    <Box className='Box_logo' bg='black' color='white' borderRadius='50%' position='relative'>
      <Text
        position='relative'
        fontSize='250%'
        fontWeight='700'
        fontStyle='italic'
        fontFamily={`'LilyUPC', sans-serif`} // แก้ไข syntax ให้ถูกต้องที่นี่
        bgGradient='linear-gradient(90deg, #6ACBCB,#6ACBCB, #ffff, #6ACBCB, #ffff, #6ACBCB)'
        bgClip='text'
        color='transparent'
        display='inline-block'
        top='20%'
        left='30%'
        style={{
          animation: 'wave 2s linear infinite',
          textShadow: '0 0 20px rgba(255, 255, 255, 0.8)', // เพิ่มเงาสะท้อนแสง
          
        }}
      >
        MERQ
      </Text>
    </Box>
  );
}

export default Logo;
