import React from 'react';
import { ChakraProvider, Box, Grid, GridItem } from '@chakra-ui/react';
import Triangle from './compoment/Triangle';
import Progess_bar from './compoment/Progess_bar';
import Progess_bar_2 from './compoment/Progess_bar_2';
import Circle from './compoment/Circle';
import Circle_2 from './compoment/Circle_2';
import Triangle_2 from './compoment/Triangle_2';
import Status_box from './compoment/Status_box';
import Temp from './compoment/Temp';
import Battery from './compoment/Battery';
import Mode from './compoment/Mode';
import './App.css';

function App({ onSelectApp }) {
  return (
    <ChakraProvider>
      <Box w="100%" h="100vh" display="flex">
        <Box w="100%" h="100%" p={4}>
          <Grid
            templateColumns="repeat(1,1fr)"
            gap={1}
            h="100%"
            className="Grid_Background"
            w="100%"
            bg="linear-gradient(to right, #000000, #000000 5%, #48E9E9, #000000 95%, #000000)"
          >
            <GridItem bg='none' h="60%" position="relative">
              <Triangle_2 />
            </GridItem>
            <GridItem bg='none' h="150%" top='-50%' position="relative">
              <Progess_bar_2 />
              <Mode onSelectApp={onSelectApp} currentMode='default' />
              <Progess_bar />
              <Status_box />
              <Temp />
              <Battery />
              <Box
                bg='none'
                w="31%"
                h="122%"
                position="absolute"
                display="flex"
                justifyContent="center"
                alignItems="center"
                top='-1%'
                left='7.1%'
                style={{ transform: 'rotate(90deg)' }}
              >
                <div className='Pentagon'></div>
                <Circle />
              </Box>
              <Box
                bg='none'
                w="31%"
                h="122%"
                position="absolute"
                display="flex"
                justifyContent="center"
                alignItems="center"
                left='61%'
                top='-1%'
                style={{ transform: 'rotate(-90deg)' }}
              >
                <div className='Pentagon'></div>
                <Circle_2 />
              </Box>
            </GridItem>
            <GridItem bg='none' h="60%" position="relative" top='40%'>
              <Triangle />
            </GridItem>
          </Grid>
        </Box>
      </Box>
    </ChakraProvider>
  );
}

export default App;
