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
import Modal from './components/Modal';
import { v4 as uuidv4 } from 'uuid';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

type NodeType = "square" | "circle" | "diamond";

interface Node {
  id: string;
  type: NodeType;
  position: { x: number; y: number };
  data: { label: string; uniqueId?: string; textareaValue?: string };
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
    data: { label: 'Mensagem Recebida' },
  },
];

function App() {
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [nodes, setNodes, onNodesChange] = useNodesState(INITIAL_NODES);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [toolbarVisible, setToolbarVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [nodeTypeToAdd, setNodeTypeToAdd] = useState<NodeType | null>(null);
  const [editNodeData, setEditNodeData] = useState<{ id: string; text: string } | null>(null);

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

  const addNode = useCallback((type: NodeType) => {
    setNodeTypeToAdd(type);
    setModalOpen(true);
  }, []);

  const handleSave = useCallback((text: string) => {
    if (nodeTypeToAdd) {
      const newId = uuidv4();
      const newNode: Node = {
        id: newId,
        type: nodeTypeToAdd,
        position: { x: 0, y: 0 },
        data: { label: text, uniqueId: uuidv4(), textareaValue: text }, // Atribuindo textareaValue ao criar o nó
      };
  
      const dataToSave = {
        nodes: [...nodes, newNode], // Incluindo o novo nó na lista de nós a serem salvos
        edges,
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
  
      setNodes(prevNodes => [...prevNodes, newNode]);
      setNodeTypeToAdd(null);
      setModalOpen(false);
    } else if (editNodeData) {
      setNodes(prevNodes => prevNodes.map(node => 
        node.id === editNodeData.id ? { ...node, data: { ...node.data, label: text, textareaValue: text } } : node
      ));
      setEditNodeData(null);
      setModalOpen(false);
    }
  }, [nodeTypeToAdd, nodes, edges, setNodes, editNodeData]);

  const handleNodeClick = useCallback((event: React.MouseEvent, node: ReactFlowNode) => {
    setSelectedNode(node.id);
  }, []);

  const handleNodeDoubleClick = useCallback((event: React.MouseEvent, node: ReactFlowNode) => {
    setEditNodeData({ id: node.id, text: node.data.textareaValue || '' });
    setModalOpen(true);
  }, []);

  const handleDeleteNode = useCallback(() => {
    if (selectedNode) {
      const node = nodes.find((n) => n.id === selectedNode);
      if (node && node.type !== 'circle') {
        setNodes((nds) => nds.filter((n) => n.id !== selectedNode));
        setEdges((eds) => eds.filter((edge) => edge.source !== selectedNode && edge.target !== selectedNode));
        setSelectedNode(null);
      }
    }
  }, [selectedNode, nodes, setNodes, setEdges]);

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
        onNodeDoubleClick={handleNodeDoubleClick} // Adicionando o evento de duplo clique
        connectionMode={ConnectionMode.Loose}
        defaultEdgeOptions={{
          type: "default",
        }}
        className="absolute top-0 left-0 w-full h-full"
      >
        <Background gap={12} size={2} color={zinc[200]} />
        <Controls />
      </ReactFlow>

      {toolbarVisible && (
        <Toolbar
          openModal={(type: NodeType) => addNode(type)}
        />
      )}

      <Modal
        isOpen={modalOpen}
        onClose={() => { setModalOpen(false); setEditNodeData(null); }}
        onSave={handleSave}
        initialText={editNodeData ? editNodeData.text : ''} // Passando o texto inicial para o modal
      />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-4 absolute bottom-0 right-0 z-10"
        onClick={() => {
          const dataToSave = {
            nodes,
            edges,
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
            // Aqui você pode adicionar qualquer lógica adicional após o salvamento, se necessário
          })
          .catch((error) => {
            console.error('Error:', error);
          });
        }}
      >
        Salvar Fluxo
      </button>

    </div>
  );
}

export default App;
