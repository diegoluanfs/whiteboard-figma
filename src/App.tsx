import React, { useCallback, useState, useEffect } from 'react';
import ReactFlow, {
  addEdge,
  Background,
  Connection,
  ConnectionMode,
  Controls,
  useEdgesState,
  useNodesState,
  Node as ReactFlowNode,
} from 'reactflow';
import { zinc } from 'tailwindcss/colors';
import 'reactflow/dist/style.css';
import { Square } from './components/Nodes/Square';
import { Circle } from './components/Nodes/Circle';
import { Diamond } from './components/Nodes/Diamond';
import { DefaultEdge } from './components/Edges/DefaultEdge';
import ToolbarComponent from './components/Toolbar';
import { v4 as uuidv4 } from 'uuid';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

type NodeType = 'square' | 'circle' | 'diamond';

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
    id: 'start',
    type: 'circle',
    position: {
      x: 200,
      y: 200,
    },
    data: { label: 'Mensagem Recebida' },
  },
];

function App() {
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [nodes, setNodes, onNodesChange] = useNodesState(INITIAL_NODES);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [selectedNodeType, setSelectedNodeType] = useState<NodeType | null>(null);
  const [toolbarVisible, setToolbarVisible] = useState(false);

  const toggleToolbar = () => {
    setToolbarVisible((prev) => !prev);
  };

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

  const addNode = useCallback(
    (type: NodeType) => {
      const newId = uuidv4();
      const newNode: Node = {
        id: newId,
        type,
        position: { x: 0, y: 0 },
        data: { label: `${newId}` },
      };
      setNodes((prevNodes) => [...prevNodes, newNode]);
    },
    [setNodes]
  );

  const handleSave = useCallback(
    (nodeType: 'square' | 'diamond') => {
      addNode(nodeType);

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
        .then((response) => response.json())
        .then((data) => {
          console.log('Success:', data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });

      console.log(JSON.stringify(dataToSave, null, 2));
    },
    [addNode, nodes, edges]
  );

  const handleNodeClick = useCallback((event: React.MouseEvent, node: ReactFlowNode) => {
    setSelectedNode(node.id);
    setSelectedNodeType(node.type as NodeType);
  }, []);

  const handleDeleteNode = useCallback(() => {
    if (selectedNode && selectedNodeType !== 'circle') {
      setNodes((nds) => nds.filter((node) => node.id !== selectedNode));
      setEdges((eds) => eds.filter((edge) => edge.source !== selectedNode && edge.target !== selectedNode));
      setSelectedNode(null);
      setSelectedNodeType(null);
    }
  }, [selectedNode, selectedNodeType, setNodes, setEdges]);

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
    <div className="w-screen h-screen relative">
      <Fab size="medium" color="secondary" aria-label="add" className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <AddIcon onClick={toggleToolbar} />
      </Fab>

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
        defaultEdgeOptions={{ type: 'default' }}
        className="absolute top-0 left-0 w-full h-full"
      >
        <Background gap={12} size={2} color={zinc[200]} />
        <Controls />
      </ReactFlow>

      {toolbarVisible && (
        <ToolbarComponent
          onSave={handleSave}
        />
      )}
    </div>
  );
}

export default App;
