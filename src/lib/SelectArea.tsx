import Select from './Select';
import { SelectionOptions } from './types';
import { SelectProvider } from './useSelectStore';

type SelectAreaProps = SelectionOptions & {
  onSelect: (index: number) => void;
  onUnselect: (index: number) => void;
  onFocus: (index: number) => void;
  children: React.ReactNode;
};

export default function SelectArea({
  useCtrl = true,
  useShift = true,
  useCtrlShift = true,
  useDrag = true,
  useShiftToDrag = false,
  onSelect,
  onUnselect,
  onFocus,
  children,
}: SelectAreaProps) {
  return (
    <SelectProvider>
      <Select
        useCtrl={useCtrl}
        useShift={useShift}
        useCtrlShift={useCtrlShift}
        useDrag={useDrag}
        useShiftToDrag={useShiftToDrag}
        onSelect={onSelect}
        onUnselect={onUnselect}
        onFocus={onFocus}
      >
        {children}
      </Select>
    </SelectProvider>
  );
}
