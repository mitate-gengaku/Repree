import React from 'react';
import { BaseEdge, getBezierPath, getSmoothStepPath, type EdgeProps } from '@xyflow/react';
 
export function HighlightEdge({
  id,
  data,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
}: EdgeProps) {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });
 
  return (
    <>
      <BaseEdge 
        id={id} 
        path={edgePath}
        className={"!stroke-sky-500"}
        />
        {[...Array(8)].map((_, i) => (
          <rect
            key={`particle-${i}`}
            width="5"
            height="3"
            y="-1.5"
            className='fill-sky-400'
          >
            <animateMotion
              begin={`${-i}s`}
              dur={`8s`}
              repeatCount="indefinite"
              rotate="auto"
              path={edgePath}
              calcMode="spline"
              keySplines="0.42, 0, 0.58, 1.0"
            />
          </rect>
        ))}
    </>
  );
}