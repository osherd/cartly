import { FaUsers } from 'react-icons/fa';
import { BiUserCheck, BiUserMinus, BiUserX } from 'react-icons/bi';

import InfoBox from '../infoBox/InfoBox';

// Icons
const icon1 = <FaUsers size={40} color='#fff' />;
const icon2 = <BiUserCheck size={40} color='#fff' />;
const icon3 = <BiUserMinus size={40} color='#fff' />;
const icon4 = <BiUserX size={40} color='#fff' />;

import './UsersStats.scss';
const UsersStats = () => {
  return (
    <div className='user-summary'>
      <h3 className='--mt'>User Stats</h3>
      <div className='info-summary'>
        <InfoBox
          icon={icon1}
          title={'Total Users'}
          count={3}
          bgColor={'card1'}
        />
        <InfoBox
          icon={icon2}
          title={'Verifed Users'}
          count={2}
          bgColor={'card2'}
        />
        <InfoBox
          icon={icon3}
          title={'Unverifed Users'}
          count={4}
          bgColor={'card3'}
        />
        <InfoBox
          icon={icon4}
          title={'Suspended Users'}
          count={1}
          bgColor={'card4'}
        />
      </div>
    </div>
  );
};

export default UsersStats;
