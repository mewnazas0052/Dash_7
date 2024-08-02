import React from 'react'
import { Text,Box } from '@chakra-ui/react'
function Status_check_2() {
  return (
    <Box 
      bg='none'
      width='5%' // ขนาดของกล่อง
      height='5%' // ขนาดของกล่อง
      position='fixed' // ใช้ fixed position
      top='5%' // ปรับตำแหน่งจากด้านบน
      left='15%' // ปรับตำแหน่งจากด้านซ้าย
      transform='translateX(-50%)' // จัดกึ่งกลางในแนวนอน
      display='flex'
      alignItems='center'
      justifyContent='center'
      border='1px solid #00000'
      borderRadius='5px'
    >
    <Text  fontSize='250%' fontFamily= 'DigitalFont' color='#00fa41'>
       OK
    </Text>
    </Box>
  )
}

export default Status_check_2