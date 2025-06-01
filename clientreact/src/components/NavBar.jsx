// import { Link } from "react-router-dom";

// export default function NavBar() {
//   return (
//     <nav className="bg-white shadow-md p-4 flex justify-between items-center">
//       <h1 className="text-xl font-bold"><Link to="/" className="hover:text-blue-600">Controle de Estoque</Link></h1>
//       <div className="flex gap-4">
        // <Link to="/pesquisa" className="hover:text-blue-600">Pesquisa</Link>
        // <Link to="/locais" className="hover:text-blue-600">Locais</Link>
        // <Link to="/movimentacao" className="hover:text-blue-600">Movimentação</Link>
//       </div>
//     </nav>
//   );
// }


import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo ou Nome da Aplicação */}
        <Link to="/" className="text-lg font-bold">Controle de Estoque</Link>

        {/* Botão Mobile (Hamburguer) */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-white focus:outline-none"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Links em tela grande */}
        <div className="hidden md:flex gap-4">
          <Link to="/pesquisa" className="hover:text-gray-100">Pesquisa</Link>
          <Link to="/locais" className="hover:text-gray-100">Locais</Link>
          <Link to="/movimentacao" className="hover:text-gray-100">Movimentação</Link>
        </div>
      </div>

      {/* Menu Mobile colapsável */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-2">
          <Link to="/pesquisa" className="hover:text-gray-100" onClick={toggleMenu}>Pesquisa</Link>
          <Link to="/locais" className="hover:text-gray-100" onClick={toggleMenu}>Locais</Link>
          <Link to="/movimentacao" className="hover:text-gray-100" onClick={toggleMenu}>Movimentação</Link>
        </div>
      )}
    </nav>
  );
};

export default NavBar;

