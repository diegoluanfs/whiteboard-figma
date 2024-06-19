// src/components/Toolbar.tsx
import React, { useState } from 'react';
import * as Toolbar from '@radix-ui/react-toolbar';
import Modal from './Modal';

interface ToolbarProps {
  onSave: (nodeType: 'square' | 'diamond') => void; // Função para salvar e adicionar o nó
}

const ToolbarComponent: React.FC<ToolbarProps> = ({ onSave }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nodeToAdd, setNodeToAdd] = useState<'square' | 'diamond' | null>(null);

  const openModal = (nodeType: 'square' | 'diamond') => {
    setNodeToAdd(nodeType);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNodeToAdd(null);
  };

  const handleSave = () => {
    if (nodeToAdd) {
      onSave(nodeToAdd);
    }
    closeModal();
  };

  return (
    <>
      <Toolbar.Root
        className="fixed bottom-20 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-lg border-zinc-300 px-8 h-30 w-96 overflow-hidden flex justify-around items-center"
      >
        <div className="flex flex-col items-center justify-center">
          <span className="text text-gray-700 mt-0">Resposta</span>
          <Toolbar.Button
            onClick={() => openModal('square')}
            className="w-10 h-10 bg-violet-500 mt-2 rounded transition-transform hover:-translate-y-3 flex items-center justify-center"
          >
            <span className="sr-only">Resposta</span>
          </Toolbar.Button>
        </div>
        <div className="flex flex-col items-center justify-center">
          <span className="text text-gray-700 mt-0">Condicional</span>
          <Toolbar.Button
            onClick={() => openModal('diamond')}
            className="w-10 h-10 bg-violet-500 mt-2 transform rotate-45 transition-transform hover:-translate-y-3 flex items-center justify-center"
          >
            <span className="sr-only">Condicional</span>
          </Toolbar.Button>
        </div>
      </Toolbar.Root>
      <Modal isOpen={isModalOpen} onClose={closeModal} onSave={handleSave}>
        {nodeToAdd === 'square' && (
          <textarea
            className="w-full h-40 border border-gray-300 rounded p-2"
            placeholder="Digite sua resposta aqui..."
            autoFocus
          />
        )}
        {nodeToAdd === 'diamond' && (
          <textarea
            className="w-full h-40 border border-gray-300 rounded p-2"
            placeholder="Digite a condição aqui..."
            autoFocus
          />
        )}
      </Modal>
    </>
  );
};

export default ToolbarComponent;
