import { createContext, useContext, useMemo } from 'react';
import { create } from 'zustand';
import { SelectionOptions } from './types';

interface SelectStore {
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

const SelectContext = createContext<SelectStore | null>(null);

const SelectProvider = ({ children }: { children: React.ReactNode }) => {
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
};

const useSelectStore = () => {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error('useSelectStore must be used within a SelectProvider');
  }
  return context;
};

export { SelectProvider, useSelectStore };
