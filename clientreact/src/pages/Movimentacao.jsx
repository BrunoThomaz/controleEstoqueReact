import { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../components/NavBar";
import ModalSuccesso from "../components/ModalSucesso";

const EntradaProdutos = () => {
  const [armarios, setArmarios] = useState([]);
  const [armarioId, setArmarioId] = useState("");
  const [prateleiraId, setPrateleiraId] = useState("");
  const [caixaId, setCaixaId] = useState("");

  const [tipo, setTipo] = useState("entrada");
  const [codigoProduto, setCodigoProduto] = useState("");
  const [quantidade, setQuantidade] = useState(1);
  const [temCodigoFluig, setTemCodigoFluig] = useState(false);
  const [codigoFluig, setCodigoFluig] = useState("");

  const [showSuccess, setShowSuccess] = useState(false);
  const [produtosCaixa, setProdutosCaixa] = useState([]);


  useEffect(() => {
    axios.get("http://localhost:3001/api/armarios")
      .then(res => setArmarios(res.data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (tipo === "saida" && caixaId) {
      axios.get(`http://localhost:3001/api/armarios/${armarioId}/prateleira/${prateleiraId}/caixa/${caixaId}`)
        .then(res => {
            setProdutosCaixa(res.data.produtos);
        })
        .catch(err => {
          setProdutosCaixa([]);
          console.error(err);
        });
    }
  }, [tipo, caixaId]);

  const handleProdutoChange = (e) => {
        const selected = e.target.value;
        setCodigoProduto(selected);
        const produto = produtosCaixa.find(p => p.codigoProduto === selected);
        if (produto) {
        setQuantidade(produto.quantidade);
        }
    };

  const handleSubmit = (e) => {
    e.preventDefault();

    const movimentacao = {
      tipo,
      local: {
        armario: armarioId,
        prateleira: prateleiraId,
        caixa: caixaId,
      },
      codigoProduto,
      quantidade: Number(quantidade),
      temCodigoFluig,
      codigoFluig: temCodigoFluig ? codigoFluig : ""
    };

    axios.post("http://localhost:3001/api/movimentacoes", movimentacao)
      .then(() => {
        setShowSuccess(true);
        // Resetar formulário
        setCodigoProduto("");
        setQuantidade(1);
        setTemCodigoFluig(false);
        setCodigoFluig("");
        setTipo("Entrada");
      })
      .catch(err => console.error(err));
  };

  const prateleiras = armarios.find(a => a._id === armarioId)?.prateleiras || [];
  const caixas = prateleiras.find(p => p._id === prateleiraId)?.caixas || [];

 
  return (
    <div className="min-h-screen bg-gray-100">
        <NavBar />
        <div className="p-6 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Movimentação de Produto</h1>

            <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 shadow rounded">
                {/* Tipo */}
                <div>
                <label className="font-medium">Tipo de movimentação</label>
                <select
                    value={tipo}
                    onChange={(e) => setTipo(e.target.value)}
                    className="w-full mt-1 p-2 border rounded"
                >
                    <option value="entrada">Entrada</option>
                    <option value="saida">Saída</option>
                </select>
                </div>

                {/* Seleção de local */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label className="font-medium">Armário</label>
                    <select
                    value={armarioId}
                    onChange={(e) => { setArmarioId(e.target.value); setPrateleiraId(""); setCaixaId(""); }}
                    className="w-full mt-1 p-2 border rounded"
                    >
                    <option value="">Selecione</option>
                    {armarios.map(a => (
                        <option key={a._id} value={a._id}>{a.nome}</option>
                    ))}
                    </select>
                </div>

                <div>
                    <label className="font-medium">Prateleira</label>
                    <select
                    value={prateleiraId}
                    onChange={(e) => { setPrateleiraId(e.target.value); setCaixaId(""); }}
                    disabled={!armarioId}
                    className="w-full mt-1 p-2 border rounded"
                    >
                    <option value="">Selecione</option>
                    {prateleiras.map(p => (
                        <option key={p._id} value={p._id}>{p.nome}</option>
                    ))}
                    </select>
                </div>

                <div>
                    <label className="font-medium">Caixa</label>
                    <select
                    value={caixaId}
                    onChange={(e) => setCaixaId(e.target.value)}
                    disabled={!prateleiraId}
                    className="w-full mt-1 p-2 border rounded"
                    >
                    <option value="">Selecione</option>
                    {caixas.map(c => (
                        <option key={c._id} value={c._id}>{c.nome}</option>
                    ))}
                    </select>
                </div>
                </div>

                {/* Código do produto */}
                <div>
                <label className="font-medium">Código do Produto</label>
                
                {tipo === "saida" ? (
                    <select
                        value={codigoProduto}
                        onChange={handleProdutoChange}
                        className="w-full mt-1 p-2 border rounded"
                    >
                        <option value="">Selecione</option>
                        {produtosCaixa.map(p => (
                        <option key={p.codigoProduto} value={p.codigoProduto}>
                            {p.codigoProduto} (Qtd: {p.quantidade})
                        </option>
                        ))}
                    </select>
                    ) : (
                    <input
                        type="text"
                        value={codigoProduto}
                        onChange={(e) => setCodigoProduto(e.target.value)}
                        required
                        className="w-full mt-1 p-2 border rounded"
                    />
                )}
                </div>

                {/* Quantidade */}
                <div>
                <label className="font-medium">Quantidade</label>
                <input
                    type="number"
                    value={quantidade}
                    onChange={(e) => setQuantidade(e.target.value)}
                    min={1}
                    required
                    className="w-full mt-1 p-2 border rounded"
                />
                </div>

                {/* Código Fluig */}
                <div>
                <label className="flex items-center gap-2">
                    <input
                    type="checkbox"
                    checked={temCodigoFluig}
                    onChange={() => setTemCodigoFluig(!temCodigoFluig)}
                    />
                    Possui código Fluig?
                </label>

                {temCodigoFluig && (
                    <input
                    type="text"
                    value={codigoFluig}
                    onChange={(e) => setCodigoFluig(e.target.value)}
                    placeholder="Informe o código Fluig"
                    className="w-full mt-2 p-2 border rounded"
                    />
                )}
                </div>

                {/* Botão de envio */}
                <button
                type="submit"
                disabled={!armarioId || !prateleiraId || !caixaId || !codigoProduto || !quantidade}
                className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 disabled:opacity-50"
                >
                Confirmar Movimentação
                </button>
            </form>
            <ModalSuccesso
                show={showSuccess}
                message="Entrada cadastrada com sucesso"
                onClose={() => setShowSuccess(false)}
            />
        </div>
    </div>
  );
};

export default EntradaProdutos;
