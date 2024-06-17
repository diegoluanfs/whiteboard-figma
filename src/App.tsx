import ReactFlow, {
  addEdge,
  Background,
  Connection,
  ConnectionMode,
  Controls,
  useEdgesState,
  useNodesState,
} from "reactflow";
import * as Toolbar from "@radix-ui/react-toolbar";
import { zinc } from "tailwindcss/colors";
import "reactflow/dist/style.css";
import { Square } from "./components/Nodes/Square";
import { Circle } from "./components/Nodes/Circle";
import { Diamond } from "./components/Nodes/Diamond";
import { DefaultEdge } from "./components/Edges/DefaultEdge";
import React, { useCallback, useEffect, useState } from "react";


const NODE_TYPES = {
  square: Square,
  circle: Circle,
  diamond: Diamond
};

const EDGE_TYPES = {
  default: DefaultEdge,
};

const INITIAL_NODES = [
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
] satisfies Node[];

function App() {
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [nodes, setNodes, onNodesChange] = useNodesState(INITIAL_NODES);

  const onConnect = useCallback(
    (connection: Connection) => {
      const existingEdge = edges.find(
        (edge) =>
          edge.source === connection.source && edge.target === connection.target
      );

      // Verifica se já existe um edge com a mesma origem e destino
      if (!existingEdge) {
        // Adiciona o edge apenas se não houver um existente
        setEdges((prevEdges) => addEdge(connection, prevEdges));
      }
    },
    [edges, setEdges]
  );

  const addNode = useCallback((type: NodeType) => {
    const newNode: Node = {
      id: `node-${nodes.length + 1}`,
      type,
      position: { x: 0, y: 0 },
      data: { label: `${type.charAt(0).toUpperCase()}${type.slice(1)} Node` },
    };
    setNodes((prevNodes) => [...prevNodes, newNode]);
  }, [nodes]);

  function addSquareNode() {
    setNodes(node => [
      ...nodes, 
      {
        id: crypto.randomUUID(),
        type: "square",
        data: {
          label: 'Square Node'
        },
        position: {
          x: 0,
          y: 0,
        },
      },
    ])
  }

  function addCircleNode() {
    setNodes(node => [
      ...nodes, 
      {
        id: crypto.randomUUID(),
        type: "circle",
        data: {
          label: 'Circle Node'
        },
        position: {
          x: 0,
          y: 0,
        },
      },
    ])
  }

  function addDiamondNode() {
    setNodes(node => [
      ...nodes, 
      {
        id: crypto.randomUUID(),
        type: "diamond",
        data: {
          label: 'Diamond Node'
        },
        position: {
          x: 0,
          y: 0,
        },
      },
    ])
  }

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

      <Toolbar.Root 
        className="fixed bottom-20 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-lg border-zinc-300 px-8 h-20 w-96 overflow-hidden flex justify-around items-center"
      >
        <Toolbar.Button 
          onClick={addSquareNode}
          className='w-16 h-16 bg-violet-500 mt-6 rounded transition-transform hover:-translate-y-2 flex items-center justify-center'
        >
          <span className="text-white">Square</span>
        </Toolbar.Button>
        <Toolbar.Button 
          onClick={addCircleNode}
          className='w-16 h-16 bg-violet-500 mt-6 rounded-full transition-transform hover:-translate-y-2 flex items-center justify-center'
        >
          <span className="text-white">Circle</span>
        </Toolbar.Button>
        <Toolbar.Button 
          onClick={addDiamondNode}
          className='w-12 h-12 bg-violet-500 mt-6 transform rotate-45 transition-transform hover:-translate-y-2 flex items-center justify-center'
        >
          <span className="text-white transform -rotate-45">Diamond</span>
        </Toolbar.Button>
      </Toolbar.Root>
    </div>
  );
}

export default App;
