import { useEffect, useRef } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import DragBox from './DragBox';
import styles from './Select.module.css';
import {
  focusedIndexState,
  isDraggingState,
  selectedIndexesState,
  selectionOptionsState,
} from './states';
import useDragSelect from './useDragSelect';
import useSelect from './useSelect';

interface SelectHooksProps {
  useCtrl: boolean;
  useShift: boolean;
  useCtrlShift: boolean;
  useDrag: boolean;
  useShiftToDrag: boolean;
  onSelect: (index: number) => void;
  onUnselect: (index: number) => void;
  onFocus: (index: number) => void;
  children: React.ReactNode;
}

export default function Select({
  useCtrl,
  useShift,
  useCtrlShift,
  useDrag,
  useShiftToDrag,
  onSelect,
  onUnselect,
  onFocus,
  children,
}: SelectHooksProps) {
  const setSelectionOptions = useSetRecoilState(selectionOptionsState);
  const selectedIndexes = useRecoilValue(selectedIndexesState);
  const prevSelectedIndexesRef = useRef<Set<number>>(selectedIndexes);
  const focusedIndex = useRecoilValue(focusedIndexState);
  const { wrapperRef, dragBoxPosition, dragBoxSize } = useDragSelect({
    useShift: useShiftToDrag,
  });
  const [isDragging, setIsDragging] = useRecoilState(isDraggingState);
  const { unselectAll } = useSelect();

  useEffect(() => {
    setSelectionOptions({
      useCtrl,
      useShift,
      useCtrlShift,
      useDrag,
      useShiftToDrag,
    });
  }, [
    useCtrl,
    useShift,
    useCtrlShift,
    useDrag,
    useShiftToDrag,
    setSelectionOptions,
  ]);

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
  }, [onSelect, onUnselect, selectedIndexes, focusedIndex, onFocus]);

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
    <div ref={wrapperRef} className={styles.wrapper} onMouseUp={handleMouseUp}>
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
