import ReactFlow, {
  addEdge,
  Background,
  Connection,
  ConnectionMode,
  Controls,
  useEdgesState,
  useNodesState,
  Node as ReactFlowNode,
} from "reactflow";
import { zinc } from "tailwindcss/colors";
import "reactflow/dist/style.css";
import { Square } from "./components/Nodes/Square";
import { Circle } from "./components/Nodes/Circle";
import { Diamond } from "./components/Nodes/Diamond";
import { DefaultEdge } from "./components/Edges/DefaultEdge";
import React, { useCallback, useState, useEffect } from "react";
import Toolbar from './components/Toolbar';
import { v4 as uuidv4 } from 'uuid';

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
  diamond: Diamond,
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
    data: { label: 'Node Start (start)' },
  },
  {
    id: uuidv4(),
    type: "square",
    position: {
      x: 650,
      y: 200,
    },
    data: { label: `${uuidv4()}` },
  },
];

const NodeWithEditableLabel = ({ id, data }: { id: string, data: { label: string } }) => {
  const [label, setLabel] = useState(data.label);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLabel(event.target.value);
    // handleLabelChange(id, event.target.value);
  };

  return (
    <div className="relative">
      <input
        className="bg-transparent border-none text-center"
        value={label}
        onChange={handleChange}
        style={{ width: '100%' }}
      />
      <div className="absolute top-0 right-0 mt-2 mr-2 bg-gray-200 p-1 text-xs rounded shadow">
        {id}
      </div>
    </div>
  );
};

function App() {
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [nodes, setNodes, onNodesChange] = useNodesState(INITIAL_NODES);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const onConnect = useCallback(
    (connection: Connection) => {
      if (connection.source !== connection.target) {
        const existingEdgeIndex = edges.findIndex(
          (edge) =>
            edge.source === connection.source && edge.target === connection.target
        );

        if (existingEdgeIndex !== -1) {
          const newEdges = [...edges];
          newEdges.splice(existingEdgeIndex, 1);
          setEdges(newEdges);
        }

        setEdges((prevEdges) => addEdge(connection, prevEdges));
      }
    },
    [edges, setEdges]
  );

  const addNode = useCallback((type: NodeType) => {
    const newId = uuidv4();
    const newNode: Node = {
      id: newId,
      type,
      position: { x: 0, y: 0 },
      data: { label: `${newId}` },
    };
    setNodes((prevNodes) => [...prevNodes, newNode]);
  }, [setNodes]);

  const handleLabelChange = useCallback((id: string, newLabel: string) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === id) {
          return {
            ...node,
            data: {
              ...node.data,
              label: newLabel,
            },
          };
        }
        return node;
      })
    );
  }, [setNodes]);

  const handleSave = useCallback(() => {
    const dataToSave = {
      nodes: nodes,
      edges: edges,
    };

    fetch('https://localhost:7154/api/ProcessFlow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSave),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });

    console.log(JSON.stringify(dataToSave, null, 2));
  }, [nodes, edges]);

  const handleNodeClick = useCallback((event: React.MouseEvent, node: ReactFlowNode) => {
    setSelectedNode(node.id);
  }, []);

  const handleDeleteNode = useCallback(() => {
    if (selectedNode) {
      // alert(`Deletando o nó com ID: ${selectedNode}`);
      setNodes((nds) => nds.filter((node) => node.id !== selectedNode));
      setEdges((eds) => eds.filter((edge) => edge.source !== selectedNode && edge.target !== selectedNode));
      setSelectedNode(null);
    }
  }, [selectedNode, setNodes, setEdges]);
  
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Delete' || event.key === 'Del') {
        handleDeleteNode();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleDeleteNode]);

  return (
    <div className="w-screen h-screen">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-4"
        onClick={handleSave}
      >
        Salvar
      </button>
      <ReactFlow
        nodeTypes={NODE_TYPES}
        edgeTypes={EDGE_TYPES}
        nodes={nodes}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodesChange={onNodesChange}
        onNodeClick={handleNodeClick}
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
