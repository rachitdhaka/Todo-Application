import React, { useState } from 'react'
import TodoModal from './TodoModal'

export function TodoHeader({ onTodoCreated }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <header className="mb-4 sm:mb-2 md:mb-2 flex justify-between items-center">
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-800 "><span className='instrument-serif-regular font-medium'>Todo Application</span></h1>
        {/* <p className="text-sm sm:text-base md:text-sm text-gray-600 mt-1 sm:mt-2">Manage your tasks efficiently</p> */}

        <button
          onClick={openModal}
          className='bg-sky-400 px-2 py-1 rounded-xl text-white cursor-pointer hover:bg-sky-500 transition-colors'
        >
          Create Todo
        </button>
      </header>

      <TodoModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onTodoCreated={onTodoCreated}
      />
    </>
  )
}
