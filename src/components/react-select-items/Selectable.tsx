import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  dragBoxElementState,
  focusedIndexState,
  isDraggingState,
  selectedIndexesState,
  selectionOptionsState,
} from './states';
import useSelect from './useSelect';
import { useEffect, useRef } from 'react';

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
  const dragBoxElement = useRecoilValue(dragBoxElementState);
  const ref = useRef<HTMLDivElement>(null);
  const setIsDragging = useSetRecoilState(isDraggingState);

  const isSelected = selectedIndexes.has(index);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(false);

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

  useEffect(() => {
    const selectableElement = ref.current;

    const handleMouseMove = () => {
      if (!dragBoxElement || !selectableElement) {
        return;
      }

      const dragBoxRect = dragBoxElement.getBoundingClientRect();
      const selectableRect = selectableElement.getBoundingClientRect();

      const isOverlapping = !(
        dragBoxRect.right < selectableRect.left ||
        dragBoxRect.left > selectableRect.right ||
        dragBoxRect.bottom < selectableRect.top ||
        dragBoxRect.top > selectableRect.bottom
      );

      if (isOverlapping && !isSelected) {
        select(index);
      } else if (!isOverlapping && isSelected) {
        unselect(index);
      }
    };

    if (dragBoxElement) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [dragBoxElement, index, isSelected, select, unselect]);

  return (
    <div ref={ref} onMouseDown={handleMouseDown}>
      {children}
    </div>
  );
}
