function get(){
    return response = {
        nomeSite:process.env.NOME,
        usuario:getUserName()
    }
}

function getUserName(){
    return "Fulano"
}

module.exports = {get}