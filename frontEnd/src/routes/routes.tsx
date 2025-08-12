import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/login/Login";
import Cadastro from "../pages/cadastroUser/CadastroUser";
import HomePag from "../pages/home/HomePag";
import Erro404 from "../pages/erro404/Erro404";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/homePag" element={<HomePag />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="*" element={<Erro404 />} />
      </Routes>
    </BrowserRouter>
  );
}