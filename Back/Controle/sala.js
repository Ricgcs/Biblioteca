import { conexao } from "../banco_conexao/conexao.js";

const con = await conexao();

export const cadastroSala = async (escola, nome) => {

  const sql = "INSERT INTO sala(Nome_escola, Nome) VALUES (?, ?)";
  try {
    const result = await con.query(sql, [escola,nome]);
    
    console.log(result);
    return result;
  } 
  catch (error) {
    console.log(error);
    console.log({nome, escola})
  }
};

export const validarSala = async (escola, nome) =>{
  const validar = "SELECT COUNT(cod) as quanto FROM sala WHERE Nome_escola = ? AND Nome = ?";
    try{
    const val_um = await con.query(validar, [escola,nome])
    const val_dois = val_um[0][0];
    const val_tres = val_dois.quanto;
    return val_tres;
}
    catch(error){
    console.log(error)
    }
}

export const quantidadeSala = async(escola, nome) => {
    const sql = "SELECT COUNT(cod) as quantidade FROM sala WHERE Nome_escola = ?";

    try{
        const [quant_um] = await con.query(sql,[escola, nome]);
        return quant_um;
    }    
    catch(error){
        console.log(error);
    }
}

export const salas = async(escola, nome) => {
    const sql = "SELECT * FROM sala WHERE Nome_escola = ?";

    try{
    const [sala] = await con.query(sql,[escola]);
    return sala;
    }

    catch(error){
        console.log(error);
    }
}

export const delSala = async(nome) => {
  const sql = "DELETE FROM sala WHERE Nome = ?";
  
  try{
  const [sala] = await con.query(sql,[nome]);
  return sala;
  }

  catch(error){
      console.log(error);
  }
}


export const updSala = async(nome_futuro, nome_antigo, escola) => {
  const sql = "UPDATE sala SET Nome = ? WHERE Nome = ? AND Nome_escola = ?";
  const sqlDois = "UPDATE aluno SET Nome_sala = ? WHERE Nome_sala = ? AND Nome_escola = ?"
  try{
  const [sala] = await con.query(sql,[nome_futuro, nome_antigo, escola]);
  const [salaDois] = await con.query(sqlDois,[nome_futuro, nome_antigo, escola]);
  return sala;
  }

  catch(error){
      console.log(error);
  }
}

