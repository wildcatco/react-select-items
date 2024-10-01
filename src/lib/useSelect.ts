import { useCallback } from 'react';
import { useSelectStore } from './useSelectStore';

export default function useSelect() {
  const { selectedIndexes, setSelectedIndexes } = useSelectStore();

  const selectOnlyOne = useCallback(
    (index: number) => {
      setSelectedIndexes(new Set([index]));
    },
    [setSelectedIndexes]
  );

  const select = useCallback(
    (index: number) => {
      setSelectedIndexes(new Set([...selectedIndexes, index]));
    },
    [selectedIndexes, setSelectedIndexes]
  );

  const unselect = useCallback(
    (indexToRemove: number) => {
      setSelectedIndexes(
        new Set([...selectedIndexes].filter((index) => index !== indexToRemove))
      );
    },
    [selectedIndexes, setSelectedIndexes]
  );

  const selectRange = useCallback(
    ({
      startIndex,
      endIndex,
      append,
    }: {
      startIndex: number;
      endIndex: number;
      append: boolean;
    }) => {
      const indexesToSelect: Set<number> = append
        ? new Set([...selectedIndexes])
        : new Set();
      for (let i = startIndex; i <= endIndex; i++) {
        indexesToSelect.add(i);
      }
      setSelectedIndexes(indexesToSelect);
    },
    [selectedIndexes, setSelectedIndexes]
  );

  const unselectAll = useCallback(() => {
    setSelectedIndexes(new Set());
  }, [setSelectedIndexes]);

  return { selectOnlyOne, select, unselect, selectRange, unselectAll };
}
