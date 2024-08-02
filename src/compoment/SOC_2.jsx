import React from 'react';
import { Box } from '@chakra-ui/react';

const SOC_2 = ({ value = 50, max = 300, size = 500, thickness = 10, color = '#08ff00' }) => {
    const radius = (size - thickness) / 2;
    const circumference = 2 * Math.PI * radius;
    const maxAngle = 300; // 300 degrees
    const angle = (value / max) * maxAngle;
    const offset = circumference - (angle / 360) * circumference;
  
    // Calculate stroke dasharray for the background circle to cover 300 degrees
    const backgroundDasharray = (300 / 360) * circumference;
    const backgroundDashoffset = circumference - backgroundDasharray;

    return (
        <Box
            bg='none'
            width='50%' // ขนาดของกล่อง
            height='60%' // ขนาดของกล่อง
            position='fixed' // ใช้ fixed position
            top='20%' // ปรับตำแหน่งจากด้านบน
            left='20%' // ปรับตำแหน่งจากด้านซ้าย
            transform='translateX(-50%)' // จัดกึ่งกลางในแนวนอน
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
                    stroke="#e0e0e0" // สีเทาอ่อน
                    strokeWidth={thickness-1}
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={backgroundDashoffset}
                    strokeLinecap="round"
                    transform={`rotate(120 ${size / 2} ${size / 2})`} // หมุนให้เริ่มต้นที่ 30 องศา
                    style={{ 
                        pointerEvents: 'none', 
                        zIndex: 3, 
                        filter: 'drop-shadow(1px 1px 1px rgba(0, 0, 0, 0.7))', // เงาสีดำที่เบลอ
                        fontFamily: 'DigitalFont' // ใช้ฟอนต์ที่ต้องการ
                    }}
                />
                {/* วงกลมแสดงความก้าวหน้า */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke={color} // สีที่เข้มขึ้นสำหรับความคืบหน้า
                    strokeWidth={thickness+2}
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    transform={`rotate(120 ${size / 2} ${size / 2})`} // หมุนให้เริ่มต้นที่ 30 องศา
                    style={{ zIndex: 2 }} // ให้แน่ใจว่าเป็นด้านหน้าสุด
                />
                {/* ข้อความ */}
                <text
                    x="55%"
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
                    <tspan
          x="75%"
          y="46%"
          dy="1.2em"
          fontFamily="Orbitron, sans-serif" // ใช้ฟอนต์ Economica สำหรับ kW
         
          fontSize={`${size * 0.07}%`} // ขนาดฟอนต์สำหรับ kW
        >
          {' %'}
        </tspan>
        <tspan
          x="50%"
          y="70%"
          dy="1.2em"
          fontFamily="Orbitron, sans-serif" // ใช้ฟอนต์ Economica สำหรับ kW
         
          fontSize={`${size * 0.07}%`} // ขนาดฟอนต์สำหรับ kW
        >
          {' Battery'}
        </tspan>
                </text>
            </svg>
        </Box>
    );
};

export default SOC_2;
