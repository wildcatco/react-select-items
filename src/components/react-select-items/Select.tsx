import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  focusedIndexState,
  selectedIndexesState,
  selectionOptionsState,
} from './states';
import { useEffect, useRef } from 'react';

interface SelectHooksProps {
  useCtrl: boolean;
  useShift: boolean;
  useCtrlShift: boolean;
  useDrag: boolean;
  useShiftDrag: boolean;
  onSelect: (index: number) => void;
  onUnselect: (index: number) => void;
  onFocus: (index: number) => void;
}

export default function Select({
  useCtrl,
  useShift,
  useCtrlShift,
  useDrag,
  useShiftDrag,
  onSelect,
  onUnselect,
  onFocus,
}: SelectHooksProps) {
  const setSelectionOptions = useSetRecoilState(selectionOptionsState);
  const selectedIndexes = useRecoilValue(selectedIndexesState);
  const prevSelectedIndexesRef = useRef<number[]>(selectedIndexes);
  const focusedIndex = useRecoilValue(focusedIndexState);

  useEffect(() => {
    setSelectionOptions({
      useCtrl,
      useShift,
      useCtrlShift,
      useDrag,
      useShiftDrag,
    });
  }, [
    useCtrl,
    useShift,
    useCtrlShift,
    useDrag,
    useShiftDrag,
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

  return null;
}
