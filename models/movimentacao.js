const mongoose = require('mongoose');

const movimentacaoSchema = new mongoose.Schema({
    codigo: {
        type: String,
        required: true
    },
    quantidade: {
        type: Number,
        required: true
    },
    usuario: {
        type: String,
        required: true
    },
    data: {
        type: Date,
        default: new Date(),
        required: false
    },
    tipo: {
        type: String,
        required: true
    },
    valorUnitario: {
        type: Number,
        required: true
    }
});


const Movimentacao = mongoose.model('movimentacao', movimentacaoSchema);


module.exports = {Movimentacao, movimentacaoSchema};