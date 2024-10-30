const mongoose = require('mongoose')

const caixaSchema = new mongoose.Schema({
    codigo: {
        type: String,
        required: true
    },
    nome: {
        type: String,
        required: true
    }
});


const Caixa = mongoose.model('caixa', caixaSchema)


module.exports = {Caixa, caixaSchema}