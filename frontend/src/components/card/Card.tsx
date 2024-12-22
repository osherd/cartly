import styles from './Card.module.scss';
import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  cardClass?: string;
}

const Card = ({ children, cardClass }: CardProps) => {
  return <div className={`${styles.card} ${cardClass}`}>{children}</div>;
};

export default Card;
