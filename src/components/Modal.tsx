import React, { useState, useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (text: string) => void;
  initialText: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSave, initialText }) => {
  const [text, setText] = useState(initialText);
  const [isTextEntered, setIsTextEntered] = useState(false); // Estado para controlar se há texto no textarea

  useEffect(() => {
    setText(initialText);
  }, [initialText]);

  useEffect(() => {
    // Verifica se há texto no textarea
    setIsTextEntered(text.trim().length > 0);
  }, [text]);

  const handleSave = () => {
    onSave(text.trim()); // Salvando apenas o texto trimmado
    setText('');
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded">
        <textarea
          value={text}
          placeholder='Escreva sua mensagem'
          onChange={(e) => setText(e.target.value)}
          className="w-full h-40 p-2 border border-gray-300 rounded"
        />
        <div className="flex justify-between mt-2">
          <button onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded">Close</button>
          <button
            onClick={handleSave}
            className={`px-4 py-2 rounded mr-2 ${isTextEntered ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
            disabled={!isTextEntered} // Desabilita o botão se não houver texto no textarea
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
