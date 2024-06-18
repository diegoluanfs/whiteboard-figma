// Diamond.tsx
import React, { useState, useCallback } from "react";
import { Handle, Position, NodeProps } from "reactflow";
import { NodeResizer } from "@reactflow/node-resizer";
import { D3DragEvent } from 'd3-drag';
import "@reactflow/node-resizer/dist/style.css";

interface DiamondProps extends NodeProps {}

export function Diamond({ data, selected }: DiamondProps) {
  const [size, setSize] = useState({ width: 100, height: 100 });

  const handleResize = useCallback((event: D3DragEvent<HTMLDivElement, null, any>, { width, height }: { width: number, height: number }) => {
    const newSize = Math.max(width, height);
    setSize({ width: newSize, height: newSize });
  }, []);

  return (
    <div
    className="bg-violet-500 rounded relative"
    style={{
      width: size.width,
      height: size.height,
      minWidth: 100,
      minHeight: 100,
      transform: "rotate(45deg)", // Aplica a rotação de 45 graus
      transformOrigin: "center center" // Define o ponto de origem da rotação como o centro do quadrado
    }}
    >
      <NodeResizer
        minWidth={100}
        minHeight={100}
        isVisible={selected}
        lineClassName="border-blue-400"
        handleClassName="h-3 w-3 bg-white border-2 rounded border-blue-400"
        onResize={handleResize}
        keepAspectRatio
      />
      {/* <Handle
        id="right"
        type="source"
        position={Position.Right}
        style={{ top: '-16px', left: '116px', backgroundColor: 'yellow' }} // Posição no vértice superior esquerdo
        className="-right-5 w-3 h-3 bg-blue-400/80"
      /> */}
      <div className="absolute inset-0 bg-transparent text-white p-2">
        {data.label}
      </div>
      <Handle
        id="left"
        type="source"
        position={Position.Left}
        style={{ top: '116px', left: '116px', backgroundColor: 'yellow' }} // Posição no vértice superior esquerdo
        className="-left-5 w-3 h-3 bg-blue-400/80"
      />
      <Handle
        id="top"
        type="source"
        position={Position.Top}
        style={{ top: '-16px', left: '-16px', backgroundColor: 'yellow' }} // Posição no vértice superior esquerdo
        className="-top-5 w-3 h-3 bg-blue-400/80"
      />
      <Handle
        id="bottom"
        type="source"
        position={Position.Bottom}
        style={{ top: '116px', left: '116px', backgroundColor: 'yellow' }} // Posição no vértice superior esquerdo
        className="-bottom-5 w-3 h-3 bg-blue-400/80 "
      />
    </div>
  );
}
