import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Spinner from '../../components/Spinner';
import './cadastroUser.css';

export default function Cadastro() {
  const [nome, setNome] = useState<string>("");
  const [idade, setIdade] = useState<string>("");
  const [dataNascimento, setDataNascimento] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [usuario, setUsuario] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const [spinner, setSpinner] = useState<boolean>(false)

  const navigate = useNavigate()

  function resetCampos() {
    setNome("");
    setIdade("");
    setDataNascimento("");
    setEmail("");
    setUsuario("");
    setSenha("");
  }


  function handleCadastro(e: React.FormEvent) {
    e.preventDefault();

    setSpinner(true)

    resetCampos()

    setTimeout(() => {
      setSpinner(false)
      navigate("/")
    }, 1000);

  }

  return (
    <div className="login-container">
      <h2>Criar Conta</h2>
      <form onSubmit={handleCadastro}>
        <div className="form-group">
          <label htmlFor="nome">Nome<span>*</span></label>
          <input
            type="text"
            id="nome"
            placeholder="Digite seu nome"
            required
            value={nome}
            onChange={e => setNome(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="idade">Idade<span>*</span></label>
          <input
            type="number"
            id="idade"
            placeholder="Digite sua idade"
            required
            value={idade}
            onChange={e => setIdade(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="dataNascimento">Data de Nascimento<span>*</span></label>
          <input
            type="date"
            id="dataNascimento"
            required
            value={dataNascimento}
            onChange={e => setDataNascimento(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">E-mail<span>*</span></label>
          <input
            type="email"
            id="email"
            placeholder="Digite seu e-mail"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="usuario">Usuário<span>*</span></label>
          <input
            type="text"
            id="usuario"
            placeholder="Escolha um usuário"
            required
            value={usuario}
            onChange={e => setUsuario(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="senha">Senha<span>*</span></label>
          <input
            type="password"
            id="senha"
            placeholder="Digite sua senha"
            required
            value={senha}
            onChange={e => setSenha(e.target.value)}
          />
        </div>

        <button type="submit" className="btn-login">{spinner ? <Spinner /> : "Cadastrar"}</button>
      </form>
    </div>
  );
}
