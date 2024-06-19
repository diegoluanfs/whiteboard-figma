import { NodeResizer } from '@reactflow/node-resizer';
import { NodeProps, Handle, Position } from "reactflow";

import '@reactflow/node-resizer/dist/style.css';

export function Circle({ data, selected }: NodeProps) {
  return (
    <div className="bg-white border-4 border-violet-500 rounded-full w-full h-full min-w-[50px] min-h-[50px] flex items-center justify-center">
      {/* <NodeResizer 
        minWidth={50}
        minHeight={50}
        isVisible={selected}
        lineClassName="border-blue-400"
        handleClassName="h-3 w-3 bg-white border-2 rounded border-blue-400"
      /> */}
      <Handle
        id="right"
        type="source"
        position={Position.Right}
        className="-right-5 w-3 h-3 bg-blue-400/80"
      />
      {/* <Handle
        id="left"
        type="source"
        position={Position.Left}
        className="-left-5 w-3 h-3 bg-blue-400/80"
      /> */}
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
      {data.label}
    </div>
  );
}
