import { useRecoilValue } from 'recoil';
import { selectedIdsState, selectionOptionsState } from './state';
import useSelect from './useSelect';

interface SelectableProps {
  id: string;
  children: React.ReactNode;
}

export default function Selectable({ id, children }: SelectableProps) {
  const { selectOnlyOne, select, unselect } = useSelect();
  const { useCtrl } = useRecoilValue(selectionOptionsState);

  const isSelected = useRecoilValue(selectedIdsState).includes(id);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (useCtrl && e.ctrlKey) {
      if (isSelected) {
        unselect(id);
      } else {
        select(id);
      }
    } else {
      selectOnlyOne(id);
    }
  };

  return <div onMouseDown={handleMouseDown}>{children}</div>;
}
