const CaixaTag = ({ caixa, onEdit, onDelete }) => (
  <div className="bg-blue-100 text-blue-800 text-sm px-3 py-2 rounded-full shadow flex items-center justify-between gap-2">
    <span>📦 {caixa.nome}</span>
    <div className="flex gap-1">
      <button onClick={onEdit} className="text-xs hover:text-blue-600">✏️</button>
      <button onClick={onDelete} className="text-xs hover:text-red-600">❌</button>
    </div>
  </div>
);

export default CaixaTag;