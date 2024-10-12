import { SelectionOptions } from './selectionOptions';

export interface SelectStore {
  selectedIndexes: Set<number>;
  focusedIndex: number;
  selectionOptions: Required<SelectionOptions>;
  dragBoxElement: HTMLDivElement | null;
  isDragging: boolean;

  setSelectionOptions: (options: SelectionOptions) => void;
  setDragBoxElement: (element: HTMLDivElement | null) => void;
  setIsDragging: (isDragging: boolean) => void;

  selectOnlyOne: (index: number) => void;
  select: (index: number) => void;
  unselect: (index: number) => void;
  selectRange: ({
    startIndex,
    endIndex,
    append,
  }: {
    startIndex: number;
    endIndex: number;
    append: boolean;
  }) => void;
  unselectAll: () => void;
  focus: (index: number) => void;
}
