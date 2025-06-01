import CaixaTag from "./CaixaTag";

const PrateleiraCard = ({ armario, prateleira, onAddCaixa, onEditPrateleira, onDeletePrateleira, onEditCaixa, onDeleteCaixa }) => (
  <div className="bg-gray-100 p-3 rounded-xl shadow-inner">
    <div className="flex justify-between items-center mb-2">
      <h3 className="font-medium text-gray-700">{prateleira.nome}</h3>
      <div className="flex gap-2 text-sm">
        <button onClick={onAddCaixa} className="hover:text-green-600">➕ Caixa</button>
        <button onClick={onEditPrateleira} className="hover:text-blue-600">✏️</button>
        <button onClick={onDeletePrateleira} className="hover:text-red-600">❌</button>
      </div>
    </div>
    <div className="flex flex-wrap gap-2">
      {prateleira.caixas?.map(caixa => (
        <CaixaTag
          key={caixa._id}
          caixa={caixa}
          onEdit={() => onEditCaixa(prateleira._id, caixa)}
          onDelete={() => onDeleteCaixa(armario._id,prateleira._id, caixa._id)}
        />
      ))}
    </div>
  </div>
);

export default PrateleiraCard;
