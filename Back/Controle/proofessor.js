import { conexao } from "../banco_conexao/conexao.js";

const con = await conexao();


export const cadastroProfessor = async (escola, nome, email, materia, senha, imagem)=>{
    const sql = "INSERT INTO professor(Escola, nome, email, materia, senha, img) VALUES (?, ?, ?, ?, ?, ?)";
    console.log("VAI TOMAR NO CENTRO DO OLHO DO SEU CÚ:",{escola, nome, email, materia, senha, imagem})
    try{
  const img =  imagem.buffer;
        const result = await con.query(sql,[escola, nome, email, materia, senha, img]);
        return result;
    }

    catch(error){
        console.log("Erro no controle",error);
    }
}

export const quantProfessor = async(nome)=>{
    const sql = "SELECT COUNT(cod) as quantidade FROM professor WHERE Escola = ?";
    try{
        const result = con.query(sql,[nome]);
        return result;
    }
    catch(error){
            console.log("Controle/erro:", error)
    }
}


export const validarProfessor = async(escola, nome)=>{
    const sql = "SELECT COUNT(cod) as quantidade FROM professor WHERE Escola = ? AND nome = ?";
    try{
        const result = con.query(sql,[escola, nome]);
        return result;
    }
    catch(error){
            console.log("Controle/erro:", error)
    }
}

export const verProfessor = async(nome)=>{
    const sql = "SELECT * FROM Professor WHERE Escola = ?";

    try{
      const [result] = await con.query(sql,[nome]);
      return result;
    }

    catch(error){
        console.log(error);
    }
}

export const login_professor = async (nome, email, senha) => {
  const logar =
    "SELECT COUNT(cod) AS count FROM professor WHERE nome = ? AND email = ? AND senha = ? ";

  const [results] = await con.query(logar, [nome, email, senha]);
  const count = results[0].count;
  console.log("escola", count);
  return count;
};