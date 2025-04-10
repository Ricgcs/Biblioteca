import { conexao } from "../banco_conexao/conexao.js";

const con = await conexao();


export const cadastroAluno = async (escola, nome, sala, imagem)=>{
    const sql = "INSERT INTO aluno(Nome_escola, Nome, Nome_sala, imagem) VALUES (?, ?, ?, ?)";
    console.log("VAI TOMAR NO CENTRO DO OLHO DO SEU CÚ:",{escola, nome, sala, imagem})
    try{
        const img =  imagem.buffer;
        const result = await con.query(sql,[escola, nome, sala, img]);
        return result;
    }

    catch(error){
        console.log("Erro no controle",error);
    }
}

export const quantAluno = async(nome)=>{
    const sql = "SELECT COUNT(cod) as quantidade FROM aluno WHERE Nome_escola = ?";
    try{
        const result = con.query(sql,[nome]);
        return result;
    }
    catch(error){
            console.log("Controle/erro:", error)
    }
}


export const validarAluno = async(escola,nome)=>{
    const sql = "SELECT COUNT(cod) as quantidade FROM aluno WHERE Nome_escola = ? AND Nome = ?";
    try{
        const result = con.query(sql,[escola, nome]);
        return result;
    }
    catch(error){
            console.log("Controle/erro:", error)
    }
}



export const verAluno = async(nome)=>{
    const sql = "SELECT * FROM aluno WHERE Nome_escola = ?";

    try{
      const [result] = await con.query(sql,[nome]);
      return result;
    }

    catch(error){
        console.log(error);
    }
}

export const login_aluno = async (nome, email, senha) => {
  const logar =
    "SELECT COUNT(cod) AS count FROM aluno WHERE Nome = ? AND Email = ? AND Senha = ? ";

  const [results] = await con.query(logar, [nome, email, senha]);
  const count = results[0].count;
  console.log("escola", count);
  return count;
};