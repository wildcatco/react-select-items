import Select from './Select';
import { SelectionOptions } from './types';
import { SelectProvider } from './useSelectStore';

type SelectAreaProps = {
  onSelect?: (index: number) => void;
  onUnselect?: (index: number) => void;
  onFocus?: (index: number) => void;
  options?: SelectionOptions;
  dragBoxClassName?: string;
  children: React.ReactNode;
};

export default function SelectArea({
  onSelect = () => {},
  onUnselect = () => {},
  onFocus = () => {},
  options,
  dragBoxClassName,
  children,
}: SelectAreaProps) {
  return (
    <SelectProvider>
      <Select
        onSelect={onSelect}
        onUnselect={onUnselect}
        onFocus={onFocus}
        options={options}
        dragBoxClassName={dragBoxClassName}
      >
        {children}
      </Select>
    </SelectProvider>
  );
}
