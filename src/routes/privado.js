const router = require("express").Router()
const response = require("../utils/responseModel").get()
response.areaPrivada=true
response.usuario = "Fulano"

router.get("/",(req,res)=>{
    res.render("privado/principal",response)
})

module.exports = router