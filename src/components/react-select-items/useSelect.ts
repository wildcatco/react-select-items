import { useRecoilState } from 'recoil';
import { selectedIndexesState } from './states';

export default function useSelect() {
  const [selectedIndexes, setSelectedIndexes] =
    useRecoilState(selectedIndexesState);

  const selectOnlyOne = (index: number) => {
    setSelectedIndexes(new Set([index]));
  };

  const select = (index: number) => {
    setSelectedIndexes((prev) => new Set([...prev, index]));
  };

  const unselect = (indexToRemove: number) => {
    setSelectedIndexes((prev) => {
      const newSet = new Set(prev);
      newSet.delete(indexToRemove);
      return newSet;
    });
  };

  const selectRange = ({
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
  };

  return { selectOnlyOne, select, unselect, selectRange };
}
