import { useRecoilState, useRecoilValue } from 'recoil';
import {
  focusedIndexState,
  selectedIndexesState,
  selectionOptionsState,
} from './states';
import useSelect from './useSelect';

interface SelectableProps {
  index: number;
  children: React.ReactNode;
}

export default function Selectable({ index, children }: SelectableProps) {
  const { selectOnlyOne, select, unselect, selectRange } = useSelect();
  const [focusedIndex, setFocusedIndex] = useRecoilState(focusedIndexState);
  const { useCtrl, useShift, useCtrlShift } = useRecoilValue(
    selectionOptionsState
  );
  const selectedIndexes = useRecoilValue(selectedIndexesState);

  const isSelected = selectedIndexes.includes(index);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (useCtrl && e.ctrlKey && !e.shiftKey) {
      if (isSelected) {
        unselect(index);
      } else {
        select(index);
      }
    } else if (useShift && e.shiftKey) {
      const start = Math.min(focusedIndex, index);
      const end = Math.max(focusedIndex, index);
      selectRange({ startIndex: start, endIndex: end, append: !!useCtrlShift });
    } else {
      selectOnlyOne(index);
    }

    setFocusedIndex(index);
  };

  return <div onMouseDown={handleMouseDown}>{children}</div>;
}
