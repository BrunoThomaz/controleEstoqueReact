const express = require('express')
const router = express.Router()
const { Produto } = require('../models/produto')
const { Movimentacao } = require('../models/movimentacao')
const QRCode = require('qrcode')

//Main route to index page is performed in server.js by static folder "Cliente"
//TO DO: refactoring app screens with React

router.post('/cadastro-movimentacao', async (req, res) => {
    console.log(req.body)
    const movimentacao = req.body
    try {
        movimentacao.quantidade = Number(movimentacao.quantidade)
        await Movimentacao.findOneAndUpdate({codigo:movimentacao.codigo},movimentacao,{new:true, upsert: true})
        let produtoEstoque = await Produto.findOne({codigo:movimentacao.codigo})
        quantidadeAntesMovimentacao = produtoEstoque.quantidade
        valorMedioAntesMovimentacao = produtoEstoque.valorMedio
        if (movimentacao.tipo == 'entrada') {
            movimentacao.valorUnitario = Number(movimentacao.valorUnitario)

            //Atualiza Quantidade
            quantidadeDepoisMovimentacao = quantidadeAntesMovimentacao + movimentacao.quantidade
            produtoEstoque.quantidade = quantidadeDepoisMovimentacao

            //Atualiza Valor Médio
            valorMedioDepoisMovimentacao = ((valorMedioAntesMovimentacao * quantidadeAntesMovimentacao) + (movimentacao.quantidade * movimentacao.valorUnitario)) / quantidadeDepoisMovimentacao
            produtoEstoque.valorMedio = valorMedioDepoisMovimentacao

            const produtoAtualizado = await Produto.findOneAndUpdate({codigo: produtoEstoque.codigo}, produtoEstoque, {new:true, upsert: true})
            console.log(produtoAtualizado)
        } else if (movimentacao.tipo == 'saida') {
            produtoEstoque.quantidade =  quantidadeAntesMovimentacao - movimentacao.quantidade
            if (produtoEstoque < 0) {
                return 'Erro na quantidade'
            }
            const produtoAtualizado = await Produto.findOneAndUpdate({codigo: produtoEstoque.codigo}, produtoEstoque, {new:true, upsert: true})
            console.log(produtoAtualizado)
        }
        res.redirect(`/${movimentacao.tipo}.html?response="Estoque atualizado com sucesso. Código: ${movimentacao.codigo}"`)
    } catch (error) {
        console.log(error);
        res.redirect(`/${movimentacao.tipo}.html?response="Erro Interno contate o administrador`)
    }
})
router.post('/atualizaEstoque', async (req, res) => {
    try {
        let itemCadastro = req.body
        itemCadastro.valorMedio = Number(itemCadastro.valorMedio)
        itemCadastro.estoqueMinimo = Number(itemCadastro.estoqueMinimo)
        itemCadastro.quantidade = Number(itemCadastro.quantidade)
        const itemCadastrado = await Produto.findOneAndUpdate({codigo:itemCadastro.codigo},itemCadastro,{new:true, upsert: true})
        res.redirect(`/atualizacao.html?response="Estoque atualizado com sucesso. Código: ${itemCadastro.codigo}"`)
    } catch (error) {
        console.log(error);
        res.redirect(`/atualizacao.html?response="Erro Interno contate o administrador`)
    }
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
