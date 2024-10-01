import { atom } from 'recoil';
import { SelectionOptions } from './types';

export const selectedIdsState = atom<string[]>({
  key: 'SelectedIds',
  default: [],
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
