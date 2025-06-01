import  { useEffect, useState } from "react";
import axios from "axios";
import ArmarioCardLocais from "../components/armarioCardLocais";
import ModalFormulario from "../components/ModalFormulario";
import NavBar from "../components/NavBar";


const LocaisPage = () => {
  const [armarios, setArmarios] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [nome, setNome] = useState("");
  const [tipoCadastro, setTipoCadastro] = useState(""); // armario | prateleira | caixa
  const [idArmario, setIdArmario] = useState(null);
  const [idPrateleira, setIdPrateleira] = useState(null);
  const [editando, setEditando] = useState(false); // controle de edição
  const [idEditando, setIdEditando] = useState(null); // ID do armário sendo editado


  const handleEditArmario = () => {
    if (!nome.trim()) return alert("Digite um nome válido.");
    axios
      .put(`http://localhost:3001/api/armarios/edit/${idEditando}`, {
        novoNome: nome,
      })
      .then(() => {
        setModalAberto(false);
        setNome("");
        setEditando(false);
        setIdEditando(null);
        fetchData();
      })
      .catch((err) => console.error(err));
  };



  const fetchData = () => {
    axios
      .get("http://localhost:3001/api/armarios")
      .then((res) => setArmarios(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

    // Ações
const handleSubmit = () => {
  if (!nome.trim()) return alert("Digite um nome válido.");

  let url = "";
  let data = { nome };

  if (tipoCadastro === "armario") {
    url = "http://localhost:3001/api/armarios";
  } else if (tipoCadastro === "prateleira") {
    url = `http://localhost:3001/api/armarios/${idArmario}/prateleiras`;
  } else if (tipoCadastro === "caixa") {
    url = `http://localhost:3001/api/armarios/${idArmario}/prateleiras/${idPrateleira}/caixas`;
  }

  axios.post(url, data)
    .then(() => {
      setModalAberto(false);
      setNome("");
      fetchData();
    })
    .catch((err) => console.error(err));
};




  const handleAddPrateleira = (idArmario) => {
    const nome = prompt("Nome da nova prateleira:");
    if (!nome) return;
    axios.post(`http://localhost:3001/api/armarios/${idArmario}/prateleiras`, { nome })
      .then(fetchData);
  };

  const handleAddCaixa = (idArmario, idPrateleira) => {
    const nome = prompt("Nome da nova caixa:");
    if (!nome) return;
    axios.post(`http://localhost:3001/api/armarios/${idArmario}/prateleiras/${idPrateleira}/caixas`, { nome })
      .then(fetchData);
  };

  const handleDeleteArmario = (idArmario) => {
    axios.delete(`http://localhost:3001/api/armarios/${idArmario}`).then(fetchData);
  };

  const handleDeletePrateleira = (idArmario, idPrateleira) => {
    axios.delete(`http://localhost:3001/api/armarios/${idArmario}/prateleiras/${idPrateleira}`).then(fetchData);
  };

  const handleDeleteCaixa = (idArmario,idPrateleira, idCaixa) => {
    axios.delete(`http://localhost:3001/api/armarios/${idArmario}/prateleiras/${idPrateleira}/caixas/${idCaixa}`).then(fetchData);
  };

  // Futuro: editar prateleira/caixa com modais
  const handleEdit = (obj) => {
  if (obj.tipo === "armario") {
    setNome(obj.nome); // Nome atual
    setIdEditando(obj._id);
    setEditando(true);
    setModalAberto(true);
  } else {
    alert("Edição de prateleira/caixa ainda não implementada.");
  }
};


  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <div className="p-6 space-y-6">
        
        <h1 className="text-3xl font-bold mb-4">Locais de Armazenagem</h1>
        <div className="mb-4">
          <button
            onClick={() => {
              setTipoCadastro("armario");
              setNome("");
              setModalAberto(true);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
          >
            ➕ Novo Armário
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {armarios.map((armario) => (
            <ArmarioCardLocais
              key={armario._id}
              armario={armario}
              onAddPrateleira={() => {
                setTipoCadastro("prateleira");
                setIdArmario(armario._id);
                setNome("");
                setModalAberto(true);
              }}
              onEditArmario={() =>
                handleEdit({ tipo: "armario", _id: armario._id, nome: armario.nome })
              }
              onDeleteArmario={handleDeleteArmario}
              onAddCaixa={(armario, prateleira) => {
                setTipoCadastro("caixa");
                setIdArmario(armario._id);
                setIdPrateleira(prateleira._id);
                setNome("");
                setModalAberto(true);
              }}
              onEditPrateleira={handleEdit}
              onDeletePrateleira={handleDeletePrateleira}
              onEditCaixa={handleEdit}
              onDeleteCaixa={handleDeleteCaixa}
            />
          ))}
        </div>
        <ModalFormulario
          aberto={modalAberto}
          onClose={() => setModalAberto(false)}
          onSubmit={editando ? handleEditArmario : handleSubmit}
          titulo={`Novo ${tipoCadastro}`}
          nome={nome}
          setNome={setNome}
        />
      </div>
    </div>
  );
};

export default LocaisPage;
