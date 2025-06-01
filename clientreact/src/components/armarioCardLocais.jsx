import PrateleiraCard from "./PrateleiraCard";

const ArmarioCardLocais = ({ armario, onAddPrateleira, onEditArmario, onDeleteArmario, onAddCaixa, onEditPrateleira, onDeletePrateleira, onEditCaixa, onDeleteCaixa }) => (
  <div className="bg-white shadow rounded-2xl p-4 border">
    <div className="flex justify-between items-center mb-2">
      <h2 className="text-xl font-semibold text-blue-800">{armario.nome}</h2>
      <div className="flex gap-2 text-sm">
        <button onClick={() => onAddPrateleira(armario._id)} className="hover:text-green-600">➕ Prateleira</button>
        <button onClick={() => onEditArmario(armario)} className="hover:text-blue-600">✏️</button>
        <button onClick={() => onDeleteArmario(armario._id)} className="hover:text-red-600">❌</button>
      </div>
    </div>
    <div className="space-y-3">
      {armario.prateleiras?.map(prat => (
        <PrateleiraCard
          key={prat._id}
          prateleira={prat}
          armario={armario}
          onAddCaixa={() => onAddCaixa(armario, prat)}
          onEditPrateleira={() => onEditPrateleira(armario._id, prat)}
          onDeletePrateleira={() => onDeletePrateleira(armario._id, prat._id)}
          onEditCaixa={onEditCaixa}
          onDeleteCaixa={onDeleteCaixa}
        />
      ))}
    </div>
  </div>
);

export default ArmarioCardLocais;
