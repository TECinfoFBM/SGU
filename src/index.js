//Configuração do servidor Express
const express = require("express")
const app = new express()

//Configuração do Express
require("dotenv").config();
const ip = require("ip").address();
const protocol = process.env.PROTOCOL || "http"
const port = process.env.PORT || 3000

//Configuração dos arquivos publicos e estáticos
const path = require("path");
app.use(express.static(path.join(__dirname, '../public')));

//Configuração do Body-Parser
var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

//Configuração do handlebars
const { engine } = require("express-handlebars")
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');



app.listen(port, () => {
    console.log(`Server start in: http://localhost:${port}`)
})

//Configuração das rotas do servidor 
const publico = require("./routes/publico")
app.use("/",publico)
const privado = require("./routes/privado")
app.use("/privado/",privado)
