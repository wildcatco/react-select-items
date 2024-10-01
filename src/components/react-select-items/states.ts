import { atom } from 'recoil';
import { SelectionOptions } from './types';

export const selectedIndexesState = atom<number[]>({
  key: 'SelectedIndexes',
  default: [],
});

export const focusedIndexState = atom<number>({
  key: 'FocusedIndex',
  default: 0,
});

export const selectionOptionsState = atom<SelectionOptions>({
  key: 'SelectionOptions',
  default: {
    useCtrl: true,
    useShift: true,
    useCtrlShift: true,
    useDrag: true,
    useShiftDrag: false,
  },
});
