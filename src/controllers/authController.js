const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Usuario } = require('../models'); // Busca do nosso index.js dos models

const JWT_SECRET = 'zezinho123';

// Lógica de Registro
exports.registrar = async (req, res) => {
    try {
        const {email, senha } = req.body;

        const usuarioExiste = await Usuario.findOne({ where: { email } });
        if (usuarioExiste) {
            return res.status(400).json({ erro: 'E-mail já cadastrado.' });
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10);

        const novoUsuario = await Usuario.create({
            email,
            senha: senhaCriptografada
        });

        return res.status(201).json({ id: novoUsuario.id, email: novoUsuario.email });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ erro: 'Erro ao registrar usuário.' });
    }
};

// Lógica de Login
exports.login = async (req, res) => {
    try {
        const { email, senha } = req.body;

        const usuario = await Usuario.findOne({ where: { email } });
        if (!usuario) {
            return res.status(401).json({ erro: 'E-mail ou senha inválidos.' });
        }

        const senhaValida = await bcrypt.compare(senha, usuario.senha);
        if (!senhaValida) {
            return res.status(401).json({ erro: 'E-mail ou senha inválidos.' });
        }

        const token = jwt.sign(
            { id: usuario.id, email: usuario.email },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        return res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ erro: 'Erro ao realizar login.' });
    }
};