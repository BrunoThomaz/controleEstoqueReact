import { Link } from "react-router-dom";

const CardCaixa = ({ key, caixa, armarioId, prateleiraId }) => (
  <div
    className="bg-white rounded-lg shadow p-4 mb-4 cursor-pointer hover:bg-gray-100"
    key={key}
  >
    <Link 
     to={`/armario/${armarioId}/prateleira/${prateleiraId}/caixa/${caixa._id}`}
    >
      <h2 className="text-lg font-semibold">{caixa.nome}</h2>
      <p className="text-gray-600">Quantidade: {caixa.quantidade}</p>
      <p className={`text-sm ${caixa.cheio ? "text-red-600" : "text-green-600"}`}>
        {caixa.cheio ? "Cheio" : "Disponível"}
      </p>
    </Link>
  </div>
);

export default CardCaixa;
