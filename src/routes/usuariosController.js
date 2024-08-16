const router = require("express").Router()
const autenticar = require("../utils/responseModel")
const db = require("../models");
const Modelo = db.Usuario;


async function validaData(data){
    let vef = true
    vef &= data.nome==""?false:true
    vef &= data.email==""?false:true
    vef &= data.senha==""?false:true
    vef &= data.confirmacao==""?false:true

    return vef
}

router.get("/",autenticar.verificarAcesso,async (req,res)=>{
    let response = autenticar.get(true)
    try{
        const data = JSON.parse(JSON.stringify(await Modelo.findAll()));
        if(data.length){
            response.dados = data
            response.total = data.length
            res.render("privado/usuarios/lista",response) 
        }else{
            delete response.dados
            delete response.total
            response.msg = "Registros não encontrados ou inexistentes"
            res.render("privado/usuarios/lista",response)  
        }
    } catch(erro){
        req.flash("error_msg","houve um erro na execução do pedido");
        response.msg = "Registros não encontrados ou inexistentes"
        res.render("privado/usuarios/lista",response)     
    }
})

router.get("/novo",autenticar.verificarAcesso, (req,res)=>{
    let response = autenticar.get(true)
    res.render("privado/usuarios/novo",response)
})

//Primeiro Novo como a regra de negócio
router.post("/novo1",autenticar.verificarAcesso,async (req,res)=>{
    let response = autenticar.get(true)
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
router.post("/novo2",autenticar.verificarAcesso,async (req,res)=>{
    let response = autenticar.get(true)
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
router.post("/novo",autenticar.verificarAcesso,async (req,res)=>{
    let response = autenticar.get(true)
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

router.get("/find/:id",autenticar.verificarAcesso,async (req,res)=>{
    let response = autenticar.get(true)
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
        res.redirect("/privado/usuarios");    
    }
})


router.get("/delete/:id",autenticar.verificarAcesso,async (req,res)=>{
    let response = autenticar.get(true)
    try{
        if(isNaN(req.params.id)){
            req.flash("error_msg","Registro não encontrado ou inexistente.");
            res.redirect("/privado/usuarios");
        }else{
            const data = JSON.parse(JSON.stringify(await Modelo.findByPk(req.params.id)));
            if(data){
                response.dados = data
                res.render("privado/usuarios/deletar",response) 
            }else{
                req.flash("error_msg","Registro não encontrado ou inexistente.");
                res.redirect("/privado/usuarios");
            }
        } 
    } catch(erro){
        req.flash("error_msg","houve um erro na execução do pedido.");
        res.redirect("/privado/usuarios");     
    }
})

router.post("/delete/:id",autenticar.verificarAcesso,async (req,res)=>{
    let response = autenticar.get(true)
    try{
        if(isNaN(req.params.id)){
            req.flash("error_msg","Registro não encontrado ou inexistente.");
            res.redirect("/privado/usuarios");
        }else{
            const data = await Modelo.destroy({
                where: {
                  id: req.params.id,
                },
              });
            if(data){
                req.flash("success_msg","Usuário deletado com sucesso!");
                res.redirect("/privado/usuarios");
            }else{
                req.flash("error_msg","Registro não encontrado ou inexistente.");
                res.redirect("/privado/usuarios");
            }
        } 
    } catch(erro){
        req.flash("error_msg","houve um erro na execução do pedido.");
        res.redirect("/privado/usuarios");response   
    }
})

router.get("/editar/:id",autenticar.verificarAcesso,async (req,res)=>{
    let response = autenticar.get(true)
    try{
        if(isNaN(req.params.id)){
            req.flash("error_msg","Registro não encontrado ou inexistente.");
            res.redirect("/privado/usuarios");
        }else{
            const data = JSON.parse(JSON.stringify(await Modelo.findByPk(req.params.id)));
            if(data){
                response.dados = data
                res.render("privado/usuarios/editar",response) 
            }else{
                req.flash("error_msg","Registro não encontrado ou inexistente.");
                res.redirect("/privado/usuarios");
            }
        } 
    } catch(erro){
        req.flash("error_msg","houve um erro na execução do pedido.");
        res.redirect("/privado/usuarios");    
    }
})

router.post("/editar/:id",autenticar.verificarAcesso,async (req,res)=>{
    let response = autenticar.get(true)
    try{
        if(isNaN(req.params.id)){
            req.flash("error_msg","Registro não encontrado ou inexistente.");
            res.redirect("/privado/usuarios");
        }else{
            const data = await Modelo.findByPk(req.params.id);
            if(data){
                let erro = "";
                let body = JSON.parse(JSON.stringify(req.body))
                let validacao = body.nome==""?false:true
                validacao &= body.email==""?false:true
                if(!validacao){
                    erro="Dados necessários não foram preenchidos!"
                }else{
                    if(body.senha != body.confirmacao){
                        erro="A Senha deve ser igual a Confirmação de Senha!"
                    }else{
                        delete body.confirmacao
                        if(body.senha!=""){
                            const criptografia = require("../utils/criptografia")
                            body.senha = await criptografia.encriptar(body.senha)
                        }else{
                            delete body.senha
                        }
                        const atual = await data.update(body)
                        body = JSON.parse(JSON.stringify(atual));
                    }
                }
                
                if(erro){
                    req.flash("error_msg",erro);
                    res.redirect(`/privado/usuarios/editar/${req.params.id}`);
                }else{
                    req.flash("success_msg","Usuário editado com sucesso!");
                    res.redirect("/privado/usuarios");
                }
            }else{
                req.flash("error_msg","Registro não encontrado ou inexistente.");
                res.redirect("/privado/usuarios");
            }
        } 
    } catch(erro){
        console.log(erro)
        req.flash("error_msg","houve um erro na execução do pedido.");
        res.redirect("/privado/usuarios");     
    }
})

module.exports = router