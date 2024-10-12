import { DEFAULT_DRAG_BOX_CLASS_NAME } from '../constants/classnames';
import useSelectStore from '../hooks/useSelectStore';

interface DragBoxProps {
  position: { x: number; y: number };
  size: { width: number; height: number };
  className?: string;
}

export default function DragBox({
  position,
  size,
  className = DEFAULT_DRAG_BOX_CLASS_NAME,
}: DragBoxProps) {
  const { setDragBoxElement } = useSelectStore();

  return (
    <div
      ref={setDragBoxElement}
      className={className}
      style={{
        position: 'fixed',
        border: '1px dashed gray',
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
      }}
    />
  );
}
