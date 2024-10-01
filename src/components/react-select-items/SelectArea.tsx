import { RecoilRoot } from 'recoil';
import Select from './Select';
import { SelectionOptions } from './types';

type SelectAreaProps = SelectionOptions & {
  onSelect: (index: number) => void;
  onUnselect: (index: number) => void;
  children: React.ReactNode;
};

export default function SelectArea({
  useCtrl = true,
  useShift = true,
  useCtrlShift = true,
  useDrag = true,
  useShiftDrag = false,
  onSelect,
  onUnselect,
  children,
}: SelectAreaProps) {
  return (
    <RecoilRoot>
      <Select
        useCtrl={useCtrl}
        useShift={useShift}
        useCtrlShift={useCtrlShift}
        useDrag={useDrag}
        useShiftDrag={useShiftDrag}
        onSelect={onSelect}
        onUnselect={onUnselect}
      />
      {children}
    </RecoilRoot>
  );
}
