import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  focusedIndexState,
  selectedIndexesState,
  selectionOptionsState,
} from './states';
import { useEffect, useRef } from 'react';
import DragBox from './DragBox';
import styles from './Select.module.css';
import useDragSelect from './useDragSelect';

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
  const prevSelectedIndexesRef = useRef<number[]>(selectedIndexes);
  const focusedIndex = useRecoilValue(focusedIndexState);
  const { wrapperRef, dragBoxPosition, dragBoxSize } = useDragSelect({
    useShift: useShiftToDrag,
  });

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
      if (!prevSelectedIndexes.includes(index)) {
        onSelect(index);
      }
    });

    prevSelectedIndexes.forEach((index) => {
      if (!selectedIndexes.includes(index)) {
        onUnselect(index);
      }
    });

    onFocus(focusedIndex);

    prevSelectedIndexesRef.current = selectedIndexes;
  }, [onSelect, onUnselect, selectedIndexes, focusedIndex, onFocus]);

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
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
