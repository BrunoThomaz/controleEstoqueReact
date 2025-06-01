import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../components/NavBar";

const Caixa = () => {
  const { caixaId, armarioId, prateleiraId } = useParams();
  const [caixa, setCaixa] = useState(null);
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    // Carregar dados da caixa
    axios.get(`http://localhost:3001/api/armarios/${armarioId}/prateleira/${prateleiraId}/caixa/${caixaId}`)
      .then(res => {
        setCaixa(res.data)
        setProdutos(res.data.produtos)
      })
      .catch(console.error);

  }, [caixaId]);

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Caixa: {caixa?.nome}</h1>
        <p className="text-gray-700 mb-4">Quantidade total: {caixa?.quantidade}</p>
        <p className={`mb-6 ${caixa?.cheio ? "text-red-600" : "text-green-600"}`}>
          {caixa?.cheio ? "Cheia" : "Disponível"}
        </p>

        <h2 className="text-xl font-semibold mb-4">Produtos</h2>
        <div className="space-y-4">
          {produtos.length === 0 ? (
            <p className="text-gray-500">Nenhum produto armazenado.</p>
          ) : (
            produtos.map((prod) => (
              <div key={prod._id} className="bg-white p-4 shadow rounded">
                <p><strong>Código:</strong> {prod.codigoProduto}</p>
                <p><strong>Quantidade:</strong> {prod.quantidade}</p>
                {prod.temCodigoFluig && (
                  <p><strong>Código Fluig:</strong> {prod.codigoFluig}</p>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Caixa;
