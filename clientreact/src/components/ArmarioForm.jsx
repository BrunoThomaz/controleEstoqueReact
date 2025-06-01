import { useState } from "react";

export default function ArmarioForm({ onAdd }) {
  const [nome, setNome] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nome.trim()) return;
    onAdd(nome);
    setNome("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 flex gap-4">
      <input
        type="text"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        placeholder="Nome do armário"
        className="border p-2 rounded w-full"
      />
      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Adicionar Armário
      </button>
    </form>
  );
}
