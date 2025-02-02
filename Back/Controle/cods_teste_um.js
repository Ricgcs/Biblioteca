import { conexao } from "../banco_conexao/conexao.js";


const con = await conexao();


export const cadastro = async (valor) => {
    console.log("teste: ", valor);
    const inicio = valor[0];
    const quant = valor.length;
    const val = quant - 1;
    console.log(inicio);
    console.log(quant);
    console.log(val);
    let sql = `INSERT INTO ${inicio} VALUES (`;
    for (let i = 1; i < quant; i++) {
      if (i != val) {
        sql += "?, ";
        console.log(i);
      } else {
        sql += "?)";
      }
    }
    console.log("texto: ", sql);
    const env = valor.shift();
    console.log(valor);
    try {
      const result = await con.query(sql, valor);
      return result;
    } catch (error) {
      console.log(error);
    }
  };