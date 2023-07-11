const getBemVindo = (request, response) => {
    response.status(200).send("API do ESHOP <br/> <a href='https://agroexperiment.vercel.app/'>Clique para acessar a interface de usuário</a>");
}

module.exports = {
    getBemVindo
}

