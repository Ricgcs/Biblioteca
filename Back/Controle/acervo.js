import { conexao } from "../banco_conexao/conexao.js";

const con = await conexao();

export const cadastroacervo = async (
  nome_escola,
  nome_obra,
  nome_autor,
  genero,
  qtd_paginas,
  quantidade,
  sinopse,
  imagem
) => {
  const sql =
    "INSERT INTO acervo(nome_escola, nome_obra, nome_autor, genero, qtd_paginas, quantidade, sinopse, imagem) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  console.log("VAI TOMAR NO CENTRO DO OLHO DO SEU CÚ:", {
    nome_escola,
    nome_obra,
    nome_autor,
    genero,
    qtd_paginas,
    quantidade,
    sinopse,
    imagem,
  });
  try {
    const img = imagem.buffer;
    const result = await con.query(sql, [
      nome_escola,
      nome_obra,
      nome_autor,
      genero,
      qtd_paginas,
      quantidade,
      sinopse,
      img,
    ]);
    return result;
  } catch (error) {
    console.log("Erro no controle", error);
  }
};

export const quantacervo = async (escola) => {
  
  const sql =  "SELECT COUNT(cod) as quantidade FROM acervo WHERE nome_escola = ?";
  try {
    const result = con.query(sql, [escola]);
    return result;
  } catch (error) {
    console.log("Controle/erro:", error);
  }
};

export const validAcervo = async (escola, obra) => {
  console.log("Obra:", obra, " Escola:", escola);
  const sql =
    "SELECT COUNT(cod) as quantidade FROM acervo WHERE nome_escola = ? AND nome_obra = ?";
  try {
    const result = con.query(sql, [escola, obra]);
    return result;
  } catch (error) {
    console.log("Controle/erro:", error);
  }
};

export const veracervo = async (nome_escola) => {
  const sql = "SELECT * FROM acervo WHERE nome_escola = ?";

  try {
    const [result] = await con.query(sql, [nome_escola]);
    return result;
  } catch (error) {
    console.log(error);
  }
};


export const verAcervoGenero = async (nome_escola, genero) => {
    const sql = "SELECT * FROM acervo WHERE nome_escola = ? AND genero = ?";
  
    try {
      const [result] = await con.query(sql, [nome_escola, genero]);
      return result;
    } catch (error) {
      console.log(error);
    }
  };
  