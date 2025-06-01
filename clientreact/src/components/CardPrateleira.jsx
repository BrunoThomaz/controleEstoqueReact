import { Link } from "react-router-dom";


const CardPrateleira = ({ key, prateleira, armarioId, onClick}) => (
  <div className="bg-white rounded-lg shadow p-4 mb-4 cursor-pointer hover:bg-gray-100">
    <Link
      to={`/armario/${armarioId}/prateleira/${prateleira._id}`}
      key={prateleira._id}
      >
      <h2 className="text-xl font-semibold">{prateleira.nome}</h2>
      <p className="text-gray-600">Caixas: {prateleira.caixas.length}</p>
      <p className="text-gray-600">Quantidade total: {prateleira.quantidade}</p>
    
    </Link>
  </div>

);

export default CardPrateleira;
