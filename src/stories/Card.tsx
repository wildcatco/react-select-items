import clsx from 'clsx';
import styles from './Card.module.css';

interface CardProps {
  title: string;
  selected: boolean;
  focused: boolean;
}

export default function Card({ title, selected, focused }: CardProps) {
  return (
    <div
      className={clsx(
        styles.card,
        selected && styles.selected,
        !selected && focused && styles.focused
      )}
    >
      {title}
    </div>
  );
}
