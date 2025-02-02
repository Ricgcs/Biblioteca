import { conexao } from "../banco_conexao/conexao.js";

const con = await conexao();

export const cadastrogenero = async (Nome_escola, Nome, Descricao, imagem) => {
  const sql =
    "INSERT INTO generos(Nome_escola, Nome, Descricao, imagem) VALUES (?, ?, ?, ?)";
  console.log("VAI TOMAR NO CENTRO DO OLHO DO SEU CÚ:", {
    Nome_escola,
    Nome,
    Descricao,
    imagem,
  });
  try {
    const img = imagem.buffer;
    const result = await con.query(sql, [Nome_escola, Nome, Descricao, img]);
    return result;
  } catch (error) {
    console.log("Erro no controle", error);
  }
};

export const quantgenero = async (Nome) => {
  const sql =
    "SELECT COUNT(cod) as quantidade FROM generos WHERE nome_escola = ?";
  try {
    const result = con.query(sql, [Nome]);
    return result;
  } catch (error) {
    console.log("Controle/erro:", error);
  }
};

export const validarGenero = async (escola, nome) => {
  const sql =
    "SELECT COUNT(cod) as quantidade FROM generos WHERE nome_escola = ? AND Nome = ?";
  try {
    const result = con.query(sql, [escola, nome]);
    return result;
  } catch (error) {
    console.log("Controle/erro:", error);
  }
};

export const vergenero = async (Nome) => {
  const sql = "SELECT * FROM generos WHERE nome_escola = ?";

  try {
    const [result] = await con.query(sql, [Nome]);
    return result;
  } catch (error) {
    console.log(error);
  }
};
