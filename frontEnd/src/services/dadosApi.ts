import Axios from "axios";

type Usuario = Record<
  "nome" | "idade" | "dataNascimento" | "email" | "usuario" | "senha",
  string
>;

type DadosLogin = Record<"loginInput" | "senhaInput", string>;

export async function postCadastro(usuario: Usuario) {
  try {
    const linkApi = "http://localhost:3001/cadastro";
    const response = await Axios.post(linkApi, usuario);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
}

export async function postLogin(dadosLogin: DadosLogin) {
  try {
    const linkApi = "http://localhost:3001/login";
    const responde = await Axios.post(linkApi, dadosLogin);
    return responde.data;
  } catch (error: any) {
    throw error.response.data;
  }
}
