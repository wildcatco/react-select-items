import { useSetRecoilState } from 'recoil';
import { dragBoxElementState } from './states';

interface DragBoxProps {
  position: { x: number; y: number };
  size: { width: number; height: number };
}

export default function DragBox({ position, size }: DragBoxProps) {
  const setDragBoxElement = useSetRecoilState(dragBoxElementState);

  return (
    <div
      ref={setDragBoxElement}
      style={{
        position: 'fixed',
        border: '1px solid gray',
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
      }}
    />
  );
}
