import ReactFlow, {
  addEdge,
  Background,
  Connection,
  ConnectionMode,
  Controls,
  useEdgesState,
  useNodesState,
} from "reactflow";
import { zinc } from "tailwindcss/colors";
import "reactflow/dist/style.css";
import { Square } from "./components/Nodes/Square";
import { Circle } from "./components/Nodes/Circle";
import { Diamond } from "./components/Nodes/Diamond";
import { DefaultEdge } from "./components/Edges/DefaultEdge";
import React, { useCallback } from "react";
import Toolbar from './components/Toolbar';

type NodeType = "square" | "circle" | "diamond";

interface Node {
  id: string;
  type: NodeType;
  position: { x: number; y: number };
  data: { label: string };
}

const NODE_TYPES = {
  square: Square,
  circle: Circle,
  diamond: Diamond
};

const EDGE_TYPES = {
  default: DefaultEdge,
};

const INITIAL_NODES: Node[] = [
  {
    id: "start",
    type: "circle",
    position: {
      x: 200,
      y: 200,
    },
    data: { label: 'Node Start' },
  },
  {
    id: crypto.randomUUID(),
    type: "square",
    position: {
      x: 650,
      y: 200,
    },
    data: { label: 'Node 1' },
  },
  {
    id: crypto.randomUUID(),
    type: "diamond",
    position: {
      x: 1000,
      y: 200,
    },
    data: { label: 'Node 4' },
  },
];

function App() {
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [nodes, setNodes, onNodesChange] = useNodesState(INITIAL_NODES);

  const onConnect = useCallback(
    (connection: Connection) => {
      // Verifica se a conexão é entre nós diferentes
      if (connection.source !== connection.target) {
        const existingEdgeIndex = edges.findIndex(
          (edge) =>
            edge.source === connection.source && edge.target === connection.target
        );
  
        // Verifica se já existe um edge com a mesma origem e destino
        if (existingEdgeIndex !== -1) {
          // Remove o edge existente
          const newEdges = [...edges];
          newEdges.splice(existingEdgeIndex, 1);
          setEdges(newEdges);
        }
  
        // Adiciona o edge apenas se não houver um existente
        setEdges((prevEdges) => addEdge(connection, prevEdges));
      }
    },
    [edges, setEdges]
  );
   

  const addNode = useCallback((type: NodeType) => {
    const newNode: Node = {
      id: crypto.randomUUID(),
      type,
      position: { x: 0, y: 0 },
      data: { label: `${type.charAt(0).toUpperCase()}${type.slice(1)} Node` },
    };
    setNodes((prevNodes) => [...prevNodes, newNode]);
  }, [setNodes]);

  return (
    <div className="w-screen h-screen">
      <ReactFlow
        nodeTypes={NODE_TYPES}
        edgeTypes={EDGE_TYPES}
        nodes={nodes}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodesChange={onNodesChange}
        connectionMode={ConnectionMode.Loose}
        defaultEdgeOptions={{
          type: "default",
        }}
      >
        <Background gap={12} size={2} color={zinc[200]} />
        <Controls />
      </ReactFlow>

      
      <Toolbar
        addSquareNode={() => addNode('square')}
        addCircleNode={() => addNode('circle')}
        addDiamondNode={() => addNode('diamond')}
      />
    </div>
  );
}

export default App;
