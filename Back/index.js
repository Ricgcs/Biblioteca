import express, { response } from "express";
import bodyParser from "body-parser";
import path from "path";
import cors from "cors";
import multer from "multer";

import {
  login_escola,
  setEscola,
  validarEscola,
} from "../Back/Controle/Escola.js";

import {
  cadastroSala,
  quantidadeSala,
  salas,
  validarSala,
} from "./Controle/sala.js";

import { cadastro } from "../Back/Controle/cods_teste_um.js";

import {
  cadastroAluno,
  quantAluno,
  validarAluno,
  verAluno,
} from "./Controle/aluno.js";
import {
  cadastroProfessor,
  quantProfessor,
  validarProfessor,
  verProfessor,
} from "./Controle/proofessor.js";
import {
  cadastroacervo,
  quantacervo,
  validAcervo,
  veracervo,
  verAcervoGenero,
} from "./Controle/acervo.js";
import {
  cadastrogenero,
  quantgenero,
  validarGenero,
  vergenero,
} from "./Controle/genero.js";

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
    if (validar >= 1) {
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
app.post("/aluno/cadastro", upload.single("img"), async (req, res) => {
  console.log("Servidor recebeu");
  const escola = req.body.escola;
  const nome = req.body.nome;
  const sala = req.body.sala;
  const email = req.body.email;
  const senha = req.body.senha;
  const imagem = req.file;
  const aluno = { escola, nome, sala, email, senha, imagem };
  console.log("Servidor", aluno);
  //escola, nome, sala, email, senha

  try {
    const teste = await validarAluno(escola, nome);
    if (teste[0][0].quantidade >= 1) {
      res.send({ pod: 0 });
    } else {
      res.send({ pod: 1 });
      const response = await cadastroAluno(
        escola,
        nome,
        sala,
        email,
        senha,
        imagem
      );
    }
  } catch (error) {
    console.log(error);
  }
});

app.get("/aluno/quantidade/:escola", async (req, res) => {
  const escola = req.params.escola;

  try {
    const result = await quantAluno(escola);
    res.send({ quantidade: result });
  } catch (error) {
    console.log(error);
  }
});

app.get("/aluno/mostrar/:escola", async (req, res) => {
  const escola = req.params.escola;

  try {
    const result = await verAluno(escola);
    res.send(result);
  } catch (error) {
    console.log(error);
  }
});

app.post("/cadastro", async (req, res) => {
  const recebido = req.body;
  const enviavel = recebido.tt;
  console.log(`recebido: `, enviavel);
  cadastro(enviavel);
});

//----------------------------------------------------Professor-----------------------------------------------------------------------\\
app.post("/professor/cadastro", upload.single("img"), async (req, res) => {
  console.log("Servidor recebeu");
  //escola, nome, email, materia, senha, imagem
  const escola = req.body.escola;
  const nome = req.body.nome;
  const materia = req.body.materia;
  const email = req.body.email;
  const senha = req.body.senha;
  const imagem = req.file;
  const professor = { escola, nome, email, materia, senha, imagem };
  console.log("Servidor", professor);
  //escola, nome, sala, email, senha

  try {
    const teste = await validarProfessor(escola, nome);
    if (teste[0][0].quantidade >= 1) {
      res.send({ pod: 0 });
    } else {
      const response = await cadastroProfessor(
        escola,
        nome,
        email,
        materia,
        senha,
        imagem
      );
      res.send({ pod: 1 });
    }
  } catch (error) {
    console.log(error);
  }
});

app.get("/professor/quantidade/:escola", async (req, res) => {
  const escola = req.params.escola;

  try {
    const result = await quantProfessor(escola);
    res.send({ quantidade: result });
  } catch (error) {
    console.log(error);
  }
});

app.get("/professor/mostrar/:escola", async (req, res) => {
  const escola = req.params.escola;

  try {
    const result = await verProfessor(escola);
    res.send(result);
  } catch (error) {
    console.log(error);
  }
});

//--------------------------------------------------------Acervo-----------------------------------------------------------------------\\
app.post("/acervo/cadastro", upload.single("img"), async (req, res) => {
  console.log("Servidor recebeu");

  const nome_escola = req.body.escola;
  const nome_autor = req.body.autor;
  const nome_obra = req.body.obra;
  const genero = req.body.genero;
  const qtd_paginas = req.body.paginas;
  const quantidade = req.body.quantidade;
  const sinopse = req.body.sinopse;
  const imagem = req.file;
  const acervo = {
    nome_escola,
    nome_obra,
    nome_autor,
    genero,
    qtd_paginas,
    quantidade,
    sinopse,
    imagem,
  };
  console.log("Servidor", acervo);

  try {
    const teste = await validAcervo(nome_escola, nome_obra);
    if (teste[0][0].quantidade >= 1) {
      res.send({ pod: 0 });
    } else {
      const response = await cadastroacervo(
        nome_escola,
        nome_obra,
        nome_autor,
        genero,
        qtd_paginas,
        quantidade,
        sinopse,
        imagem
      );
      res.send({ pod: 1 });
    }
  } catch (error) {
    console.log(error);
  }
});

app.get("/acervo/quantidade/:escola", async (req, res) => {
  const escola = req.params.escola;

  try {
    
    const result = await quantacervo(escola);
    res.send({ quantidade: result });
  } catch (error) {
    console.log(error);
  }
});

app.get("/acervo/mostrar/:escola", async (req, res) => {
  const escola = req.params.escola;

  try {
    const result = await veracervo(escola);
    res.send(result);
  } catch (error) {
    console.log(error);
  }
});


app.get("/acervo/mostrar_obras/:escola/:genero", async (req, res) => {
  const escola = req.params.escola;
  const genero = req.params.genero;
  try {
    const result = await verAcervoGenero(escola, genero);
    res.send(result);
  } catch (error) {
    console.log(error);
  }
});

//--------------------------------------------------------genero-----------------------------------------------------------------------\\
app.post("/genero/cadastro", upload.single("img"), async (req, res) => {
  console.log("Servidor recebeu");
  //Nome_escola, Nome, Descricao, imagem
  const Nome_escola = req.body.escola;
  const Nome = req.body.nome;
  const Descricao = req.body.descricao;
  const imagem = req.file;
  const genero = { Nome_escola, Nome, Descricao, imagem };
  console.log("Servidor", genero);
  //escola, nome, sala, email, senha

  try {
    const teste = await validarGenero(Nome_escola, Nome);
    if (teste[0][0].quantidade >= 1) {
      res.send({ pod: 0 });
    } else {
      const response = await cadastrogenero(
        Nome_escola,
        Nome,
        Descricao,
        imagem
      );
      res.send({ pod: 1 });
    }
  } catch (error) {
    console.log(error);
  }
});

app.get("/genero/quantidade/:escola", async (req, res) => {
  const escola = req.params.escola;

  try {
    const result = await quantgenero(escola);
    res.send({ quantidade: result });
  } catch (error) {
    console.log(error);
  }
});

app.get("/genero/mostrar/:escola", async (req, res) => {
  const escola = req.params.escola;

  try {
    const result = await vergenero(escola);
    res.send(result);
  } catch (error) {
    console.log(error);
  }
});

//--------------------------------------------------------Servidor--------------------------------------------------------------------\\
app.listen(porta, host, () => {
  console.log("Servidor funcionando");
});
