import { BrowserRouter, Routes, Route } from "react-router-dom";

// Páginas
import Login from "../pages/login/Login";
import Cadastro from "../pages/cadastroUser/CadastroUser";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
      </Routes>
    </BrowserRouter>
  );
}