const router = require("express").Router()
const response = require("../utils/responseModel")
response.areaPrivada=true

router.get("/",response.verificarAcesso,(req,res)=>{
    res.render("privado/principal",response)
})
const usuarios = require("./usuariosController")
router.use("/usuarios/",response.verificarAcesso,usuarios)

const cantores = require("./cantoresController")
router.use("/cantores/",response.verificarAcesso,cantores)

module.exports = router