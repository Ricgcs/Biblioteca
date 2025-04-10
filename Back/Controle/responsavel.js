import { conexao } from "../banco_conexao/conexao.js";

const con = await conexao();

export const cadastroresponsavel = async (
escola,sala,professor
) => {
  const sql =
    "INSERT INTO responsavel(nome_escola,nome_sala,nome_professor) VALUES (?, ?, ?)";
  console.log("VAI TOMAR NO CENTRO DO OLHO DO SEU CÚ:", {
    escola,sala,professor
  });
  try {

    const result = await con.query(sql, [
        escola,sala,professor
    ]);
    return result;
  } catch (error) {
    console.log("Erro no controle", error);
  }
};

export const quantresponsavel = async (escola) => {
  
  const sql =  "SELECT COUNT(cod) as quantidade FROM responsavel WHERE nome_escola = ?";
  try {
    const result = con.query(sql, [escola]);
    return result;
  } catch (error) {
    console.log("Controle/erro:", error);
  }
};

export const validresponsavel = async (escola, obra) => {
  console.log("Obra:", obra, " Escola:", escola);
  const sql =
    "SELECT COUNT(cod) as quantidade FROM responsavel WHERE nome_escola = ? AND nome_obra = ?";
  try {
    const result = con.query(sql, [escola, obra]);
    return result;
  } catch (error) {
    console.log("Controle/erro:", error);
  }
};

export const verresponsavel = async (nome_escola) => {
  const sql = "SELECT * FROM responsavel WHERE nome_escola = ?";

  try {
    const [result] = await con.query(sql, [nome_escola]);
    return result;
  } catch (error) {
    console.log(error);
  }
};

