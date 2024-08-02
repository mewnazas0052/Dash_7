import React, { useState, useEffect } from 'react';
import { Box, Text } from '@chakra-ui/react';

function getRandomValue() {
    return Math.floor(Math.random() * 11); // สุ่มค่า 0-10
}

function getRandomStatus() {
    const statuses = ['Charging', 'Discharging'];
    const randomIndex = Math.floor(Math.random() * statuses.length);
    return statuses[randomIndex];
}

function Status_chrage_2() {
    const [chargeTime, setChargeTime] = useState(0);
    const [statusChrage, setStatusChrage] = useState('');

    useEffect(() => {
        const timeInterval = setInterval(() => {
            setChargeTime(getRandomValue());
        }, 1000); // อัพเดตทุก 1 วินาที

        const statusInterval = setInterval(() => {
            setStatusChrage(getRandomStatus());
        }, 2000); // อัพเดตสถานะทุก 2 วินาที

        return () => {
            clearInterval(timeInterval); // ทำความสะอาด interval เมื่อ component ถูก unmount
            clearInterval(statusInterval); // ทำความสะอาด interval เมื่อ component ถูก unmount
        };
    }, []);

    return (
        <Box
            bg='none'
            width='30%'
            height='35%'
            position='fixed'
            top='55%'
            left='77.5%'
            transform='translateX(-50%)'
            display='flex'
            alignItems='center'
            justifyContent='center'
            border='1px solid #FFFFFF'
            borderRadius='5px'
            zIndex='10'
        >
            <Box
                bg='none'
                width='100%'
                height='40%'
                position='fixed'
                top='5%'
                left='50%'
                transform='translateX(-50%)'
                display='flex'
                alignItems='center'
                justifyContent='center'
                border='1px solid #FFFFFF'
                borderRadius='5px'
                zIndex='10'
            >
                <Text color='#FFFFFF' fontFamily='Orbitron, sans-serif' width='100%' fontSize='2xl'>
                    Charging time
                    <span style={{ marginLeft: '5%', color: '#08ff00' }}>{chargeTime} h</span>
                </Text>
            </Box>
            <Box
                bg='none'
                width='100%'
                height='40%'
                position='fixed'
                top='55%'
                left='50%'
                transform='translateX(-50%)'
                display='flex'
                alignItems='center'
                justifyContent='center'
                border='1px solid #FFFFFF'
                borderRadius='5px'
                zIndex='10'
            >
                <Text
                    fontFamily='Orbitron, sans-serif'
                    width='100%' 
                    fontSize='2xl'
                    color='#FFFFFF'
                >
                    Charging Status
                    <span style={{ color: statusChrage === 'Charging' ? '#08ff00' : (statusChrage === 'Discharging' ? '#FF0000' : '#FFFFFF'), marginLeft: '5%' }}>
                    {statusChrage}
                    </span>

                </Text>
            </Box>
        </Box>
    );
}

export default Status_chrage_2;
