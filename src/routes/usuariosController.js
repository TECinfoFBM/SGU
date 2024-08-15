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

router.get("/",async (req,res)=>{
    try{
        const data = JSON.parse(JSON.stringify(await Modelo.findAll()));
        if(data.length){
            response.dados = data
            response.total = data.length
            res.render("privado/usuarios/lista",response) 
        }else{
            response.msg = "Registros não encontrados ou inexistentes"
            res.render("privado/usuarios/lista",response)  
        }
    } catch(erro){
        req.flash("error_msg","houve um erro na execução do pedido");
        response.msg = "Registros não encontrados ou inexistentes"
        res.render("privado/usuarios/lista",response)     
    }
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

router.get("/find/:id",async (req,res)=>{
    try{
        if(isNaN(req.params.id)){
            req.flash("error_msg","Registro não encontrado ou inexistente.");
            res.redirect("/privado/usuarios");
        }else{
            const data = JSON.parse(JSON.stringify(await Modelo.findByPk(req.params.id)));
            if(data){
                response.dados = data
                res.render("privado/usuarios/detalhe",response) 
            }else{
                req.flash("error_msg","Registro não encontrado ou inexistente.");
                res.redirect("/privado/usuarios");
            }
        } 
    } catch(erro){
        req.flash("error_msg","houve um erro na execução do pedido.");
        res.render("privado/usuarios",response)     
    }
})


module.exports = router