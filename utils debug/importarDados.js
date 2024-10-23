const mongoose = require('../Servidor/db')
const { Produto } = require('../Servidor/models/produto')

var fs = require('fs');
var obj;
fs.readFile('dados.json', 'utf8', function (err, data) {
  if (err) throw err;
  obj = JSON.parse(data);
  criarDados()
});

async function criarDados () {
    obj.forEach(async (o)=> {
        const produto = await Produto.create(o);
        console.log(produto);
    })
}
