const router = require("express").Router()
const response = require("../utils/responseModel").get()

router.get("/",(req,res)=>{
    res.render("publico/principal",response)
})
router.get("/login",(req,res)=>{
    res.render("publico/login",response)
})

//primeira parte só com validação de preenchimento
router.post("/login1",async (req,res)=>{
    try{
        let body = JSON.parse(JSON.stringify(req.body))
        let validacao = body.nome==""?false:true
        validacao &= body.senha==""?false:true
        //if de validação
        if(!validacao){
            req.flash("error_msg","Nome de usuário ou senha invalidos!");
            res.redirect("/login");
        }else{
            res.redirect("/privado");
        }
    }catch(erro){
        console.log(erro)
        req.flash("error_msg","Registro não encontrado ou inexistente.");
        res.redirect("/login");
    }    
})

router.post("/login",async (req,res)=>{
    try{
        let body = JSON.parse(JSON.stringify(req.body))
        let validacao = body.nome==""?false:true
        validacao &= body.senha==""?false:true
        //if de validação
        if(!validacao){
            req.flash("error_msg","Nome de usuário ou senha invalidos!");
            res.redirect("/login");
        }else{
            //aqui vamos verificar se o usuário existe
            const db = require("../models");
            const Modelo = db.Usuario;
            const data = await Modelo.findOne({
                where: {
                  nome: body.nome,
                },
              });
            if(!data){
                req.flash("error_msg","Nome de usuário ou senha invalidos!");
                res.redirect("/login");
            }else{
                //Agora vamos ver se a senha é igual a do banco de dados
                const criptografia = require("../utils/criptografia")
                if(!await criptografia.comparar(body.senha,data.senha)){
                    req.flash("error_msg","Nome de usuário ou senha invalidos!");
                    res.redirect("/login");
                }else{
                    //Pra finalizar vamos ativar o usuário na session e abrir o privado
                    req.session.user = JSON.parse(JSON.stringify(data))
                    delete req.session.user.senha
                    res.redirect("/privado");
                }  
            }
        }
    }catch(erro){
        console.log(erro)
        req.flash("error_msg","Registro não encontrado ou inexistente.");
        res.redirect("/login");
    }    
})


module.exports = router