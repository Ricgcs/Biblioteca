import express, { response } from "express";
import bodyParser from "body-parser";
import path from "path";
import cors from "cors";
import multer from "multer";

import {
  login_escola,
  setEscola,
  validarEscola,
} 
from "../Back/Controle/Escola.js";
import {
  cadastroSala,
  quantidadeSala,
  salas,
  validarSala,
} from "./Controle/sala.js";
import { cadastroAluno, quantAluno, verAluno } from "./Controle/aluno.js";

  const app = express();
  const host = "127.0.0.1";
  const porta = 3000;

  const storage = multer.memoryStorage();
  const upload = multer({ storage: storage });

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(cors());
//--------------------------------------------------------Escola---------------------------------------------------------------------\\
app.post("/diretoria", upload.single("img"), async (req, res) => {
  const nome = req.body.nome;
  const email = req.body.email;
  const senha = req.body.senha;
  const img = req.file;
  const dados = { nome, email, senha, img };
  console.log("chegou aqui");
  console.log(dados);

  try {
    const quantidade = await validarEscola(nome, email);
    console.log("Servidor", quantidade);

    if (quantidade != 0) {
      console.log("usuario ja existe");
      res.send({ pod: 0 });
    } else {
      console.log("usuario criado com sucesso");
      setEscola(dados);
      res.send({ pod: 1 });
    }
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});

app.post("/login/diretor/:nome/:email/:senha", async (req, res) => {
  // const nome = req.body.nome;
  // const email = req.body.email;
  // const senha = req.body.senha;
  console.log(req.body.nome);
  const { nome, email, senha } = req.params;
  const dados = { nome, email, senha };
  console.log("Requisição recebida:", dados);
  try {
    const log = await login_escola(nome, email, senha);
    console.log("servidor:", log);
    res.send({ login: log });
  } catch (error) {
    console.log(error);
  }
});
//----------------------------------------------------------Sala--------------------------------------------------------------------\\

app.get("/sala/cadastro/:escola/:nome", async (req, res) => {
  const escola = req.params.escola;
  const nome = req.params.nome;
  try {
    const validar = await validarSala(escola, nome);
    if (validar > 1) {
      res.send({ pod: 0 });
    } else {
      const envio = await cadastroSala(escola, nome);
      res.send({ pod: 1 });
    }
  } catch (error) {
    console.log(error);
  }
});

app.get("/sala/quantidade/:escola", async (req, res) => {
  const escola = req.params.escola;

  try {
    const quant_um = await quantidadeSala(escola);
    res.send(quant_um);
  } catch (error) {
    console.log(error);
  }
});

app.get("/sala/mostrar/:escola", async (req, res) => {
  const escola = req.params.escola;

  try {
    const most = await salas(escola);
    res.send(most);
  } catch (error) {
    console.log(error);
  }
});
//--------------------------------------------------------Aluno-----------------------------------------------------------------------\\
app.post("/aluno/cadastro",upload.single("img"),async (req, res) => {
  console.log("Servidor recebeu");
  const escola = req.body.escola;
  const nome = req.body.nome;
  const sala = req.body.sala;
  const email = req.body.email;
  const senha = req.body.senha;
  const imagem = req.file;
  const aluno = {escola, nome, sala, email, senha, imagem}
  console.log("Servidor",aluno);
  //escola, nome, sala, email, senha

  try {
    const teste = await quantAluno(escola);
    if(teste >= 0){
      res.send({pod:0})
    }

    else{
    const response =await cadastroAluno(escola, nome, sala, email, senha, imagem);
    res.send({pod:1})

    }
  } catch (error) {
    console.log(error);
  }
});

app.get("/aluno/quantidade/:escola", async (req, res) => {
  const escola = req.params.escola;

  try{
    const result = await quantAluno(escola);
    res.send({quantidade:result});

  }

  catch(error){
    console.log(error)
  }
});

app.get("/aluno/mostrar/:escola", async(req, res)=>{
  const escola = req.params.escola;

  try{
      const result = await verAluno(escola);
      res.send(result);
  }
  catch(error){
    console.log(error);
  }
})
//--------------------------------------------------------Servidor--------------------------------------------------------------------\\
app.listen(porta, host, () => {
  console.log("Servidor funcionando");
});
