import { useEffect, useRef } from 'react';
import DragBox from './DragBox';
import useDragSelect from './useDragSelect';
import useSelect from './useSelect';
import { useSelectStore } from './useSelectStore';
import { SelectionOptions } from './types';

interface SelectProps {
  onSelect: (index: number) => void;
  onUnselect: (index: number) => void;
  onFocus: (index: number) => void;
  options?: SelectionOptions;
  children: React.ReactNode;
}

export default function Select({
  onSelect,
  onUnselect,
  onFocus,
  options,
  children,
}: SelectProps) {
  const {
    selectedIndexes,
    focusedIndex,
    isDragging,
    setIsDragging,
    setSelectionOptions,
  } = useSelectStore();
  const prevSelectedIndexesRef = useRef<Set<number>>(selectedIndexes);
  const { selectionOptions } = useSelectStore();
  const { wrapperRef, dragBoxPosition, dragBoxSize } = useDragSelect({
    useShift: selectionOptions.useShiftToDrag,
  });
  const { unselectAll } = useSelect();

  useEffect(() => {
    if (options) {
      setSelectionOptions(options);
    }
  }, [options, setSelectionOptions]);

  useEffect(() => {
    const prevSelectedIndexes = prevSelectedIndexesRef.current;

    selectedIndexes.forEach((index) => {
      if (!prevSelectedIndexes.has(index)) {
        onSelect(index);
      }
    });

    prevSelectedIndexes.forEach((index) => {
      if (!selectedIndexes.has(index)) {
        onUnselect(index);
      }
    });

    onFocus(focusedIndex);

    prevSelectedIndexesRef.current = selectedIndexes;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIndexes, focusedIndex]);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [setIsDragging, wrapperRef]);

  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    if (
      e.target instanceof HTMLElement &&
      !e.target.closest('.temp') &&
      !isDragging
    ) {
      unselectAll();
    }
    setIsDragging(false);
  };

  return (
    <div
      ref={wrapperRef}
      onMouseUp={handleMouseUp}
      style={{ width: '100%', height: '100%' }}
    >
      {dragBoxPosition && dragBoxSize && (
        <DragBox
          position={{ x: dragBoxPosition.x, y: dragBoxPosition.y }}
          size={{ width: dragBoxSize.width, height: dragBoxSize.height }}
        />
      )}
      {children}
    </div>
  );
}
