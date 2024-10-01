import { useCallback, useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { isDraggingState } from './states';

export default function useDragSelect({ useShift }: { useShift: boolean }) {
  const [isDragging, setIsDragging] = useRecoilState(isDraggingState);
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
      if (useShift && !e.shiftKey) return;
      if (!isDragging || !dragStartPoint || !rectRef.current) return;

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
    [dragStartPoint, isDragging]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setDragStartPoint(null);
    setDragBoxPosition(null);
    setDragBoxSize(null);
  }, []);

  const handleMouseDown = (e: MouseEvent) => {
    if (!wrapperRef.current) return;

    setIsDragging(true);

    const rect = wrapperRef.current.getBoundingClientRect();
    rectRef.current = rect;

    const startPoint = {
      x: Math.max(rect.left, Math.min(e.clientX, rect.right)),
      y: Math.max(rect.top, Math.min(e.clientY, rect.bottom)),
    };
    setDragStartPoint(startPoint);
  };

  useEffect(() => {
    wrapperRef.current?.addEventListener('mousedown', handleMouseDown);

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      wrapperRef.current?.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleMouseDown]);

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
