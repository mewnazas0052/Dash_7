import React from 'react';
import { Button, Menu, MenuButton, MenuList, MenuItemOption, MenuOptionGroup } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { Box } from '@chakra-ui/react';

const Mode = ({ onSelectApp, currentMode }) => {
  const handleMenuItemClick = (value) => {
    onSelectApp(value);
  };

  return (
    <Box
      bg='none'
      width='10%' // ขนาดของกล่อง
      height='5%' // ขนาดของกล่อง
      position='fixed' // ใช้ fixed position
      top='30%' // ปรับตำแหน่งจากด้านบน
      left='5%' // ปรับตำแหน่งจากด้านซ้าย
      transform='translateX(-50%)' // จัดกึ่งกลางในแนวนอน
      display='flex'
      alignItems='center'
      justifyContent='center'
      border='1px solid #00000'
      borderRadius='5px'
      zIndex={9999} // ตั้งค่า z-index ให้สูงสุด
    >
      <div className='mode_button_container' style={{ position: 'relative', display: 'inline-block', zIndex: 10000 }}>
        {/* วงกลมรอบนอก */}
        <div style={{
          position: 'absolute',
          width: '120%',
          height: '120%',
          borderRadius: '50%',
          border: '3px solid rgba(128, 128, 128, 0.7)',
          backgroundColor: 'transparent',
          top: '-5px',
          left: '-5px',
          zIndex: 1
        }}></div>

        {/* ปุ่ม */}
        <Menu>
          <MenuButton
            as={Button}
            borderRadius='50%'
            width='50px'
            height='50px'
            bg='#929292'
            border='1px solid rgba(128, 128, 128, 0.5)'
            _hover={{ 
              bg: 'white',
              borderColor: 'rgba(128, 128, 128, 0.7)'
            }}
            _active={{ 
              bg: 'white',
              borderColor: 'rgba(128, 128, 128, 0.8)'
            }}
            variant='solid'
            style={{ position: 'relative', zIndex: 10001 }} // ปุ่มต้องอยู่ด้านหน้าสุด
          >
            <FontAwesomeIcon
              icon={faEllipsis}
              style={{
                fontSize: '30px',
                color: 'black',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
              }}
            />
          </MenuButton>
          <MenuList minWidth='240px' bg='rgba(0, 0, 0, 0.8)' color='white'>
            <MenuOptionGroup defaultValue={currentMode} title='Mode' type='radio'>
              <MenuItemOption
                value='default'
                bg='black'
                _hover={{ bg: 'rgba(255, 255, 255, 0.1)' }}
                _active={{ 
                  bg: 'white',
                  borderColor: 'rgba(128, 128, 128, 0.8)'
                }}
                onClick={() => handleMenuItemClick('default')}
              >
                Default
              </MenuItemOption>
              <MenuItemOption
                value='dark'
                bg='black'
                _hover={{ bg: 'rgba(255, 255, 255, 0.1)' }}
                _active={{ 
                  bg: 'white',
                  borderColor: 'rgba(128, 128, 128, 0.8)'
                }}
                onClick={() => handleMenuItemClick('dark')}
              >
                Dark
              </MenuItemOption>
            </MenuOptionGroup>
          </MenuList>
        </Menu>
      </div>
    </Box>
  );
};

export default Mode;
