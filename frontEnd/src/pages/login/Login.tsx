import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './Login.css';

export default function Login() {
  const [loginInput, setLoginInput] = useState<string>("");
  const [senhaInput, setSenhaInput] = useState<string>("");

  const navigate = useNavigate()

  function btnClick(e: React.FormEvent) {
    e.preventDefault();
    console.log(loginInput, senhaInput);
    setLoginInput("");
    setSenhaInput("");
  }

  function clickCriarConta() {
    setTimeout(() => {
      navigate('/cadastro')
    }, 1000)
  }

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={btnClick}>
        <div className="form-group">
          <label htmlFor="login">Login<span>*</span></label>
          <input
            type="text"
            id="login"
            placeholder="Digite seu Login"
            required
            autoComplete="username"
            value={loginInput}
            onChange={e => setLoginInput(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Senha<span>*</span></label>
          <input
            type="password"
            id="password"
            placeholder="Digite sua senha"
            required
            autoComplete="current-password"
            value={senhaInput}
            onChange={e => setSenhaInput(e.target.value)}
          />
        </div>

        <button type="submit" className="btn-login">Entrar</button>

        <div className="link">
          <p onClick={clickCriarConta}>Criar conta</p>
        </div>
      </form>
    </div>
  );
}
