import { conexao } from "../banco_conexao/conexao.js";

const con = await conexao();

export const validarEscola = async (nome, email) => {
  const validar =
    "SELECT COUNT(cod) AS count FROM escola WHERE nome = ? OR email = ?";
  const [results] = await con.query(validar, [nome, email]);
  const count = results[0].count;
  console.log("escola", count);
  return count;
};
export const nomeCod_fornecedor = async (rs) => {
  const validar = "SELECT cod FROM fornecedor WHERE razao_social = ?";

  const results = await con.query(validar, [rs]);
  const count = results;

  return count[0][0].cod;
};

export const codNome_fornecedor = async (cod) => {
  const validar = "SELECT razao_social FROM fornecedor WHERE cod = ?";

  const results = await con.query(validar, [cod]);
  const count = results;

  return count[0][0].razao_social;
};

export const Nome_fornecedor = async (cod) => {
  const validar = "SELECT * FROM fornecedor WHERE razao_social = ?";

  const results = await con.query(validar, [cod]);
  const count = results;

  return count[0][0].razao_social;
};

export const login_escola = async (nome, email, senha) => {
  const logar =
    "SELECT COUNT(cod) AS count FROM escola WHERE nome = ? AND email = ? AND senha = ? ";

  const [results] = await con.query(logar, [nome, email, senha]);
  const count = results[0].count;
  console.log("escola", count);
  return count;
};

export const getFornecedor = async (res) => {
  try {
    const sql = "SELECT * FROM fornecedor";
    const [rows] = await con.query(sql);
    console.log("Consulta realizada com sucesso");
    return rows;
  } catch (error) {
    console.error("Erro no select_user", error);
    if (res) {
      res.status(500).json({ error: "Erro ao obter fornecedor" });
    } else {
      throw error;
    }
  }
};

export const setEscola = async ({ nome, email, senha, img }) => {
  const con = await conexao();
  console.log("passou");
  console.log({ nome, email, senha, img });
  try {
    const imagem = img.buffer;
    const result = await con.execute(
      "INSERT INTO escola (nome, email, senha, img) VALUES (?,?,?,?)",
      [nome, email, senha, imagem]
    );

    console.log(result);
    return result;
  } catch (error) {
    console.log("Erro ao inserir escola:", error);
    console.log({ nome, email, senha, imagem });
  }
};

export const delForn = async (valor, nome) => {
  try {
    const sql = `DELETE FROM fornecedor WHERE ${valor} = ?`;
    const envio = await con.query(sql, nome);
    console.log("valor deletado com sucesso", envio);
  } catch (error) {
    console.error("Erro no del", error);
  }
};

export const procurarForn = async (what) => {
  const con = await conexao();

  try {
    const [rows] = await con.query(
      `SELECT ${what.what} FROM fornecedor WHERE ${what.valor} = ?`,
      [what.nome]
    );

    return rows[0];
  } catch (error) {
    console.error("Erro ao procurar fornecedor:", error.message);

    throw error;
  }
};

export const procurarImagem_fornecedor = async (nome) => {
  const con = await conexao();
  try {
    const [rows] = await con.query(
      `SELECT imagen FROM fornecedor WHERE razao_social = ?`,
      [nome]
    );
    return rows;
  } catch (error) {
    console.error("Erro ao procurar fornecedor:", error.message);
    throw error;
  }
};

export const qtd_forn = async () => {
  const con = await conexao();

  const [rows] = await con.query("SELECT COUNT(cod) AS count FROM fornecedor");
  const count = rows[0].count;
  return count;
};

export const atualizar = async (valor, elemento, ent, tipo) => {
  try {
    const sql = `UPDATE cliente SET ${valor} = ? where ${elemento} = ?`;
    const upp = await con.query(sql, [ent, tipo]);
    console.log("usuário atualizado", upp);
  } catch (error) {
    console.log("erro em atualizar", error);
  }
};
