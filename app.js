const express = require('express');
const cors = require('cors')
const sequelize = require('./src/config/database');
const authRoutes = require('./src/routes/authRoutes');
const produtoRoutes = require('./src/routes/produtoRoutes');

const app = express();
app.use(cors())
app.use(express.json());

// Linkando as rotas na nossa aplicação
app.use('/auth', authRoutes); // Tudo o que estiver em authRoutes vai começar com /auth
app.use('/', produtoRoutes);  // Rotas de produtos (/produtos)

// Sincroniza o banco usando a nossa conexão isolada
// Deixei o { alter: true } caso alguma coluna nova precise ser criada no Docker
sequelize.sync({ alter: true })
    .then(() => console.log('🚀 Banco de dados sincronizado e arquitetura nova rodando!'))
    .catch(err => console.error('❌ Erro ao conectar no banco:', err));

const PORTA = 3000;
app.listen(PORTA, () => {
  console.log(`Servidor Express rodando na porta ${PORTA}`);
});