// components/Nodes/Node.tsx

import { Node as ReactFlowNode } from "reactflow";

export interface NodeData {
  label: string;
  uniqueId?: string;
  textareaValue?: string;
  childListIds: string[];
  nodes: ReactFlowNode[];
  setNodes: React.Dispatch<React.SetStateAction<ReactFlowNode[]>>;
}

export interface CustomNode {
  id: string;
  type: string;
  position: { x: number; y: number };
  data: NodeData;
}
