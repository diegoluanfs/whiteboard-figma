// src/components/Modal.tsx
import React, { useState } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (text: string) => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSave }) => {
  const [text, setText] = useState('');

  if (!isOpen) return null;

  const handleSave = () => {
    if (text.trim()) {
      onSave(text);
      onClose();
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex items-center justify-center z-10">
      <div className="bg-white rounded-lg p-8">
        <h2 className="text-xl font-bold mb-4">Coloque a resposta aqui</h2>
        <textarea
          className="w-full h-40 border border-gray-300 rounded p-2"
          placeholder="Digite seu conteúdo aqui..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="mt-4 flex justify-between">
          <button
            className="bg-gray-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className={`bg-blue-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ${!text.trim() && 'opacity-50 cursor-not-allowed'}`}
            onClick={handleSave}
            disabled={!text.trim()}
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
