import { createContext } from 'react';
import { SelectionOptions } from '../types/selectionOptions';

export interface SelectStore {
  selectedIndexes: Set<number>;
  setSelectedIndexes: (indexes: Set<number>) => void;
  focusedIndex: number;
  setFocusedIndex: (index: number) => void;
  selectionOptions: Required<SelectionOptions>;
  setSelectionOptions: (options: SelectionOptions) => void;
  dragBoxElement: HTMLDivElement | null;
  setDragBoxElement: (element: HTMLDivElement | null) => void;
  isDragging: boolean;
  setIsDragging: (isDragging: boolean) => void;
}

export const SelectContext = createContext<SelectStore | null>(null);
