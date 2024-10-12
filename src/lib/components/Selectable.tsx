import { PropsWithChildren, useEffect, useRef } from 'react';
import useSelectStore from '../hooks/useSelectStore';
import { SELECTABLE_CLASS_NAME } from '../constants/classnames';

interface SelectableProps extends PropsWithChildren {
  index: number;
}

export default function Selectable({ index, children }: SelectableProps) {
  const {
    focusedIndex,
    focus,
    selectionOptions,
    selectedIndexes,
    dragBoxElement,
    setIsDragging,
    selectOnlyOne,
    select,
    unselect,
    selectRange,
  } = useSelectStore();
  const { useCtrl, useShift, useCtrlShift } = selectionOptions;
  const ref = useRef<HTMLDivElement>(null);

  const isSelected = selectedIndexes.has(index);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(false);
    focus(index);

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
      className={SELECTABLE_CLASS_NAME}
    >
      {children}
    </div>
  );
}
