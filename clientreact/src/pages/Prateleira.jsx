import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../components/NavBar";
import CardCaixa from "../components/CardCaixa";

const Prateleira = (prat) => {
  const { armarioId, prateleiraId } = useParams();
  const [prateleira, setPrateleira] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3001/api/armarios/${armarioId}/prateleira/${prateleiraId}`)
      .then(res => setPrateleira(res.data))
      .catch(console.error);
  }, [prateleiraId]);

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Prateleira: {prateleira?.nome}</h1>

        {prateleira?.caixas.map((caixa) => (
          <CardCaixa
            key={caixa._id}
            caixa={caixa}
            armarioId={armarioId}
            prateleiraId={prateleira._id}
          />
        ))}
      </div>
    </div>
  );
};

export default Prateleira;
