const { getAvaliacaoDB, addAvaliacaoDB, updateAvaliacaoDB, deleteAvaliacaoDB, getAvaliacaoPorCodigoDB } = require('../usecases/avaliacaoUseCases')

const getAvaliacoes = async (request, response) => {
    await getAvaliacaoDB(parseInt(request.params.codigoproduto))
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: 'Erro ao consultar as avaliacoes: ' + err
        }));
}

const addAvaliacao = async (request, response) => {
    await addAvaliacaoDB(request.body)
        .then(data => response.status(200).json({
            status: "success", message: "Avaliação criada",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

const updateAvaliacao = async (request, response) => {
    await updateAvaliacaoDB(request.body)
        .then(data => response.status(200).json({
            status: "success", message: "Avaliação alterada",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

const deleteAvaliacao = async (request, response) => {
    await deleteAvaliacaoDB(parseInt(request.params.codigo))
        .then(data => response.status(200).json({
            status: "success", message: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));        
}

const getAvaliacaoPorCodigo= async (request, response) => {
    await getAvaliacaoPorCodigoDB(parseInt(request.params.codigo))
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));           
}

module.exports = {
    getAvaliacoes, addAvaliacao, updateAvaliacao, deleteAvaliacao, getAvaliacaoPorCodigo
}

