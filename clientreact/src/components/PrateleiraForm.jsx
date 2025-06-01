import { useState } from "react";

export default function PrateleiraForm({ idArmario, onAdd }) {
  const [nome, setNome] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nome.trim()) return;
    onAdd(idArmario, nome);
    setNome("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mt-4 ml-4">
      <input
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        placeholder="Nova prateleira"
        className="border p-1 rounded w-full"
      />
      <button className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">
        +
      </button>
    </form>
  );
}
