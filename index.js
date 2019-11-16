const express = require("express");
const multer = require("multer");
const path = require("path");
const sha256 = require("crypto-js/sha256");

const app = express();

app.set('view engine','ejs');

const storage = multer.diskStorage({
  destination: (req,file,cb) =>{
    cb(null,"uploads/");
  },
  filename: (req,file,cb) => {
    let fileName = sha256(file.originalname+Date.now());
    let fileExtName = path.extname(file.originalname);
    cb(null,`${fileName}${fileExtName}`);
  }
});

const upload = multer({storage});

app.get('/',(req,res) => {
  res.render('index');
});

app.post('/upload',upload.single('arquivo'),(req,res) =>{
  res.send('Arquivo Recebido!');
});

app.listen('3000',()=>{
  console.log("Servidor Rodando");
})

