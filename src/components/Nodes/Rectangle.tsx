// Rectangle.tsx
import React, { useState, useCallback } from "react";
import { Handle, Position, NodeProps } from "reactflow";
import { NodeResizer } from "@reactflow/node-resizer";
import { D3DragEvent } from 'd3-drag';
import "@reactflow/node-resizer/dist/style.css";

interface RectangleProps extends NodeProps {}

export function Rectangle({ data, selected }: RectangleProps) {
  const [size, setSize] = useState({ width: 200, height: 50 });

  const handleResize = useCallback((event: D3DragEvent<HTMLDivElement, null, any>, { width, height }: { width: number, height: number }) => {
    setSize({ width, height }); // Diferente do Square, não mantemos a proporção de aspecto aqui
  }, []);

  return (
    <div
      className="bg-violet-500 rounded relative"
      style={{ 
        width: size.width, 
        height: size.height, 
        minWidth: 100, 
        minHeight: 50,
        backgroundColor: 'lightgray',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '10px',
        wordWrap: 'break-word',
      }}
    >
      <NodeResizer
        minWidth={100}
        minHeight={100}
        isVisible={selected}
        lineClassName="border-blue-400"
        handleClassName="h-3 w-3 bg-white border-2 rounded border-blue-400"
        onResize={handleResize}
        // Removemos a propriedade keepAspectRatio para permitir que o retângulo seja redimensionado de forma não uniforme
      />
      <div className="absolute inset-0 bg-transparent text-white p-2">
        {data.label}
      </div>
      <Handle
        id="right"
        type="source"
        position={Position.Right}
        className="-right-5 w-3 h-3 bg-blue-400/80"
      />
    </div>
  );
}