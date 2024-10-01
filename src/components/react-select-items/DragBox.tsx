import { useSelectStore } from './useSelectStore';

interface DragBoxProps {
  position: { x: number; y: number };
  size: { width: number; height: number };
}

export default function DragBox({ position, size }: DragBoxProps) {
  const { setDragBoxElement } = useSelectStore();

  return (
    <div
      ref={setDragBoxElement}
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
