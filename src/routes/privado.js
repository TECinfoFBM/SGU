const router = require("express").Router()
const response = require("../utils/responseModel").get()
response.areaPrivada=true


router.get("/",(req,res)=>{
    res.render("privado/principal",response)
})
const usuarios = require("./usuariosController")
router.use("/usuarios/",usuarios)

const cantores = require("./cantoresController")
router.use("/cantores/",cantores)

module.exports = router