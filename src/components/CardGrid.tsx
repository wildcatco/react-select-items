import { useState } from 'react';
import Card from './Card';
import styles from './CardGrid.module.css';
import SelectArea from './react-select-items/SelectArea';
import Selectable from './react-select-items/Selectable';

export default function CardGrid() {
  const [selectedCardIndexes, setSelectedCardIndexes] = useState<number[]>([]);

  const CARD_NAMES = ['1', '2', '3', '4', '5', '6', '7', '8'];

  const handleSelect = (index: number) => {
    if (!selectedCardIndexes.includes(index)) {
      setSelectedCardIndexes((prev) => [...prev, index]);
    }
  };

  const handleUnselect = (index: number) => {
    setSelectedCardIndexes((prev) => prev.filter((i) => i !== index));
  };

  return (
    <SelectArea onSelect={handleSelect} onUnselect={handleUnselect}>
      <div className={styles.grid}>
        {CARD_NAMES.map((title, index) => (
          <Selectable key={title + index} index={index}>
            <Card
              title={title}
              selected={selectedCardIndexes.includes(index)}
            />
          </Selectable>
        ))}
      </div>
    </SelectArea>
  );
}
