const { Router } = require('express');

const { getAvaliacoes, addAvaliacao, updateAvaliacao, deleteAvaliacao, getAvaliacaoPorCodigo } = require('../controllers/avaliacaoController');

const rotasAvaliacoes = new Router();

rotasAvaliacoes.route('/avaliacao/produto/:codigoproduto')  
   .get(getAvaliacoes)

rotasAvaliacoes.route('/avaliacao')   
   .post(addAvaliacao)
   .put(updateAvaliacao)

rotasAvaliacoes.route('/avaliacao/:codigo')
   .get(getAvaliacaoPorCodigo)
   .delete(deleteAvaliacao)

module.exports = { rotasAvaliacoes };