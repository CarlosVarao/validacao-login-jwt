import { useState } from 'react';
import Spinner from '../../components/Spinner';
import { postCadastro } from '../../services/dadosApi'
import './cadastroUser.css';

export default function Cadastro() {
  const [nome, setNome] = useState<string>("");
  const [idade, setIdade] = useState<string>("");
  const [dataNascimento, setDataNascimento] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [usuario, setUsuario] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const [spinner, setSpinner] = useState<boolean>(false)
  const [resultApi, setResultApi] = useState(" ")

  function resetCampos() {
    setNome("");
    setIdade("");
    setDataNascimento("");
    setEmail("");
    setUsuario("");
    setSenha("");
  }

  function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function handleCadastro(e: React.FormEvent) {
    e.preventDefault();
    setResultApi("")
    setSpinner(true);

    try {
      const respostaApi = await postCadastro({ nome, idade, dataNascimento, email, usuario, senha });
      delay(1000)
      setResultApi(respostaApi?.message);
      resetCampos();
    } catch (error: any) {
      delay(700)
      resetCampos();
      setResultApi(error.error || "Sem resposta do Servidor");
      setSpinner(false);
    }

    // setTimeout(() => {
    //   setSpinner(false);
    //   resetCampos()
    // }, 1000);
  }

  return (
    <div className="cadastro__container">
      <h2>Criar Conta</h2>
      <form onSubmit={handleCadastro}>
        <div className="cadastro__form-group">
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

        <div className="cadastro__form-group">
          <label htmlFor="idade">Idade<span>*</span></label>
          <input
            type="text"
            id="idade"
            placeholder="Digite sua idade"
            required
            value={idade}
            onChange={e => setIdade(e.target.value)}
          />
        </div>

        <div className="cadastro__form-group">
          <label htmlFor="dataNascimento">Data de Nascimento<span>*</span></label>
          <input
            type="date"
            id="dataNascimento"
            required
            value={dataNascimento}
            onChange={e => setDataNascimento(e.target.value)}
          />
        </div>

        <div className="cadastro__form-group">
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

        <div className="cadastro__form-group">
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

        <div className="cadastro__form-group">
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

        <button type="submit" className="cadastro__btn">
          {spinner ? <Spinner /> : "Cadastrar"}
        </button>

        <p className="cadastro__mensagem-api">{resultApi}</p>
      </form>
    </div>
  )
}
