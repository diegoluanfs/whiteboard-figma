import { useState, useCallback } from "react";
import { Handle, Position } from "reactflow";
import { NodeResizer } from "@reactflow/node-resizer";
import { D3DragEvent } from 'd3-drag';
import "@reactflow/node-resizer/dist/style.css";
import { SquareProps } from './Types';
import { squareStyles } from './Styles';

export function Square({ data, selected }: SquareProps) {
  const [size, setSize] = useState({ width: 200, height: 200 });

  const handleResize = useCallback((_event: D3DragEvent<HTMLDivElement, null, any>, { width, height }: { width: number, height: number }) => {
    const newSize = Math.max(width, height);
    setSize({ width: newSize, height: newSize });
  }, []);

  return (
    <div className="bg-violet-500 rounded relative" style={squareStyles(size, selected) as React.CSSProperties}>
      <NodeResizer
        minWidth={100}
        minHeight={100}
        isVisible={selected}
        lineClassName="border-blue-400"
        handleClassName="h-3 w-3 bg-white border-2 rounded border-blue-400"
        onResize={handleResize}
        keepAspectRatio
      />
      <div className="absolute inset-0 bg-transparent text-white p-2">
        {data.label}
      </div>
      <Handle
        id="left"
        type="source"
        position={Position.Left}
        className="-left-5 w-3 h-3 bg-blue-400/80"
      />
    </div>
  );
}