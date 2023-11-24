
import Success from './Success';
import DonateContext from '../../context/donateContext/DonateContext'
import { useContext } from 'react';


const PassingData = () => {
    const data = useContext(DonateContext);
  console.log(data);
   
  return (
    <div>
           {/*hello world */}
        </div>
  )
};

export default PassingData