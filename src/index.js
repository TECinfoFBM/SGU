//Configuração do servidor Express
const express = require("express")
const app = new express()

//Configuração do Express
require("dotenv").config();
const ip = require("ip").address();
const protocol = process.env.PROTOCOL || "http"
const port = process.env.PORT || 3000

//configuração da sessão (Salva dados temporarios no servidor)
const session = require("express-session");
app.use(session({
    secret:process.env.SECRET, //colocar a palavra secreta no .env
    resave:true,
    saveUninitialized:true
}));
const flash = require("connect-flash");
app.use(flash());

//Configuração de um middleware 
//Toda vez que o programa rodar, ele passará por este processo
app.use((req,res,next)=>{
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    next();
});

//Configuração do Body-Parser
var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

//Configuração do handlebars
const { engine } = require("express-handlebars")
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

//Configuração dos arquivos publicos e estáticos
const path = require("path");
app.use(express.static(path.join(__dirname, '../public')));

app.listen(port, () => {
    console.log(`Server start in: http://localhost:${port}`)
})

//Configuração das rotas do servidor 
const publico = require("./routes/publico")
app.use("/",publico)
const privado = require("./routes/privado")
app.use("/privado/",privado)

//Configuração do Banco de Dados
const db = require("./models");
db.sequelize.sync().then(() => {
    console.log("Banco de dados sincronizado.");
}).catch((err) => {
    console.log("Falha ao sincronizar o banco de dados: " + err.message);
});


