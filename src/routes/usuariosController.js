const router = require("express").Router()
const response = require("../utils/responseModel").get()
const db = require("../models");
const Modelo = db.Usuario;
response.areaPrivada=true

async function validaData(data){
    let vef = true
    vef &= data.nome==""?false:true
    vef &= data.email==""?false:true
    vef &= data.senha==""?false:true
    vef &= data.confirmacao==""?false:true

    return vef
}

router.get("/",(req,res)=>{
    res.render("privado/usuarios/lista",response)
})

router.get("/novo", (req,res)=>{
    res.render("privado/usuarios/novo",response)
})

//Primeiro Novo como a regra de negócio
router.post("/novo1",async (req,res)=>{
    let body = JSON.parse(JSON.stringify(req.body))
    let validacao = await validaData(body)
    let erro = "";
    if(!validacao){
        erro="Dados necessários não foram preenchidos!"
    }else{
        if(body.senha != body.confirmacao){
            erro="A Senha deve ser igual a Confirmação de Senha!"
        }else{
            delete body.confirmacao
            const criptografia = require("../utils/criptografia")
            body.senha = await criptografia.encriptar(body.senha)
        }
    }
    
    if(erro){
        res.send(erro)
    }else{
        res.send(body)
    }
})

//Segundo Novo com a gravação no Banco de Dados (não esquecer do modelo)
router.post("/novo2",async (req,res)=>{
    let body = JSON.parse(JSON.stringify(req.body))
    let validacao = await validaData(body)
    let erro = "";
    if(!validacao){
        erro="Dados necessários não foram preenchidos!"
    }else{
        if(body.senha != body.confirmacao){
            erro="A Senha deve ser igual a Confirmação de Senha!"
        }else{
            delete body.confirmacao
            const criptografia = require("../utils/criptografia")
            body.senha = await criptografia.encriptar(body.senha)
            const data = await Modelo.create(body)
            body = JSON.parse(JSON.stringify(data));
        }
    }
    
    if(erro){
        res.send(erro)
    }else{
        res.send(body)
    }
})

//Terceiro novo com a mensagem na Session(ajustar no index)
router.post("/novo",async (req,res)=>{
    let body = JSON.parse(JSON.stringify(req.body))
    let validacao = await validaData(body)
    let erro = "";
    if(!validacao){
        erro="Dados necessários não foram preenchidos!"
    }else{
        if(body.senha != body.confirmacao){
            erro="A Senha deve ser igual a Confirmação de Senha!"
        }else{
            delete body.confirmacao
            const criptografia = require("../utils/criptografia")
            body.senha = await criptografia.encriptar(body.senha)
            const data = await Modelo.create(body)
            body = JSON.parse(JSON.stringify(data));
        }
    }
    
    if(erro){
        req.flash("error_msg",erro);
        res.redirect("/privado/usuarios/novo");
    }else{
        req.flash("success_msg","Usuário cadastrado com sucesso!");
        res.redirect("/privado/usuarios");
    }
})

module.exports = router