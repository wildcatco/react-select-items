import { useRecoilValue } from 'recoil';
import { selectedIndexesState, selectionOptionsState } from './states';
import useSelect from './useSelect';

interface SelectableProps {
  index: number;
  children: React.ReactNode;
}

export default function Selectable({ index, children }: SelectableProps) {
  const { selectOnlyOne, select, unselect } = useSelect();
  const { useCtrl } = useRecoilValue(selectionOptionsState);

  const isSelected = useRecoilValue(selectedIndexesState).includes(index);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (useCtrl && e.ctrlKey) {
      if (isSelected) {
        unselect(index);
      } else {
        select(index);
      }
    } else {
      selectOnlyOne(index);
    }
  };

  return <div onMouseDown={handleMouseDown}>{children}</div>;
}
