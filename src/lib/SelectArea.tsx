import Select, { SelectProps } from './Select';
import { SelectProvider } from './useSelectStore';

export default function SelectArea({ children, ...props }: SelectProps) {
  return (
    <SelectProvider>
      <Select {...props}>{children}</Select>
    </SelectProvider>
  );
}
