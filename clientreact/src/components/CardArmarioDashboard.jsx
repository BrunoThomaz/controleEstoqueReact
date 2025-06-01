import { Link } from "react-router-dom";


export default function CardArmarioDashboard({ key, nome, armarioId }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200">
      <h3 className="text-xl font-semibold text-gray-700 mb-2">{nome}</h3>
      <Link
              to={`/armarios/${armarioId}`}
              key={key}
              className="block bg-white p-4 rounded shadow hover:shadow-md transition"
            >
              <button className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 transition">
                Ver Detalhes
              </button>
            </Link>
      
    </div>
  );
}
