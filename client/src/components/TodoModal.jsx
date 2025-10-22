import React, { useEffect } from 'react';
import TodoCreate from './TodoCreate';

const TodoModal = ({ isOpen, onClose, onTodoCreated }) => {
  
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);

      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleTodoCreated = () => {
    onTodoCreated();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-white/10 backdrop-blur-xs"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative z-10 w-full max-w-md mx-4 sm:mx-auto animate-fadeIn">
        <div className="bg-white rounded-lg shadow-2xl">
          {/* Modal Header */}
          <div className="flex items-center justify-between p-4 sm:p-5 border-b border-gray-200">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
              Create New Todo
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
              aria-label="Close modal"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-4 sm:p-6 max-h-[70vh] overflow-y-auto">
            <TodoCreate onTodoCreated={handleTodoCreated} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoModal;
