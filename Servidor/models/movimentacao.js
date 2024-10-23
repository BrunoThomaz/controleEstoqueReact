const mongoose = require('mongoose');

const saidaSchema = new mongoose.Schema({
    codigo: {
        type: String,
        required: true
    },
    produto: {
        type: String,
        required: true
    },
    quantidade: {
        type: String,
        required: false
    },
    usuario: {
        type: String,
        required: false
    },
    data: {
        type: Date,
        default: new Date(),
        required: false
    },
    tipo: {
        type: String,
        required: true
    }
});


const Saida = mongoose.model('saida', saidaSchema);


module.exports = {Saida, saidaSchema};