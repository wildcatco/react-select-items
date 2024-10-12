import { PropsWithChildren, useMemo } from 'react';
import { create } from 'zustand';
import { SelectionOptions } from '../types/selectionOptions';
import { SelectStoreContext } from '../contexts/SelectStoreContext';
import { SelectStore } from '../types/selectStore';

export default function SelectProvider({ children }: PropsWithChildren) {
  const useStore = useMemo(
    () =>
      create<SelectStore>((set) => ({
        selectedIndexes: new Set<number>(),
        focusedIndex: 0,
        selectionOptions: {
          useCtrl: true,
          useShift: true,
          useCtrlShift: true,
          useDrag: true,
          useShiftToDrag: false,
        },
        dragBoxElement: null,
        isDragging: false,

        setSelectionOptions: (options: SelectionOptions) =>
          set((state) => ({
            selectionOptions: {
              ...state.selectionOptions,
              ...options,
            },
          })),
        setDragBoxElement: (element) => set({ dragBoxElement: element }),
        setIsDragging: (isDragging) => set({ isDragging }),

        selectOnlyOne: (index: number) =>
          set({ selectedIndexes: new Set([index]) }),
        select: (index: number) =>
          set((state) => ({
            selectedIndexes: new Set([...state.selectedIndexes, index]),
          })),
        unselect: (indexToRemove: number) =>
          set((state) => ({
            selectedIndexes: new Set(
              [...state.selectedIndexes].filter(
                (index) => index !== indexToRemove,
              ),
            ),
          })),
        selectRange: ({ startIndex, endIndex, append }) =>
          set((state) => {
            const indexesToSelect: Set<number> = append
              ? new Set([...state.selectedIndexes])
              : new Set();
            for (let i = startIndex; i <= endIndex; i++) {
              indexesToSelect.add(i);
            }
            return {
              selectedIndexes: indexesToSelect,
            };
          }),
        unselectAll: () => set({ selectedIndexes: new Set() }),
        focus: (index: number) => set({ focusedIndex: index }),
      })),
    [],
  );

  const store = useStore();

  return (
    <SelectStoreContext.Provider value={store}>
      {children}
    </SelectStoreContext.Provider>
  );
}
