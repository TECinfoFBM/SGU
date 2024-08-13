const router = require("express").Router()
const response = require("../utils/responseModel").get()
response.areaPrivada=true
response.usuario = "Fulano"

router.get("/",(req,res)=>{
    res.render("privado/principal",response)
})
router.get("/usuarios",(req,res)=>{
    res.render("privado/usuarios/lista",response)
})
router.get("/usuarios/novo",(req,res)=>{
    res.render("privado/usuarios/novo",response)
})

module.exports = router