const router = require("express").Router()
const response = require("../utils/responseModel").get()

router.get("/",(req,res)=>{
    res.render("publico/principal",response)
})

module.exports = router