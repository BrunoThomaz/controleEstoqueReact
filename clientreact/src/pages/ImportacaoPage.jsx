import { useState } from "react";
import axios from "axios";
import NavBar from "../components/NavBar";

const ImportacaoPage = () => {
  const [arquivo, setArquivo] = useState(null);
  const [mensagem, setMensagem] = useState("");

  const handleUpload = async () => {
    if (!arquivo) return;

    const formData = new FormData();
    formData.append("arquivo", arquivo);

    try {
      const res = await axios.post("http://localhost:3001/api/importacao/importar", formData);
      setMensagem(res.data.mensagem);
    } catch (err) {
      console.error(err);
      setMensagem("Erro ao importar dados.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <div className="p-6 max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Importação de Dados</h1>
        <div className="bg-white p-6 rounded shadow">
          <input
            type="file"
            accept=".csv"
            onChange={(e) => setArquivo(e.target.files[0])}
            className="mb-4"
          />
          <button
            onClick={handleUpload}
            className="bg-green-600 text-white px-6 py-2 rounded shadow hover:bg-green-700"
          >
            📥 Importar CSV
          </button>
          {mensagem && <p className="mt-4 text-blue-600">{mensagem}</p>}
        </div>
      </div>
    </div>
  );
};

export default ImportacaoPage;
