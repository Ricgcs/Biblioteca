import { conexao } from "../banco_conexao/conexao.js";

const con = await conexao();


export const cadastroAluno = async (escola, nome, sala, email, senha, imagem)=>{
    const sql = "INSERT INTO aluno(Nome_escola, Nome, Nome_sala, Email, Senha, imagem) VALUES (?, ?, ?, ?, ?, ?)";
    console.log("VAI TOMAR NO CENTRO DO OLHO DO SEU CÚ:",{escola, nome, sala, email, senha, imagem})
    try{
        const img =  imagem.buffer;
        const result = await con.query(sql,[escola, nome, sala, email, senha, img]);
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