const { Sequelize } = require('sequelize');

// Configuração isolada da conexão com o Postgres do Docker
const sequelize = new Sequelize('postgresql://admin:admin123@localhost:5432/estoque_db', {
    dialect: 'postgres',
    logging: false
});

module.exports = sequelize;