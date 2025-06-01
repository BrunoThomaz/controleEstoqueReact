import { useState } from "react";

export default function CaixaForm({ idArmario, idPrateleira, onAdd }) {
  const [nome, setNome] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nome.trim()) return;
    onAdd(idArmario, idPrateleira, nome);
    setNome("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mt-2 ml-4">
      <input
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        placeholder="Nova caixa"
        className="border p-1 rounded w-full text-sm"
      />
      <button className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700 text-sm">
        +
      </button>
    </form>
  );
}
