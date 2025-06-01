import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import LocaisPage from "./pages/LocaisPage";
import Movimentacao from "./pages/Movimentacao";
import Armario from "./pages/Armario";
import Prateleira from "./pages/Prateleira";
import Caixa from "./pages/Caixa";
import Pesquisa from "./pages/Pesquisa";
import ImportacaoPage from "./pages/ImportacaoPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/locais" element={<LocaisPage />} />
        <Route path="/importacao" element={<ImportacaoPage />} />
        <Route path="/movimentacao" element={<Movimentacao />} />
        <Route path="/pesquisa" element={<Pesquisa />} />
        <Route path="/armarios/:id" element={<Armario />} />
        <Route path="/armario/:armarioId/prateleira/:prateleiraId" element={<Prateleira />} />
        <Route path="/armario/:armarioId/prateleira/:prateleiraId/caixa/:caixaId" element={<Caixa />} />

        {/* Adicione outras rotas aqui futuramente */}
      </Routes>
    </Router>
  );
}


