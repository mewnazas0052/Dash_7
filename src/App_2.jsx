import React from 'react';
import { ChakraProvider, Box, Grid, GridItem } from '@chakra-ui/react';
import Battery_2 from './compoment/Battery_2';
import Mode from './compoment/Mode';
import Box_gear_2 from './compoment/Box_gear_2';
import Status_check_2 from './compoment/Status_check_2';
import Distance from './compoment/Distance';
import Time_logo from './compoment/Time_logo';
import './App.css';
import ArcProgress from './compoment/ArcProgress';
import Arc_2 from './compoment/Arc_2';
import Arc_3 from './compoment/Arc_3';
import Temp_bat from './compoment/Temp_bat';
import Temp_mt from './compoment/Temp_mt';
import ODO from './compoment/ODO';
function App_2({ onSelectApp }) {
  return (
    <ChakraProvider>
      <Box w="100%" h="100vh" display="flex">
        <Box w="100%" h="100%" p={4}>
        
        <Grid w="100%" h="10%" bg="black">
        <GridItem>
          
        </GridItem>
            <Battery_2/>
            <Box_gear_2/>
            <Status_check_2/>
            <Distance/>
            <Time_logo/>
        </Grid>
        
        <Grid
            templateColumns="repeat(1,1fr)"
            gap={1}
            h="90%"
            className="Grid_Background"
            w="100%"
            bg="linear-gradient(to right, #002D2A, #000000 5%, #002D2A, #000000 95%, #002D2A)"
          >
          <ArcProgress/>
          <Arc_2/>
          <Arc_3/>
          <Temp_bat/>
          <Temp_mt/>
          <ODO/>
           <div className='Im_class' >
           <img
                src="/รูปภาพ1.png"
                alt="Example"
                
                style={{
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    width: '100%',
                    height: '100%',
                    opacity: 0.25,
                    pointerEvents: 'none', // ทำให้แน่ใจว่าภาพ overlay ไม่รบกวนการโต้ตอบกับองค์ประกอบอื่น
                    zIndex: 1, // ให้แน่ใจว่าภาพ overlay อยู่ด้านล่างส
                    
                }} /> 
            </div>
            <div className= 'Dark_class'>
            <Mode onSelectApp={onSelectApp} currentMode='dark'/>
            </div>
          </Grid>
        </Box>
      </Box>
    </ChakraProvider>
  );
}

export default App_2;
