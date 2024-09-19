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
        required: true,
    },
    equipamento: {
        type: String,
        required: true,
    }
});


const Produto = mongoose.model('produto', produtoSchema);


module.exports = {Produto, produtoSchema};