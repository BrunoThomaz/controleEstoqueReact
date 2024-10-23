const mongoose = require('mongoose');

const caixaSchema = new mongoose.Schema({
    codigo: {
        type: String,
        required: true,
        default: Math.random() * 10000
    },
    capacidade: {
        type: String,
        required: false,
    },
    espacoDisponivel: {
        type: Boolean,
        required: false,
    }
});
const Caixa = mongoose.model('caixa', caixaSchema);

const prateleiraSchema = new mongoose.Schema({
    codigo: {
        type: String,
        required: true,
        default: Math.random() * 10000
    },
    capacidade: {
        type: String,
        required: false,
    },
    espacoDisponivel: {
        type: Boolean,
        required: false,
    }
});
const Prateleira = mongoose.model('prateleira', prateleiraSchema);

const armarioSchema = new mongoose.Schema({
    codigo: {
        type: String,
        required: true,
        default: Math.random() * 10000
    },
    capacidade: {
        type: String,
        required: false,
    },
    espacoDisponivel: {
        type: Boolean,
        required: false,
    }
});
const Armario = mongoose.model('armario', armarioSchema);

const localSchema = new mongoose.Schema({
    codigo: {
        type: String,
        required: true,
    },
    setor: {
        type: String,
        required: true,
    },
    armario: {
        type: Armario,
        required: true,
    },
    prateleira: {
        type: Prateleira,
        required: false,
    },
    caixa: {
        type: Caixa,
        required: false,
    }
});
const Local = mongoose.model('local', localSchema);


module.exports = {Local, localSchema};