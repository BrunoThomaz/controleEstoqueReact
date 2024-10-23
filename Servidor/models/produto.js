const mongoose = require('mongoose');

const produtoSchema = new mongoose.Schema({
    codigo: {
        type: String,
        required: true,
    },
    produto: {
        type: String,
        required: true,
    },
    quantidade: {
        type: String,
        required: false,
    },
    equipamento: {
        type: String,
        required: false,
    },
    valorMedio: {
        type: String,
        required: false,
    },
    descricao: {
        type: String,
        required: false,
    },
    localizacao: {
        type: String,
        required: false,
    },
    estoqueMinimo: {
        type: String,
        required: false,
    }
});

const Produto = mongoose.model('produto', produtoSchema);

module.exports = {Produto, produtoSchema};