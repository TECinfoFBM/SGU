const router = require("express").Router()
const autenticar = require("../utils/responseModel")

router.get("/",autenticar.verificarAcesso,(req,res)=>{
    let response = autenticar.get(true)
    res.render("privado/principal",response)
})

router.get("/sair",(req,res)=>{
    delete req.session.user
    res.redirect("/")
})
const usuarios = require("./usuariosController")
router.use("/usuarios/",usuarios)

const cantores = require("./cantoresController")
router.use("/cantores/",cantores)

module.exports = router