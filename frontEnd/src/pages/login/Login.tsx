import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { postLogin } from '../../services/dadosApi'
import Spinner from '../../components/Spinner';
import './Login.css';

export default function Login() {
  const [loginInput, setLoginInput] = useState<string>("");
  const [senhaInput, setSenhaInput] = useState<string>("");
  const [spinner, setSpinner] = useState<boolean>(false)

  const navigate = useNavigate()

  function limparCampos() {
    setLoginInput("");
    setSenhaInput("");
  }

  async function btnClick(e: React.FormEvent) {
    e.preventDefault();
    setSpinner(true)

    try {
      const login = await postLogin({ loginInput, senhaInput })

      if (login?.type) {
        setSpinner(true)
        setTimeout(() => {
          navigate("/homePag")
        }, 1000);
      }

    } catch (error: any) {
      console.log(error)
    } finally {
      setTimeout(() => {
        limparCampos();
        setSpinner(false);
      }, 700);
    }
  }

  function clickCriarConta() {
    setTimeout(() => {
      navigate('/cadastro')
    }, 300)
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

        <button type="submit" className="btn-login">{spinner ? <Spinner /> : "Entrar"}</button>

        <div className="link">
          <p onClick={clickCriarConta}>Criar conta</p>
        </div>
      </form>
    </div>
  );
}
