import './InfoBox.scss';
import React, { ReactNode } from "react";

interface InfoBoxProps {
  icon: ReactNode;
  title: string;
  count: number;
}

interface InfoBoxProps {
  icon: React.ReactNode;
  bgColor: string;
  title: string;
  count: number;
}

const InfoBox: React.FC<InfoBoxProps> = ({ icon, bgColor, title, count }) => {
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
