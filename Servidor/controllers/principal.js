const express = require('express');
const router = express.Router();
const { Produto } = require('../models/produto')

router.get('/', (req, res) => {
    res.send('Tudo certim.')
})
router.post('/cadastro', async (req, res) => {
    console.log(req.body);
    await Produto.create(req.body);
    res.redirect('/pesquisa.html');
})

router.get('/consulta', async (req, res) => {
    const produto = await Produto.find()
    res.send(produto);
})

module.exports = (app) => {
    return app.use('/', router);
}
