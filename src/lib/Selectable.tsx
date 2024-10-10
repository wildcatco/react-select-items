import { useEffect, useRef } from 'react';
import useSelect from './useSelect';
import { useSelectStore } from './useSelectStore';

interface SelectableProps {
  index: number;
  children: React.ReactNode;
}

export default function Selectable({ index, children }: SelectableProps) {
  const { selectOnlyOne, select, unselect, selectRange } = useSelect();
  const {
    focusedIndex,
    setFocusedIndex,
    selectionOptions,
    selectedIndexes,
    dragBoxElement,
    setIsDragging,
  } = useSelectStore();
  const { useCtrl, useShift, useCtrlShift } = selectionOptions;
  const ref = useRef<HTMLDivElement>(null);

  const isSelected = selectedIndexes.has(index);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(false);
    setFocusedIndex(index);

    if (useCtrl && e.ctrlKey && !e.shiftKey) {
      if (isSelected) {
        unselect(index);
      } else {
        select(index);
      }
    } else if (useShift && e.shiftKey) {
      const start = Math.min(focusedIndex, index);
      const end = Math.max(focusedIndex, index);
      selectRange({
        startIndex: start,
        endIndex: end,
        append: !!useCtrlShift && e.ctrlKey,
      });
    } else {
      if (selectedIndexes.size > 1 && isSelected) {
        return;
      }
      selectOnlyOne(index);
    }
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    if (selectedIndexes.size > 1 && isSelected && !e.ctrlKey && !e.shiftKey) {
      selectOnlyOne(index);
    }
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
    <div
      ref={ref}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      className='temp'
    >
      {children}
    </div>
  );
}
