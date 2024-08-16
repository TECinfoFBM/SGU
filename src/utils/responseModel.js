let nome = "Sem Nome"
function get(valor){
    return response = {
        nomeSite:process.env.NOME,
        usuario:getUserName(),
        areaPrivada:valor
    }
}

function verificarAcesso(req,res,next){
    if(req.session.user){
        nome = req.session.user.nome
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