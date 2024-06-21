import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (shapes: { message: string, id: string, type: string, parentId: string | null }[]) => void;
  id: string;
  initialText: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSave, initialText }) => {
  const [textareas, setTextareas] = useState([initialText]);

  useEffect(() => {
    setTextareas([initialText]);
  }, [initialText]);

  const handleSave = () => {
    let parentId: string;
  
    const shapes = textareas.map((textarea, index) => {
      const id = uuidv4();
  
      if (index === 0) {
        parentId = id;
      }
  
      return {
        type: index === 0 ? 'square' : 'rectangle',
        message: textarea,
        id: id,
        parentId: index === 0 ? null : parentId
      };
    });
  
    console.log('shapes: ', shapes);
    onSave(shapes);
    setTextareas(['']);
    onClose();
  };

  const addTextarea = () => {
    setTextareas(prevTextareas => [...prevTextareas, '']);
  };

  const removeTextarea = (index: number) => {
    setTextareas(prevTextareas => prevTextareas.filter((_, i) => i !== index));
  };

  const isSaveButtonDisabled = !(textareas.length > 1 || (textareas[0] && textareas[0].trim() !== ''));

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded">
        {textareas.map((textarea, index) => (
          <div key={index} className="flex items-start">
            <textarea
              value={textarea}
              placeholder='Escreva sua mensagem'
              onChange={(e) => {
                const newTextareas = [...textareas];
                newTextareas[index] = e.target.value;
                setTextareas(newTextareas);
              }}
              className={`w-full p-2 border border-gray-300 rounded mb-2 ${index === 0 ? 'h-40' : 'h-10'}`}
            />
            {index !== 0 && <button onClick={() => removeTextarea(index)} className="ml-2 bg-red-500 text-white px-2 py-1 rounded">Excluir</button>}
          </div>
        ))}
        <button onClick={addTextarea} className="bg-blue-500 text-white px-4 py-2 rounded mb-2">Adicionar Condições</button>
        <div className="flex justify-between mt-2">
          <button onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded">Cancelar</button>
          <button
            onClick={handleSave}
            className={`px-4 py-2 rounded mr-2 ${!isSaveButtonDisabled ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
            disabled={isSaveButtonDisabled}
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;