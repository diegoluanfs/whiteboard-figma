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
      className="fixed bottom-20 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-lg border-zinc-300 px-8 h-20 w-96 overflow-hidden flex justify-around items-center"
    >
      <Toolbar.Button
        onClick={addSquareNode}
        className="w-16 h-16 bg-violet-500 mt-6 rounded transition-transform hover:-translate-y-2 flex items-center justify-center"
      >
        <span className="text-white">Square</span>
      </Toolbar.Button>
      {/* <Toolbar.Button
        onClick={addCircleNode}
        className="w-16 h-16 bg-violet-500 mt-6 rounded-full transition-transform hover:-translate-y-2 flex items-center justify-center"
      >
        <span className="text-white">Circle</span>
      </Toolbar.Button> */}
      <Toolbar.Button
        onClick={addDiamondNode}
        className="w-12 h-12 bg-violet-500 mt-6 transform rotate-45 transition-transform hover:-translate-y-2 flex items-center justify-center"
      >
        <span className="text-white transform -rotate-45">Diamond</span>
      </Toolbar.Button>
    </Toolbar.Root>
  );
};

export default ToolbarComponent;
