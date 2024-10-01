import { useRecoilState } from 'recoil';
import { selectedIdsState } from './state';

export default function useSelect() {
  const [selectedIds, setSelectedIds] = useRecoilState(selectedIdsState);

  const selectOnlyOne = (id: string) => {
    setSelectedIds([id]);
  };

  const select = (id: string) => {
    if (!selectedIds.includes(id)) {
      setSelectedIds((prev) => [...prev, id]);
    }
  };

  const unselect = (idToRemove: string) => {
    setSelectedIds((prev) => prev.filter((id) => id !== idToRemove));
  };

  return { selectOnlyOne, select, unselect };
}
