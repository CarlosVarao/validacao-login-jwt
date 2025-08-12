import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { postLogin } from '../../services/dadosApi';
import Spinner from '../../components/Spinner';
import './Login.css';

export default function Login() {
  const [loginInput, setLoginInput] = useState<string>("");
  const [senhaInput, setSenhaInput] = useState<string>("");
  const [spinner, setSpinner] = useState<boolean>(false);
  const [resultApi, setResultApi] = useState<any>("");

  const navigate = useNavigate();

  function limparCampos() {
    setLoginInput("");
    setSenhaInput("");
  }

  function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function btnClick(e: React.FormEvent) {
    e.preventDefault();
    setResultApi("")
    setSpinner(true);

    try {
      const login = await postLogin({ loginInput, senhaInput });

      if (login?.type) {
        localStorage.setItem("autenticador", "true")
        await delay(1000)
        limparCampos();
        navigate("/homePag");
        setSpinner(false);
      }
    } catch (error: any) {
      await delay(700)
      limparCampos();
      setResultApi(error.error || "Sem resposta do Servidor")
      setSpinner(false);
    }
  }

  async function clickCriarConta() {
    //await delay(1000) 
    navigate('/cadastro')
  }

  return (
    <div className="login-container">
      <h1 className="login-title">Login</h1>

      <form className="login-form" onSubmit={btnClick}>
        <div className="form-group">
          <label className="form-label" htmlFor="login">
            Login<span className="required">*</span>
          </label>
          <input
            className="form-input"
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
          <label className="form-label" htmlFor="password">
            Senha<span className="required">*</span>
          </label>
          <input
            className="form-input"
            type="password"
            id="password"
            placeholder="Digite sua senha"
            required
            autoComplete="current-password"
            value={senhaInput}
            onChange={e => setSenhaInput(e.target.value)}
          />
        </div>

        <div className="btn-login-container">
          <button type="submit" className="btn-login">
            {spinner ? <Spinner /> : "Entrar"}
          </button>
          <p className="result-login">{resultApi}</p>
        </div>

        <div className="btn-link-container">
          <button
            className="btn-criar-conta"
            type="button"
            onClick={clickCriarConta}
          >
            Criar conta
          </button>
        </div>
      </form>
    </div>
  );
}
