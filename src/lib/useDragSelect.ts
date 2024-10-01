import { useCallback, useEffect, useRef, useState } from 'react';
import { useSelectStore } from './useSelectStore';

export default function useDragSelect({ useShift }: { useShift: boolean }) {
  const mouseDownPointRef = useRef<{ x: number; y: number } | null>(null);
  const { setIsDragging } = useSelectStore();
  const [dragStartPoint, setDragStartPoint] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [dragBoxPosition, setDragBoxPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [dragBoxSize, setDragBoxSize] = useState<{
    width: number;
    height: number;
  } | null>(null);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const rectRef = useRef<DOMRect | null>(null);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!mouseDownPointRef.current) return;
      if (useShift && !e.shiftKey) return;
      if (
        mouseDownPointRef.current?.x === e.clientX &&
        mouseDownPointRef.current?.y === e.clientY
      ) {
        return;
      }

      setIsDragging(true);

      if (!dragStartPoint || !rectRef.current) return;

      const dragEndPoint = {
        x: Math.max(
          rectRef.current.left,
          Math.min(e.clientX, rectRef.current.right)
        ),
        y: Math.max(
          rectRef.current.top,
          Math.min(e.clientY, rectRef.current.bottom)
        ),
      };

      setDragBoxPosition(
        calculateDragBoxPosition({
          dragStartPoint,
          dragEndPoint,
        })
      );
      setDragBoxSize(
        calculateDragBoxSize({
          dragStartPoint,
          dragEndPoint,
        })
      );
    },
    [dragStartPoint, setIsDragging, useShift]
  );

  const handleMouseUp = useCallback(() => {
    setDragStartPoint(null);
    setDragBoxPosition(null);
    setDragBoxSize(null);
    mouseDownPointRef.current = null;
  }, []);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const handleMouseDown = (e: MouseEvent) => {
      mouseDownPointRef.current = { x: e.clientX, y: e.clientY };

      const rect = wrapper.getBoundingClientRect();
      rectRef.current = rect;

      const startPoint = {
        x: Math.max(rect.left, Math.min(e.clientX, rect.right)),
        y: Math.max(rect.top, Math.min(e.clientY, rect.bottom)),
      };
      setDragStartPoint(startPoint);
    };

    wrapper.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      wrapper.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  return {
    wrapperRef,
    dragBoxPosition,
    dragBoxSize,
  };
}

function calculateDragBoxPosition({
  dragStartPoint,
  dragEndPoint,
}: {
  dragStartPoint: { x: number; y: number };
  dragEndPoint: { x: number; y: number };
}) {
  return {
    x: Math.min(dragStartPoint.x, dragEndPoint.x),
    y: Math.min(dragStartPoint.y, dragEndPoint.y),
  };
}

function calculateDragBoxSize({
  dragStartPoint,
  dragEndPoint,
}: {
  dragStartPoint: { x: number; y: number };
  dragEndPoint: { x: number; y: number };
}) {
  return {
    width: Math.abs(dragEndPoint.x - dragStartPoint.x),
    height: Math.abs(dragEndPoint.y - dragStartPoint.y),
  };
}
