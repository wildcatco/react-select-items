import { useRecoilValue, useSetRecoilState } from 'recoil';
import { selectedIdsState, selectionOptionsState } from './state';
import { useEffect, useRef } from 'react';
interface SelectHooksProps {
  useCtrl: boolean;
  useShift: boolean;
  useCtrlShift: boolean;
  useDrag: boolean;
  useShiftDrag: boolean;
  onSelect: (id: string) => void;
  onUnselect: (id: string) => void;
}

export default function Select({
  useCtrl,
  useShift,
  useCtrlShift,
  useDrag,
  useShiftDrag,
  onSelect,
  onUnselect,
}: SelectHooksProps) {
  const setSelectionOptions = useSetRecoilState(selectionOptionsState);
  const selectedIds = useRecoilValue(selectedIdsState);
  const prevSelectedIdsRef = useRef<string[]>(selectedIds);

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
    const prevSelectedIds = prevSelectedIdsRef.current;

    selectedIds.forEach((id) => {
      if (!prevSelectedIds.includes(id)) {
        onSelect(id);
      }
    });

    prevSelectedIds.forEach((id) => {
      if (!selectedIds.includes(id)) {
        onUnselect(id);
      }
    });

    prevSelectedIdsRef.current = selectedIds;
  }, [onSelect, onUnselect, selectedIds]);

  return null;
}
