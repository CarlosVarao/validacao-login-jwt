import Axios from "axios";

type Usuario = Record<
  "nome" | "idade" | "dataNascimento" | "email" | "usuario" | "senha",
  string
>;

export async function postCadastro(usuario: Usuario) {
  try {
    const linkApi = "http://localhost:3001/cadastro";
    const response = await Axios.post(linkApi, usuario);
    return response.data;
  } catch (error: any) {
    throw error.response?.data;
  }
}
