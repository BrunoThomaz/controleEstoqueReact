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
        type: Number,
        required: true,
    },
    equipamento: {
        type: String,
        required: true,
    },
    valorMedio: {
        type: Number,
        required: true,
    },
    descricao: {
        type: String,
        required: true,
    },
    localizacao: {
        type: Object,
        required: true,
    },
    estoqueMinimo: {
        type: Number,
        required: true,
        default: 0
    }
});

const Produto = mongoose.model('produto', produtoSchema);

module.exports = {Produto, produtoSchema};