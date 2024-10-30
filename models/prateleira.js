const mongoose = require('mongoose');

const prateleiraSchema = new mongoose.Schema({
    codigo: {
        type: String,
        required: true
    },
    nome: {
        type: String,
        required: true
    },
    caixas: {
        type: Array,
        default: []
    }
});


const Prateleira = mongoose.model('prateleira', prateleiraSchema);


module.exports = {Prateleira, prateleiraSchema};