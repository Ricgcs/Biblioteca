import express, { response } from "express";
import bodyParser from "body-parser";
import path from 'path';
import cors from 'cors';
import multer from 'multer';

const app = express()
const host = "127.0.0.1";
const porta = 3300;


const storage = multer.memoryStorage();
const upload  = multer({storage:storage});

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'front')));
app.use(cors());
//--------------------------------------------------------Escola---------------------------------------------------------------------\\
app.post("/empresa/",(req,res)=>{

})


//--------------------------------------------------------Servidor--------------------------------------------------------------------\\
app.listen(porta, host,()=>{
    console.log("Servido funcionando");
})