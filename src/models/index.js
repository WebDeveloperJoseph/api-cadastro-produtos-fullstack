const Usuario = require('./Usuario');
const Produto = require('./Produto');

// Define os relacionamentos que fizemos na última aula
Usuario.hasMany(Produto);
Produto.belongsTo(Usuario);

module.exports = {
    Usuario,
    Produto
};