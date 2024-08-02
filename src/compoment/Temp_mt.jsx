import React from 'react';
import { Box } from '@chakra-ui/react';
import { FaTemperatureHigh } from "react-icons/fa6";
import { TbTemperatureCelsius } from "react-icons/tb";

const Temp_mt = ({ value = 20, max = 150, size = 150, thickness = 7, color = '#08ff00' }) => {
    const radius = (size - thickness) / 2;
    const circumference = 2 * Math.PI * radius;
    const maxAngle = 300; // 300 degrees
    const angle = (value / max) * maxAngle;
    const offset = circumference - (angle / 360) * circumference;

    // Calculate positions for "C" and "H" text
    const cx = size / 2;
    const cy = size / 2;
    const startAngle = 30; // 30 degrees for "C"
    const endAngle = 330; // 330 degrees for "H"
    
    const positionText = (angle) => {
        const radian = (angle * Math.PI) / 180;
        return {
            x: cx + (radius + 10) * Math.cos(radian), // Add 10 to radius for better positioning
            y: cy + (radius + 10) * Math.sin(radian),
        };
    };

    const startPos = positionText(startAngle);
    const endPos = positionText(endAngle);

    return (
        <Box
            bg='none'
            width='10%' // ขนาดของกล่อง
            height='25%' // ขนาดของกล่อง
            position='fixed' // ใช้ fixed position
            top='45%' // ปรับตำแหน่งจากด้านบน
            left='90%' // ปรับตำแหน่งจากด้านซ้าย
            transform='translateX(-50%) rotate(0deg)' // เอียงกล่องที่ -10 องศา
            
            display='flex'
            alignItems='center'
            justifyContent='center'
            border='1px solid #00000'
            borderRadius='5px'
            zIndex='10' // แน่ใจว่า Box อยู่ด้านหน้าสุด
        >
            <svg width={size} height={size} style={{ position: 'relative', display: 'inline-block' }}>
                {/* วงกลมพื้นหลัง */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke={color} // สีที่เข้มขึ้นสำหรับความคืบหน้า
                    strokeWidth={thickness}
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    transform={`rotate(120 ${size / 2} ${size / 2})`} // หมุนให้เริ่มต้นที่ 30 องศา
                    style={{ zIndex: 2 }} // ให้แน่ใจว่าเป็นด้านหน้าสุด
                />
                {/* ข้อความ */}
                <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dy=".3em"
                    fontSize={`${size * 2}%`} // ขนาดของฟอนต์เป็นเปอร์เซ็นต์ของขนาดทั้งหมด
                    fill="#ffffff" // สีขาวสำหรับข้อความ
                    stroke="#000000" // สีดำสำหรับขอบข้อความ
                    strokeWidth="1" // ความหนาของขอบข้อความ
                    style={{ 
                        pointerEvents: 'none', 
                        zIndex: 3, 
                        filter: 'drop-shadow(1px 1px 1px rgba(0, 0, 0, 0.7))', // เงาสีดำที่เบลอ
                        fontFamily: 'DigitalFont' // ใช้ฟอนต์ที่ต้องการ
                    }}
                >
                    <tspan>{value}</tspan> {/* ข้อความหลัก */}
                </text>
                {/* ข้อความ "C" */}
                <text
                    x={startPos.x-130}
                    y={startPos.y+33}
                    textAnchor="middle"
                    fontSize={`${size * 1}%`}
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
                {/* ข้อความ "H" */}
                <text
                    x={endPos.x-10}
                    y={endPos.y+115}
                    textAnchor="middle"
                    fontSize={`${size * 1}%`}
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
            {/* ใช้ไอคอนภายนอก SVG */}
            <FaTemperatureHigh
                style={{
                    position: 'absolute',
                    top: '80%',
                    left: '55%',
                    transform: 'translate(-50%, -50%)',
                    fontSize: `${size * 1}%`, // ขนาดของไอคอน
                    color: '#ffffff',
                    zIndex: 4 // ให้อยู่ด้านบนสุดของข้อความ
                }}
            />
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
    );
};

export default Temp_mt;
