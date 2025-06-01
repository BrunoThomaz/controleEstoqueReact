import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import Header from "../components/Header";
import CardArmarioDashboard from "../components/CardArmarioDashboard";
import DashboardMovimentacao from "../components/DashboardMovimentacao";

export default function Dashboard() {
  const [armarios, setArmarios] = useState([]);

  useEffect(() => {
  fetch("http://localhost:3001/api/armarios")
    .then((res) => res.json())
    .then(setArmarios)
    .catch(console.error);
}, []);


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-100 text-gray-800">
      <NavBar />
      {/* Cabeçalho */}
      <Header />

      {/* Container dos Armários */}
      <section className="p-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {armarios.map((armario) => (
            <CardArmarioDashboard
              key={armario._id}
              armarioId={armario._id}
              nome={armario.nome}
            />
          ))}
        </div>
      </section>

      <section className="p-6 max-w-7xl mx-auto">
          <DashboardMovimentacao />
      </section>
    </div>
  );
}
