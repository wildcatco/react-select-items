import clsx from 'clsx';
import styles from './Card.module.css';

interface CardProps {
  title: string;
  selected: boolean;
}

export default function Card({ title, selected }: CardProps) {
  return (
    <div className={clsx(styles.card, selected && styles.selected)}>
      {title}
    </div>
  );
}
