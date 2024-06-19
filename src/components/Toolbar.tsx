// src/components/Toolbar.tsx
import React from 'react';
import * as Toolbar from '@radix-ui/react-toolbar';

interface ToolbarProps {
  addSquareNode: () => void;
  addCircleNode: () => void;
  addDiamondNode: () => void;
}

const ToolbarComponent: React.FC<ToolbarProps> = ({
  addSquareNode,
  addCircleNode,
  addDiamondNode,
}) => {
  return (
    <Toolbar.Root
      className="fixed bottom-20 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-lg border-zinc-300 px-8 h-30 w-96 overflow-hidden flex justify-around items-center"
    >
      <div className="flex flex-col items-center justify-center">
        <span className="text text-gray-700 mt-0">Resposta</span>
        <Toolbar.Button
          onClick={addSquareNode}
          className="w-10 h-10 bg-violet-500 mt-2 rounded transition-transform hover:-translate-y-3 flex items-center justify-center"
        >
          <span className="sr-only">Resposta</span>
        </Toolbar.Button>
      </div>
      {/* <div className="flex flex-col items-center justify-center">
        <Toolbar.Button
          onClick={addCircleNode}
          className="w-10 h-10 bg-violet-500 mt-2 rounded-full transition-transform hover:-translate-y-2 flex items-center justify-center"
        >
          <span className="sr-only">Circle</span>
        </Toolbar.Button>
        <span className="text-xs text-gray-700 mt-1">Circle</span>
      </div> */}
      <div className="flex flex-col items-center justify-center">
        <span className="text text-gray-700 mt-0">Condicional</span>
        <Toolbar.Button
          onClick={addDiamondNode}
          className="w-10 h-10 bg-violet-500 mt-2 transform rotate-45 transition-transform hover:-translate-y-3 flex items-center justify-center"
        >
          <span className="sr-only">Condicional</span>
        </Toolbar.Button>
      </div>
    </Toolbar.Root>
  );
};

export default ToolbarComponent;
