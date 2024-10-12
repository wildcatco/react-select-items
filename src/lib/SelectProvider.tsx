import { PropsWithChildren, useMemo } from 'react';
import { create } from 'zustand';
import { SelectionOptions } from './types';
import { SelectStore, SelectContext } from './SelectContext';

export default function SelectProvider({ children }: PropsWithChildren) {
  const useSelectStore = useMemo(
    () =>
      create<SelectStore>((set) => ({
        selectedIndexes: new Set<number>(),
        setSelectedIndexes: (indexes: Set<number>) =>
          set({ selectedIndexes: indexes }),
        focusedIndex: 0,
        setFocusedIndex: (index: number) => set({ focusedIndex: index }),
        selectionOptions: {
          useCtrl: true,
          useShift: true,
          useCtrlShift: true,
          useDrag: true,
          useShiftToDrag: false,
        },
        setSelectionOptions: (options: SelectionOptions) =>
          set((state) => ({
            selectionOptions: {
              ...state.selectionOptions,
              ...options,
            },
          })),
        dragBoxElement: null,
        setDragBoxElement: (element) => set({ dragBoxElement: element }),
        isDragging: false,
        setIsDragging: (isDragging) => set({ isDragging }),
      })),
    [],
  );

  const store = useSelectStore();

  return (
    <SelectContext.Provider value={store}>{children}</SelectContext.Provider>
  );
}
