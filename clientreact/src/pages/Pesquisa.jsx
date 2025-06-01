import { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../components/NavBar";

const Pesquisa = () => {
  const [codigoProduto, setCodigoProduto] = useState("");
  const [codigoFluig, setCodigoFluig] = useState("");
  const [resultados, setResultados] = useState([]);
  const [mensagem, setMensagem] = useState("");
  const [armarios, setArmarios] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/api/armarios")
      .then(res => setArmarios(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleBuscar = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/pesquisa", {
        params: {
          codigoProduto,
          codigoFluig
        }
      });
      setResultados(res.data);
      setMensagem(`Encontrados ${res.data.length} resultados.`);
    } catch (err) {
      console.error(err);
      setMensagem("Erro ao buscar produtos.");
    }
  };

  const handleBuscarProdutosCaixa = async (idArmario, idPrateleira, idCaixa) => {
    try {
      const res = await axios.get(`http://localhost:3001/api/armarios/${idArmario}/prateleira/${idPrateleira}/caixa/${idCaixa}`);
      setResultados(res.data.produtos);
      setMensagem(`Resultados para caixa selecionada.`);
    } catch (err) {
      console.error(err);
      setMensagem("Erro ao buscar produtos na caixa.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <div className="p-6 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Pesquisa de Produtos</h1>

        <div className="bg-white p-6 rounded-xl shadow mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Código do Produto"
              value={codigoProduto}
              onChange={(e) => setCodigoProduto(e.target.value)}
              className="border border-gray-300 rounded px-4 py-2 w-full"
            />
            <input
              type="text"
              placeholder="Código Fluig"
              value={codigoFluig}
              onChange={(e) => setCodigoFluig(e.target.value)}
              className="border border-gray-300 rounded px-4 py-2 w-full"
            />
          </div>
          <button
            onClick={handleBuscar}
            className="bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700"
          >
            🔍 Buscar
          </button>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Navegar por Locais</h2>
          <div className="space-y-4">
            {armarios.map((armario) => (
              <div key={armario._id} className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-blue-700 font-bold mb-2">{armario.nome}</h3>
                <div className="ml-4 space-y-2">
                  {armario.prateleiras.map((prateleira) => (
                    <div key={prateleira._id}>
                      <h4 className="text-green-600 font-semibold mb-2">{prateleira.nome}</h4>
                      <div className="flex flex-wrap gap-2 ml-4">
                        {prateleira.caixas.map((caixa) => (
                          <button
                            key={caixa._id}
                            onClick={() => handleBuscarProdutosCaixa(armario._id, prateleira._id, caixa._id)}
                            className="px-4 py-2 bg-yellow-100 hover:bg-yellow-200 text-yellow-900 rounded-lg text-sm font-medium shadow"
                          >
                            📦 {caixa.nome}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {mensagem && <p className="mb-4 text-gray-700">{mensagem}</p>}

        {resultados.length > 0 && (
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-4">Resultados</h2>
            <table className="w-full table-auto border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2 border">Código</th>
                  <th className="p-2 border">Fluig</th>
                  <th className="p-2 border">Nome</th>
                  <th className="p-2 border">Quantidade</th>
                </tr>
              </thead>
              <tbody>
                {resultados.map((prod, i) => (
                  <tr key={i} className="text-center">
                    <td className="p-2 border">{prod.codigoProduto}</td>
                    <td className="p-2 border">{prod.codigoFluig}</td>
                    <td className="p-2 border">{prod.nome}</td>
                    <td className="p-2 border">{prod.quantidade}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pesquisa;
