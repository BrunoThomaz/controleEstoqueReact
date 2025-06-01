const ModalSuccesso = ({ show, message, onClose }) => {
  if (!show) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose} // fecha clicando no backdrop
    >
      <div
        className="bg-white rounded-lg shadow-lg p-6 max-w-sm mx-auto text-center relative"
        onClick={e => e.stopPropagation()} // impede fechar clicando no conteúdo
      >
        <div className="flex flex-col items-center space-y-4">
          {/* Ícone de sucesso */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>

          <h2 className="text-xl font-semibold text-gray-800">{message}</h2>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 focus:outline-none"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalSuccesso;
