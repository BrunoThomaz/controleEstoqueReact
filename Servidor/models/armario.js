const mongoose = require('mongoose')
const { Prateleira } = require('./prateleira')

const armarioSchema = new mongoose.Schema({
    codigo: {
        type: String,
        required: true
    },
    nome: {
        type: String,
        required: true
    },
    prateleiras: {
        type: Array,
        default: []
    }
});


const Armario = mongoose.model('armario', armarioSchema)


module.exports = {Armario, armarioSchema}