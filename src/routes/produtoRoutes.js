const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');
const autenticarToken = require('../middlewares/autenticarToken');

// Todas as rotas de produtos agora usam o guardião e chamam o controller correto
router.post('/produtos', autenticarToken, produtoController.criarProduto);
router.get('/produtos', autenticarToken, produtoController.listarProdutos);
router.get('/produtos/:id', autenticarToken, produtoController.buscarPorId);
router.delete('/produtos/:id', autenticarToken, produtoController.deletarProduto);
router.patch('/produtos/:id', autenticarToken, produtoController.atualizarProduto);

module.exports = router;