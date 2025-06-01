import React from "react";

const ModalFormulario = ({ aberto, onClose, onSubmit, titulo, nome, setNome }) => {
  if (!aberto) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-md w-80 space-y-4">
        <h2 className="text-xl font-bold">{titulo}</h2>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Digite o nome"
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            onClick={onSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalFormulario;
