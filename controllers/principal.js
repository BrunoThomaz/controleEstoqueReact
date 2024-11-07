const express = require('express')
const router = express.Router()
const { Produto } = require('../models/produto')
const { Movimentacao } = require('../models/movimentacao')
const { Armario } = require('../models/armario')
const { Prateleira } = require('../models/prateleira')
const { Caixa } = require('../models/caixa')

const QRCode = require('qrcode')

//Main route to index page is performed in server.js by static folder "Cliente"
//TO DO: refactoring app screens with React

router.post('/cadastro-movimentacao', async (req, res) => {
    const movimentacao = req.body
    console.log(movimentacao)
    try {
        movimentacao.quantidade = Number(movimentacao.quantidade)
        await Movimentacao.findOneAndUpdate({codigo:movimentacao.codigo},movimentacao,{new:true, upsert: true})
        let produtoEstoque = await Produto.findOne({codigo:movimentacao.codigo}) || {codigo:movimentacao.codigo}
        quantidadeAntesMovimentacao = produtoEstoque.quantidade || 0
        valorMedioAntesMovimentacao = produtoEstoque.valorMedio || 0
        if (movimentacao.tipo == 'entrada') {
            movimentacao.valorUnitario = Number(movimentacao.valorUnitario)

            //Atualiza Quantidade
            quantidadeDepoisMovimentacao = quantidadeAntesMovimentacao + movimentacao.quantidade
            produtoEstoque.quantidade = quantidadeDepoisMovimentacao

            //Atualiza Valor Médio
            valorMedioDepoisMovimentacao = ((valorMedioAntesMovimentacao * quantidadeAntesMovimentacao) + (movimentacao.quantidade * movimentacao.valorUnitario)) / quantidadeDepoisMovimentacao
            produtoEstoque.valorMedio = valorMedioDepoisMovimentacao

            produtoEstoque.descricao = movimentacao.descricao
            produtoEstoque.equipamento = movimentacao.equipamento
            produtoEstoque.localizacao = {
                armario: movimentacao['select-armario'],
                prateleira: movimentacao['select-prateleira'],
                caixa: movimentacao['select-caixa'],
            }
            produtoEstoque.produto = movimentacao.produto

            const produtoAtualizado = await Produto.findOneAndUpdate({codigo: produtoEstoque.codigo}, produtoEstoque, {new:true, upsert: true})
            console.log(produtoAtualizado)
        } else if (movimentacao.tipo == 'saida') {
            produtoEstoque.quantidade =  quantidadeAntesMovimentacao - movimentacao.quantidade
            if (produtoEstoque.quantidade < 0) {
                throw new Error(`Erro na quantidade somente ${quantidadeAntesMovimentacao} em estoque`);
                 
            }
            const produtoAtualizado = await Produto.findOneAndUpdate({codigo: produtoEstoque.codigo}, produtoEstoque, {new:true, upsert: true})
            console.log(produtoAtualizado)
        }
        res.redirect(`/${movimentacao.tipo}.html?response="Estoque atualizado com sucesso. Código: ${movimentacao.codigo}"`)
    } catch (error) {
        console.log(error);
        res.redirect(`/${movimentacao.tipo}.html?response=${error.message}`)
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
router.post('/cadastro-armario', async (req, res) => {
    console.log(req.body)
    try {
        const cadastroArmario = req.body
        const novoArmario = await Armario.create(cadastroArmario)
        res.send(novoArmario)
    } catch (error) {
        console.log(error)
        res.send({message:error.message})

    }
})
router.get('/busca-armarios', async (req, res) => {
    const armarios = await Armario.find()
    res.send(armarios)
})
router.post('/cadastro-prateleira', async (req, res) => {
    try {
        console.log(req.body)
        const codigoArmario = req.body.codigoArmario
        const cadastroPrateleira = {nome: req.body.nome, codigo: req.body.codigo}
        const armario = await Armario.findOne({codigo:codigoArmario})
        for (let prateleira of armario.prateleiras) {
            if (prateleira.codigo == cadastroPrateleira.codigo) {
                throw new Error('codigo ja utilizado!')
            }
            if (prateleira.nome == cadastroPrateleira.nome) {
                throw new Error('nome ja utilizado!')
            }
        }
        const novoPrateleira = await Prateleira.create(cadastroPrateleira)
        armario.prateleiras.push(novoPrateleira)
        const atualizacao = await Armario.findOneAndUpdate({codigo:codigoArmario},armario,{new:true})
        res.send({atualizacao,novoPrateleira})
    } catch (error) {
        console.log(error)
        res.send({message:error.message})
    }
})
router.post('/cadastro-caixa', async (req, res) => {
    try {
        const { nome, codigo, codigoPrateleira, codigoArmario } = req.body
        const prateleira = await Prateleira.findOne({codigo:codigoPrateleira})
        for (let caixa of prateleira.caixas) {
            if (caixa.codigo == codigo) {
                throw new Error("Código Caixa já cadastrado!");
            }
            if (caixa.nome == nome) {
                throw new Error("Nome Caixa já cadastrado!");
            }
        }
        const novaCaixa = await Caixa.create({codigo, nome})
        prateleira.caixas.push(novaCaixa)
        await Prateleira.findOneAndUpdate({codigo:codigoPrateleira}, prateleira, {new:true})
        const armario = await Armario.findOne({codigo:codigoArmario})
        const novaListaPrateleiras = armario.prateleiras.filter((prat) => {
            return prat.codigo != prateleira.codigo
        })
        novaListaPrateleiras.push(prateleira)
        armario.prateleiras = novaListaPrateleiras
        const novoArmario = await Armario.findOneAndUpdate({codigo:codigoArmario},armario, {new:true})
        res.send(novoArmario)
    } catch (error) {
        console.log(error)
        res.send({message:error.message})

    }
})
router.get('/saida', async (req, res) => {
    const historicoSaida = await Saida.find()
    res.send(historicoSaida)
})
router.get('/consulta', async (req, res) => {
    const produto = await Produto.find()
    res.send(produto)
})
router.get('/consulta/armarios', async (req, res) => {
    const armarios = await Armario.find()
    res.send(armarios)
})
router.get('/consulta/armario/:codigoArmario', async (req, res) => {
    const { codigoArmario } = req.params
    const resultados = await Produto.find({ 'localizacao.armario': codigoArmario }).sort({valorUnitario:-1})
    console.log(resultados)
    res.send(resultados)
})
router.get('/pesquisa/:codigo', async (req, res) => {
    const { codigo } = req.params
    const produto = await Produto.findOne({codigo})
    if (produto != null) {
        res.send(produto)
    } else {
        res.send({message: 'Código não cadastrado, cadastre um novo produto com este código'})
    }
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
})



module.exports = (app) => {
    return app.use('/', router)
}
