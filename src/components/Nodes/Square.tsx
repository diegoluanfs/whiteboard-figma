// Square.tsx
import React, { useState, useCallback } from "react";
import { Handle, Position, NodeProps } from "reactflow";
import { NodeResizer } from "@reactflow/node-resizer";
import { D3DragEvent } from 'd3-drag';
import "@reactflow/node-resizer/dist/style.css";

interface SquareProps extends NodeProps {}

export function Square({ data, selected }: SquareProps) {
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
        keepAspectRatio
      />
      {/* <Handle
        id="right"
        type="source"
        position={Position.Right}
        className="-right-5 w-3 h-3 bg-blue-400/80"
      /> */}
      <div className="absolute inset-0 bg-transparent text-white p-2">
        {data.label}
      </div>
      <Handle
        id="left"
        type="source"
        position={Position.Left}
        className="-left-5 w-3 h-3 bg-blue-400/80"
      />
      {/* <Handle
        id="top"
        type="source"
        position={Position.Top}
        className="-top-5 w-3 h-3 bg-blue-400/80"
      /> */}
      {/* <Handle
        id="bottom"
        type="source"
        position={Position.Bottom}
        className="-bottom-5 w-3 h-3 bg-blue-400/80"
      /> */}
    </div>
  );
}
