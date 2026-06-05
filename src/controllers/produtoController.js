const { Produto } = require('../models');

// Criar Produto
exports.criarProduto = async (req, res) => {
    try {
        const { nome, preco, quantidade } = req.body;
        const usuarioId = req.usuarioLogado.id;

        const novoProduto = await Produto.create({
            nome,
            preco,
            quantidade,
            UsuarioId: usuarioId
        });

        return res.status(201).json(novoProduto);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ erro: 'Erro ao cadastrar o produto.' });
    }
};

// Listar todos os Produtos do Usuário
exports.listarProdutos = async (req, res) => {
    try {
        const usuarioId = req.usuarioLogado.id;

        const listaProdutos = await Produto.findAll({
            where: { UsuarioId: usuarioId },
            order: [['id', 'ASC']],
        });

        return res.status(200).json(listaProdutos);
    } catch (err) {
        return res.status(500).json({ erro: 'Erro ao buscar produtos.' });
    }
};

// Buscar por ID
exports.buscarPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const produtoEncontrado = await Produto.findByPk(id);

        if (!produtoEncontrado || produtoEncontrado.UsuarioId !== req.usuarioLogado.id) {
            return res.status(404).json({ erro: 'Produto não encontrado.' });
        }

        return res.status(200).json(produtoEncontrado);
    } catch (err) {
        return res.status(500).json({ erro: 'Erro ao buscar o produto.' });
    }
};

// Deletar Produto
exports.deletarProduto = async (req, res) => {
    try {
        const { id } = req.params;
        const produtoEncontrado = await Produto.findByPk(id);

        if (!produtoEncontrado || produtoEncontrado.UsuarioId !== req.usuarioLogado.id) {
            return res.status(404).json({ erro: 'Produto não encontrado.' });
        }

        await produtoEncontrado.destroy();
        return res.status(204).send();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ erro: 'Erro ao deletar o produto.' });
    }
};

// Atualizar Produto (PATCH)
exports.atualizarProduto = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, preco, quantidade } = req.body;

        const produto = await Produto.findByPk(id);

        if (!produto || produto.UsuarioId !== req.usuarioLogado.id) {
            return res.status(404).json({ erro: 'Produto não encontrado.' });
        }

        produto.nome = nome || produto.nome;
        produto.preco = preco !== undefined ? preco : produto.preco;
        produto.quantidade = quantidade !== undefined ? quantity : produto.quantidade;

        await produto.save();
        return res.status(200).json(produto);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ erro: 'Erro ao atualizar o produto.' });
    }
};