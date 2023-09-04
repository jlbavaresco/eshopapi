const { Router } = require('express');

const { getAvaliacoes, addAvaliacao, updateAvaliacao, deleteAvaliacao, getAvaliacaoPorCodigo } = require('../controllers/avaliacaoController');

const { verificaJWT } = require('../controllers/segurancaController');

const rotasAvaliacoes = new Router();

rotasAvaliacoes.route('/avaliacao/produto/:codigoproduto')  
   .get(getAvaliacoes)

rotasAvaliacoes.route('/avaliacao')   
   .post(addAvaliacao)
   .put(verificaJWT, updateAvaliacao)

rotasAvaliacoes.route('/avaliacao/:codigo')
   .get(getAvaliacaoPorCodigo)
   .delete(verificaJWT, deleteAvaliacao)

module.exports = { rotasAvaliacoes };