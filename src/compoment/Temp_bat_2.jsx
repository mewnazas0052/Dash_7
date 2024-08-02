import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { LiaTemperatureHighSolid } from "react-icons/lia";
import { TbTemperatureCelsius } from "react-icons/tb";
const Temp_bat_2 = ({ value = 150, max = 150, size = 200, thickness = 15, color = '#08ff00' }) => {
    const radius = (size - thickness) / 2;
    const circumference = 2 * Math.PI * radius;
    const maxAngle = 300;
    const angle = (value / max) * maxAngle;
    const offset = circumference - (angle / 360) * circumference;
    const startPos = { x: size / 2, y: size / 2 };

    return (
        <Box
            bg='none'
            width='15%'
            height='35%'
            position='fixed'
            top='55%'
            left='55%'
            transform='translateX(-50%)'
            display='flex'
            alignItems='center'
            justifyContent='center'
            border='1px solid #FFFFFF'
            borderRadius='5px'
            zIndex='10'
            flexDirection='column'
        >
            <Text
                color='#FFFFFF'
                fontSize='150%'
                mb={2}
                textAlign='center'
                fontFamily='Orbitron, sans-serif'
            >
                Battery Temp
            </Text>
            <Box position="relative" width={size} height={size}>
                <svg width={size} height={size} style={{ position: 'relative', display: 'inline-block' }}>
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        stroke={color}
                        strokeWidth={thickness}
                        fill="none"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        strokeLinecap="round"
                        transform={`rotate(120 ${size / 2} ${size / 2})`}
                        style={{ zIndex: 2 }}
                    />
                    <clipPath id="circleClip">
                        <circle cx={size / 2} cy={size / 2} r={radius} />
                    </clipPath>
                    <text
                        x="50%"
                        y="50%"
                        textAnchor="middle"
                        dy=".3em"
                        fontSize={`${size * 0.2}px`}
                        fill="#ffffff"
                        stroke="#000000"
                        strokeWidth="1"
                        style={{ 
                            pointerEvents: 'none', 
                            zIndex: 3, 
                            filter: 'drop-shadow(1px 1px 1px rgba(0, 0, 0, 0.7))',
                            fontFamily: 'Orbitron, sans-serif'
                        }}
                    >
                        {value}
                    </text>
                    <text
                        x={startPos.x -90}
                        y={startPos.y + 90}  // Adjusted position
                        textAnchor="middle"
                        fontSize={`${size * 1}%`}  // Adjusted size
                        fill="#ffffff"
                        stroke="#000000"
                        strokeWidth="0.5"
                        style={{ 
                            pointerEvents: 'none', 
                            zIndex: 3, 
                            filter: 'drop-shadow(1px 1px 1px rgba(0, 0, 0, 0.7))', 
                            fontFamily: 'DigitalFont'
                        }}
                    >
                        C
                    </text>
                    <text
                        x={startPos.x +90}
                        y={startPos.y + 90}  // Adjusted position
                        textAnchor="middle"
                        fontSize={`${size * 1}%`}  // Adjusted size
                        fill="#ffffff"
                        stroke="#000000"
                        strokeWidth="0.5"
                        style={{ 
                            pointerEvents: 'none', 
                            zIndex: 3, 
                            filter: 'drop-shadow(1px 1px 1px rgba(0, 0, 0, 0.7))', 
                            fontFamily: 'DigitalFont'
                        }}
                    >
                        H
                    </text>
                </svg>
                <TbTemperatureCelsius 
            style={{
                    position: 'absolute',
                    top: '30%',
                    left: '60%',
                    transform: 'translate(-50%, -50%)',
                    fontSize: `${size * 1}%`, // ขนาดของไอคอน
                    color: '#ffffff',
                    zIndex: 4 // ให้อยู่ด้านบนสุดของข้อความ
                }}
                />
            </Box>
        </Box>
    );
};

export default Temp_bat_2;
