import { EdgeProps, getSmoothStepPath } from 'reactflow';
import { useState } from 'react';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';

export function DefaultEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
}: EdgeProps) {
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const [label, setLabel] = useState<string>("");
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: labelX, y: labelY });

  const handleLabelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLabel(event.target.value);
  };

  const handleDrag = (e: DraggableEvent, data: DraggableData) => {
    setPosition({ x: data.x, y: data.y });
  };

  return (
    <>
      <path
        id={id}
        style={style}
        className="react-flow__edge-path stroke-[3] stroke-zinc-300"
        d={edgePath}
        markerEnd={markerEnd}
      />
      <Draggable
        position={position}
        onDrag={handleDrag}
      >
        <foreignObject width={100} height={50} className="overflow-visible">
          <input
            type="text"
            value={label}
            onChange={handleLabelChange}
            className="bg-transparent border-none text-center"
            placeholder="Enter text"
          />
        </foreignObject>
      </Draggable>
    </>
  );
}

export default DefaultEdge; // Exportando o componente DefaultEdge
