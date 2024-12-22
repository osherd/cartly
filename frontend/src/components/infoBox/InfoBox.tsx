import './InfoBox.scss';

// eslint-disable-next-line react/prop-types
const InfoBox = ({ icon, bgColor, title, count }) => {
  return (
    <div className={`info-box ${bgColor}`}>
      <span className='info-icon --color-white'>{icon}</span>
      <span className='info-text '>
        <p>{title}</p>
        <h4>{count}</h4>
      </span>
    </div>
  );
};

export default InfoBox;
