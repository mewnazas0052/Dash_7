import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt } from '@fortawesome/free-solid-svg-icons';

const Voltage_2 = ({ value = 150, max = 403, size = 200, thickness = 15, color = '#08ff00' }) => {
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
            left='70%'
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
                Voltage
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
                        <tspan
                            fontSize={`${size * 0.3}%`}
                            fill="#08ff00"
                            stroke="none"
                        >
                            {'V'}
                        </tspan>
                    </text>
                </svg>
                <Box
                    position="absolute"
                    top="75%"
                    left="50%"
                    transform="translate(-50%, -50%)"
                    width={radius * 1.5} // Adjust this to change the icon size
                    height={radius * 1.5} // Adjust this to change the icon size
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    clipPath="url(#circleClip)"
                >
                    <FontAwesomeIcon icon={faBolt} color="#FFFFFF" style={{ fontSize: '200%' }} />
                    </Box>
            </Box>
        </Box>
    );
};

export default Voltage_2;
