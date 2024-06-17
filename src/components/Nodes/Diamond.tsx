import { NodeResizer } from '@reactflow/node-resizer';
import { NodeProps, Handle, Position } from "reactflow";

import '@reactflow/node-resizer/dist/style.css';

export function Diamond({ data, selected }: NodeProps) {
  return (
    <div className="bg-violet-500 w-full h-full min-w-[200px] min-h-[200px] relative transform rotate-45">
      <NodeResizer 
        minWidth={200}
        minHeight={200}
        isVisible={selected}
        lineClassName="border-blue-400"
        handleClassName="h-3 w-3 bg-white border-2 rounded border-blue-400"
      />
      <Handle
        id="right"
        type="source"
        position={Position.Right}
        className="transform -rotate-45 -right-5 w-3 h-3 bg-blue-400/80"
      />
      <Handle
        id="left"
        type="source"
        position={Position.Left}
        className="transform -rotate-45 -left-5 w-3 h-3 bg-blue-400/80"
      />
      <Handle
        id="top"
        type="source"
        position={Position.Top}
        className="transform -rotate-45 -top-5 w-3 h-3 bg-blue-400/80"
      />
      <Handle
        id="bottom"
        type="source"
        position={Position.Bottom}
        className="transform -rotate-45 -bottom-5 w-3 h-3 bg-blue-400/80"
      />
      <div className="transform -rotate-45">
        {data.label}
      </div>
    </div>
  );
}
