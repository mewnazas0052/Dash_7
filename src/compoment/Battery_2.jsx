import {useState,React} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt } from '@fortawesome/free-solid-svg-icons'; // นำเข้าจาก 'free-solid-svg-icons'
import { Progress,Text,Box} from '@chakra-ui/react'
function Battery_2() {
    const [charge, setCharge] = useState(100);
    return (
        <Box>
        <div style={{ width: '5%', height: '55%', position: 'relative', backgroundColor: '#000', borderRadius: '5px', border: '2px solid #fff', display: 'inline-block', 
        top:'20%', left:'1%' }}>
          <div style={{ width: '10%', height: '50%', backgroundColor: '#fff', position: 'relative', right: '-100%', top: '25%', borderRadius: '2px' }}></div>
          <div style={{ width: `${charge}%`, height: '100%', backgroundColor: '#18F656', borderRadius: '3px' ,top: '-50%',position:'relative'}}>
          </div>
          <div className='faBolt_class_2' ><FontAwesomeIcon  icon={faBolt} style={{position:'relative', left:'40%'}}  color='#ffffff'/></div>
          <svg viewBox="0 0 100 100" style={{ position: 'relative', top: '15%', left: '25%', width: '50%', height: '50%' }}>
          </svg>
          <Text style={{ position: 'absolute', bottom: '-20px', left: '150%', transform: 'translateX(-50%)', color: '#fff', top: '0%', fontFamily: 'DigitalFont', fontSize:'150%' }}>
        {charge}%
      </Text>
          </div>
        </Box>
          
      );
}

export default Battery_2
