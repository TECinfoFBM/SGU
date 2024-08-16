let nome = "Sem Nome"
let id = "0"
function get(valor){
    return response = {
        nomeSite:process.env.NOME,
        usuario:getUserName(),
        areaPrivada:valor,
        id:id
    }
}

function verificarAcesso(req,res,next){
    if(req.session.user){
        nome = req.session.user.nome
        id = req.session.user.id
        next();
    }else{
        req.flash("error_msg","Pro favor, realize o login antes de acessar esta página.");
        res.redirect("/login");
    }
}

function getUserName(){
    return nome
}

module.exports = {get,verificarAcesso}