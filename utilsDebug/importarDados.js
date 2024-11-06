const mongoose = require('../db')
const { Produto } = require('../models/produto')

var fs = require('fs');
var obj;
fs.readFile('dados.json', 'utf8', function (err, data) {
  if (err) throw err;
  obj = JSON.parse(data);
  criarDados()
});

async function criarDados () {
    for (let i = 90; i < 100; i++) {
      obj[i].descricao = obj[i].produto;
      obj[i].equipamento = 'Equipamento 2';
      obj[i].localizacao = {
        armario:'armario-1',
        prateleira:'prateleira-1',
        caixa:'caixa-2'
      }
      obj[i].valorMedio = `${Number(Math.random() * 100).toFixed(2)}`;
      obj[i].quantidade = `${Number(Math.random() * 10).toFixed(0) + 1}`;
      obj[i].tipo = 'entrada';
      obj[i].usuario = 'Chefe de Máquinas';
      objetoCriado = await Produto.create(obj[i]);
      console.log(objetoCriado);
    }
}
