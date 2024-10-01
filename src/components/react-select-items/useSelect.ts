import { useRecoilState } from 'recoil';
import { selectedIndexesState } from './states';

export default function useSelect() {
  const [selectedIndexes, setSelectedIndexes] =
    useRecoilState(selectedIndexesState);

  const selectOnlyOne = (index: number) => {
    setSelectedIndexes([index]);
  };

  const select = (index: number) => {
    if (!selectedIndexes.includes(index)) {
      setSelectedIndexes((prev) => [...prev, index]);
    }
  };

  const unselect = (indexToRemove: number) => {
    setSelectedIndexes((prev) =>
      prev.filter((index) => index !== indexToRemove)
    );
  };

  return { selectOnlyOne, select, unselect };
}
