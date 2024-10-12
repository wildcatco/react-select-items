import useSelectStore from './useSelectStore';

interface DragBoxProps {
  position: { x: number; y: number };
  size: { width: number; height: number };
  className?: string;
}

const DEFAULT_DRAG_BOX_CLASS_NAME = 'react-select-items-drag-box';

export default function DragBox({ position, size, className }: DragBoxProps) {
  const { setDragBoxElement } = useSelectStore();

  return (
    <div
      ref={setDragBoxElement}
      className={className ?? DEFAULT_DRAG_BOX_CLASS_NAME}
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
