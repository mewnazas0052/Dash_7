import React from 'react';
import { Box, Text } from '@chakra-ui/react';

const Charging_current = ({ value = 150, max = 150, size = 200, thickness = 15, color = '#08ff00' }) => {
    const radius = (size - thickness) / 2;
    const circumference = 2 * Math.PI * radius;
    const maxAngle = 360;
    const angle = (value / max) * maxAngle;
    const offset = circumference - (angle / 360) * circumference;

    return (
        <Box
            bg='none'
            width='15%'
            height='35%'
            position='fixed'
            top='18%'
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
                Charging current
            </Text>
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
                <image
                    href="/รูป3.png"
                    x={size / 2 - radius}
                    y={size / 1 - radius}
                    width={radius * 2}
                    height={radius * 1}
                    clipPath="url(#circleClip)"
                    style={{ zIndex: 1 }}
                />

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
                    <tspan
                        fontSize={`${size * 0.3}%`}
                        fill="#08ff00"
                        stroke="none"
                    >
                        {' A'}
                    </tspan>
                </text>
            </svg>
        </Box>
    );
};

export default Charging_current;
