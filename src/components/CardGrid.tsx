import { useState } from 'react';
import Card from './Card';
import styles from './CardGrid.module.css';
import SelectArea from './react-select-items/SelectArea';
import Selectable from './react-select-items/Selectable';

export default function CardGrid() {
  const [selectedCardIds, setSelectedCardIds] = useState<string[]>([]);

  const CARDS = [
    { id: 'card-1', title: '1' },
    { id: 'card-2', title: '2' },
    { id: 'card-3', title: '3' },
    { id: 'card-4', title: '4' },
    { id: 'card-5', title: '5' },
    { id: 'card-6', title: '6' },
    { id: 'card-7', title: '7' },
    { id: 'card-8', title: '8' },
  ];

  const handleSelect = (id: string) => {
    if (!selectedCardIds.includes(id)) {
      setSelectedCardIds((prev) => [...prev, id]);
    }
  };

  const handleUnselect = (id: string) => {
    setSelectedCardIds((prev) => prev.filter((i) => i !== id));
  };

  return (
    <SelectArea onSelect={handleSelect} onUnselect={handleUnselect}>
      <div className={styles.grid}>
        {CARDS.map(({ id, title }) => (
          <Selectable key={id} id={id}>
            <Card title={title} selected={selectedCardIds.includes(id)} />
          </Selectable>
        ))}
      </div>
    </SelectArea>
  );
}
