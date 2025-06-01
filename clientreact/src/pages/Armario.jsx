import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../components/NavBar";
import CardPrateleira from "../components/CardPrateleira";

const Armario = () => {
  const { id } = useParams();
  const [armario, setArmario] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3001/api/armarios/${id}`)
      .then(res => setArmario(res.data))
      .catch(console.error);
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <div className="p-6 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Armário: {armario?.nome}</h1>

        {armario?.prateleiras.map((prat) => (
          <CardPrateleira
            key={prat._id}
            prateleira={prat}
            armarioId={armario._id}
            onClick={`/api/armarios/${armario._id}/prateleira/${prat._id}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Armario;
