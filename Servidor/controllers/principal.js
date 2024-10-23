const express = require('express')
const router = express.Router()
const { Produto } = require('../models/produto')
const { Saida } = require('../models/movimentacao')
const QRCode = require('qrcode')

//Main route to index page is performed in server.js by static folder "Cliente"
//TO DO: refactoring app screens with React

router.post('/cadastro', async (req, res) => {
    console.log(req.body)
    const itemCadastro = req.body
    const itemCadastrado = await Produto.findOneAndUpdate({codigo:req.body.codigo},itemCadastro,{new:true, upsert: true})
    res.redirect(`/entrada.html?response="Estoque atualizado com sucesso. Código: ${itemCadastro.codigo}"`)
})
router.post('/cadastro-local', async (req, res) => {
    return console.log(req.body)
   
})
router.post('/saida', async (req, res) => {
    console.log(req.body)
    const itemCadastro = req.body
    let item = await Produto.findOne({codigo:req.body.codigo})
    const novaQuantidade = item.quantidade - req.body.quantidade
    item = await Produto.findOneAndUpdate({codigo:req.body.codigo},{quantidade:novaQuantidade},{new:true})

    
    const novaSaida = await Saida.create({
        codigo: item.codigo,
        produto: item.produto,
        quantidade: req.body.quantidade,
        usuario: 'Usuário Desconhecido'
    })
    res.redirect(`/saida.html?response="Estoque atualizado com sucesso. Nova saída gerada, código: ${novaSaida._id}"`)
})

router.get('/saida', async (req, res) => {
    const historicoSaida = await Saida.find()
    res.send(historicoSaida)
})

router.get('/consulta', async (req, res) => {
    const produto = await Produto.find()
    res.send(produto)
})
router.get('/pesquisa/:codigo', async (req, res) => {
    const { codigo } = req.params
    const produto = await Produto.findOne({codigo})
    console.log(produto)
    res.send(produto)
})

router.get('/gera/:codigo',async (req, res) => {
    try {
        const { codigo } = req.params
        const qrCodeImage = await QRCode.toDataURL(codigo)
        res.send(`<img src="${qrCodeImage}"/></br><p>${codigo}</p>`);
    } catch (err) {
        console.error('Error generating QR code:', err);
        res.status(500).send('Internal Server Error');
    }
});


module.exports = (app) => {
    return app.use('/', router)
}
