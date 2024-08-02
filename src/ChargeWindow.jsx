// ChargeWindow.jsx
import React from 'react';
import { Box,Text,Grid,GridItem,ChakraProvider } from '@chakra-ui/react';
import SOC_2 from './compoment/SOC_2';
import Charging_current from './compoment/Charging current';
import Voltage_2 from './compoment/Voltege_2';
import Power_charge from './compoment/Power_charge';
import Temp_bat_2 from './compoment/Temp_bat_2';
import Status_chrage_2 from './compoment/Status_chrage_2';
const ChargeWindow = () => {
    return (
        <ChakraProvider>
          <Box w="100%" h="100vh" display="flex">
            <Box w="100%" h="100%" p={4}>
            <GridItem>
              
            </GridItem>
            
      
            
            <Grid
                templateColumns="repeat(1,1fr)"
                gap={1}
                h="100%"
                className="Grid_Background"
                w="100%"
                bg="linear-gradient(to right, #002D2A, #000000 5%, #002D2A, #000000 95%, #002D2A)"
              >
              <SOC_2/>
              <Charging_current/>
              <Voltage_2/>
              <Power_charge/>
              <Temp_bat_2/>
              <Status_chrage_2/>
               <div className='Im_class' >
               <img
                    src="/รูปภาพ2.png"
                    alt="Example"
                    
                    style={{
                        position: 'absolute',
                        top: '-20%',
                        left: '10%',
                        width: '80%',
                        height: '150%',
                        opacity: 0.25,
                        pointerEvents: 'none', // ทำให้แน่ใจว่าภาพ overlay ไม่รบกวนการโต้ตอบกับองค์ประกอบอื่น
                        zIndex: 1, // ให้แน่ใจว่าภาพ overlay อยู่ด้านล่างส
                        
                    }} /> 
                </div>
                <div className= 'Dark_class'>
  
                </div>
              </Grid>
            </Box>
          </Box>
        </ChakraProvider>
      );
};

export default ChargeWindow;
