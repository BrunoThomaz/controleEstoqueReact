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
        required: false,
    },
    equipamento: {
        type: String,
        required: false,
    },
    valorMedio: {
        type: Number,
        required: false,
    },
    descricao: {
        type: String,
        required: false,
    },
    localizacao: {
        type: Object,
        required: false,
    },
    estoqueMinimo: {
        type: Number,
        required: false,
    }
});

const Produto = mongoose.model('produto', produtoSchema);

module.exports = {Produto, produtoSchema};