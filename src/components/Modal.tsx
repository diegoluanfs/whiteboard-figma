// src/components/Modal.tsx
import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  children?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSave, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex items-center justify-center z-10">
      <div className="bg-white rounded-lg p-8">
        {children}
        <div className="mt-4 flex justify-end">
          <button
            className="bg-blue-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="bg-blue-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={onSave}
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
