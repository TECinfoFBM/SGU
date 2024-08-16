const router = require("express").Router()
const autenticar = require("../utils/responseModel")
const db = require("../models");
const Modelo = db.Cantor;

async function validaData(data){
    let vef = true
    vef &= data.nome==""?false:true

    return vef
}

router.get("/",autenticar.verificarAcesso,async (req,res)=>{
    let response = autenticar.get(true)
    try{
        const data = JSON.parse(JSON.stringify(await Modelo.findAll()));
        if(data.length){
            response.dados = data
            response.total = data.length
            res.render("privado/cantores/lista",response) 
        }else{
            delete response.dados
            delete response.total
            response.msg = "Registros não encontrados ou inexistentes"
            res.render("privado/cantores/lista",response)  
        }
    } catch(erro){
        req.flash("error_msg","houve um erro na execução do pedido");
        response.msg = "Registros não encontrados ou inexistentes"
        res.render("privado/cantores/lista",response)     
    }
})

router.get("/novo",autenticar.verificarAcesso, (req,res)=>{
    res.render("privado/cantores/novo",response)
})

//Terceiro novo com a mensagem na Session(ajustar no index)
router.post("/novo",async (req,res)=>{
    let response = autenticar.get(true)
    let body = JSON.parse(JSON.stringify(req.body))
    let validacao = await validaData(body)
    let erro = "";
    if(!validacao){
        erro="Dados necessários não foram preenchidos!"
    }else{
        const data = await Modelo.create(body)
        body = JSON.parse(JSON.stringify(data));
    }
    
    if(erro){
        req.flash("error_msg",erro);
        res.redirect("/privado/cantores/novo");
    }else{
        req.flash("success_msg","Cantor cadastrado com sucesso!");
        res.redirect("/privado/cantores");
    }
})

router.get("/find/:id",autenticar.verificarAcesso,async (req,res)=>{
    let response = autenticar.get(true)
    try{
        if(isNaN(req.params.id)){
            req.flash("error_msg","Registro não encontrado ou inexistente.");
            res.redirect("/privado/cantores");
        }else{
            const data = JSON.parse(JSON.stringify(await Modelo.findByPk(req.params.id)));
            if(data){
                response.dados = data
                res.render("privado/cantores/detalhe",response) 
            }else{
                req.flash("error_msg","Registro não encontrado ou inexistente.");
                res.redirect("/privado/cantores");
            }
        } 
    } catch(erro){
        req.flash("error_msg","houve um erro na execução do pedido.");
        res.redirect("/privado/cantores");    
    }
})


router.get("/delete/:id",autenticar.verificarAcesso,async (req,res)=>{
    let response = autenticar.get(true)
    try{
        if(isNaN(req.params.id)){
            req.flash("error_msg","Registro não encontrado ou inexistente.");
            res.redirect("/privado/cantores");
        }else{
            const data = JSON.parse(JSON.stringify(await Modelo.findByPk(req.params.id)));
            if(data){
                response.dados = data
                res.render("privado/cantores/deletar",response) 
            }else{
                req.flash("error_msg","Registro não encontrado ou inexistente.");
                res.redirect("/privado/cantores");
            }
        } 
    } catch(erro){
        req.flash("error_msg","houve um erro na execução do pedido.");
        res.redirect("/privado/cantores");     
    }
})

router.post("/delete/:id",autenticar.verificarAcesso,async (req,res)=>{
    let response = autenticar.get(true)
    try{
        if(isNaN(req.params.id)){
            req.flash("error_msg","Registro não encontrado ou inexistente.");
            res.redirect("/privado/cantores");
        }else{
            const data = await Modelo.destroy({
                where: {
                  id: req.params.id,
                },
              });
            if(data){
                req.flash("success_msg","Cantor deletado com sucesso!");
                res.redirect("/privado/cantores");
            }else{
                req.flash("error_msg","Registro não encontrado ou inexistente.");
                res.redirect("/privado/cantores");
            }
        } 
    } catch(erro){
        req.flash("error_msg","houve um erro na execução do pedido.");
        res.redirect("/privado/cantores");   
    }
})

router.get("/editar/:id",autenticar.verificarAcesso,async (req,res)=>{
    let response = autenticar.get(true)
    try{
        if(isNaN(req.params.id)){
            req.flash("error_msg","Registro não encontrado ou inexistente.");
            res.redirect("/privado/cantores");
        }else{
            const data = JSON.parse(JSON.stringify(await Modelo.findByPk(req.params.id)));
            if(data){
                response.dados = data
                res.render("privado/cantores/editar",response) 
            }else{
                req.flash("error_msg","Registro não encontrado ou inexistente.");
                res.redirect("/privado/cantores");
            }
        } 
    } catch(erro){
        req.flash("error_msg","houve um erro na execução do pedido.");
        res.redirect("/privado/cantores");    
    }
})

router.post("/editar/:id",autenticar.verificarAcesso,async (req,res)=>{
    let response = autenticar.get(true)
    try{
        if(isNaN(req.params.id)){
            req.flash("error_msg","Registro não encontrado ou inexistente.");
            res.redirect("/privado/cantores");
        }else{
            const data = await Modelo.findByPk(req.params.id);
            if(data){
                let erro = "";
                let body = JSON.parse(JSON.stringify(req.body))
                let validacao = body.nome==""?false:true
                if(!validacao){
                    erro="Dados necessários não foram preenchidos!"
                }else{
                    const atual = await data.update(body)
                    body = JSON.parse(JSON.stringify(atual));
                }
                if(erro){
                    req.flash("error_msg",erro);
                    res.redirect(`/privado/cantores/editar/${req.params.id}`);
                }else{
                    req.flash("success_msg","Cantor editado com sucesso!");
                    res.redirect("/privado/cantores");
                }
            }else{
                req.flash("error_msg","Registro não encontrado ou inexistente.");
                res.redirect("/privado/cantores");
            }
        } 
    } catch(erro){
        console.log(erro)
        req.flash("error_msg","houve um erro na execução do pedido.");
        res.redirect("/privado/cantores");     
    }
})

module.exports = router