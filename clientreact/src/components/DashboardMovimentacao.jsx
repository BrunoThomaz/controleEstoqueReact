import { useEffect, useState } from "react";
import axios from "axios";

const DashboardMovimentacao = () => {
  const [resumo, setResumo] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:3001/api/movimentacoes/resumo")
      .then(res => setResumo(res.data))
      .catch(console.error);
  }, []);

  if (!resumo) return <p className="text-center mt-10">Carregando dados...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Dashboard de Estoque</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-green-100 text-green-800 p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Entradas Totais</h2>
          <p className="text-3xl">{resumo.totalEntradas}</p>
        </div>

        <div className="bg-red-100 text-red-800 p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Saídas Totais</h2>
          <p className="text-3xl">{resumo.totalSaidas}</p>
        </div>

        <div className="bg-blue-100 text-blue-800 p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Produtos únicos movimentados</h2>
          <p className="text-3xl">{resumo.entradas.length}</p>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-2">Resumo por Produto</h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Código</th>
              <th className="p-2 border">Entradas</th>
              <th className="p-2 border">Saídas</th>
            </tr>
          </thead>
          <tbody>
            {resumo.entradas.map((entrada) => {
              const saida = resumo.saidas.find(s => s._id === entrada._id);
              return (
                <tr key={entrada._id} className="hover:bg-gray-50">
                  <td className="p-2 border">{entrada._id}</td>
                  <td className="p-2 border">{entrada.total}</td>
                  <td className="p-2 border">{saida?.total || 0}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardMovimentacao;
