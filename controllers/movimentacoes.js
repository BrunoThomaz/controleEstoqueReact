const express = require('express')
const router = express.Router()
const Movimentacao = require('../models/movimentacaoModel')

// GET - listar Mmovimentacoes
router.get("/", async (req, res) => {
  const armarios = await Movimentacao.find();
  res.json(armarios);
});

const {Armario, Produto} = require("../models/armarioModel");

// POST - adicionar movimentacao
router.post("/", async (req, res) => {
  try {
    const { tipo, local, codigoProduto, quantidade, temCodigoFluig, codigoFluig } = req.body;
    const selecionaPrateleira = (prateleiraId) => {
      for (prat of armario.prateleiras) {
        if (prat._id == prateleiraId) return prat;
      }
    };
    
    const selecionaCaixa = (caixaId) => {
      for (cx of prateleira.caixas) {
        if (cx._id == caixaId) return cx;
      }
    };
    
    
    const armario = await Armario.findById(local.armario);
    const prateleira = selecionaPrateleira(local.prateleira);
    const caixa = selecionaCaixa(local.caixa);
    
    if (!caixa) return res.status(404).json({ error: "Caixa não encontrada" });
    
    //Adiciona ou atualiza produto na caixa
    if (tipo =="entrada") {
      const novoProduto =await Produto.create({
        codigoProduto,
        caixa: local.caixa,
        quantidade,
        codigoFluig,
        temCodigoFluig
      })
      caixa.produtos.push(novoProduto);
      await Produto.findByIdAndDelete(novoProduto._id);
    } else {
      for (produto of caixa.produtos) {
        if (produto.codigoProduto == codigoProduto) {
          produto.quantidade += -quantidade;
        }
      }
    }

    console.log(caixa);

    // Atualiza quantidade na caixa
    caixa.quantidade += tipo === "entrada" ? quantidade : -quantidade;
    if (caixa.quantidade < 0) caixa.quantidade = 0;
    caixa.cheio = caixa.quantidade > 0;
    
    //Atualiza caixa na prateleira
    for (cx of prateleira.caixas) {
      if (cx._id == local.caixa) {
        cx = caixa;
      };
    }

    // Atualiza quantidade na prateleira
    prateleira.quantidade += tipo === "entrada" ? quantidade : -quantidade;
    


    //Atualiza prateleira no armário
    for (prat of armario.prateleiras) {
        if (prat._id == local.prateleira) {
          prat = prateleira;
        };
      }
    // Atualiza quantidade no armário
    armario.quantidade += tipo === "entrada" ? quantidade : -quantidade;

    await armario.save();
    
    const mov = await Movimentacao.create({
      tipo, local, codigoProduto, quantidade, temCodigoFluig, codigoFluig
    });

    res.status(201).json(mov);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao registrar movimentação" });
  }
});


//GET - Resumo
router.get("/resumo", async (req, res) => {
  try {
    const entradas = await Movimentacao.aggregate([
      { $match: { tipo: "entrada" } },
      { $group: { _id: "$codigoProduto", total: { $sum: "$quantidade" } } }
    ]);

    const saidas = await Movimentacao.aggregate([
      { $match: { tipo: "saida" } },
      { $group: { _id: "$codigoProduto", total: { $sum: "$quantidade" } } }
    ]);

    const totalEntradas = entradas.reduce((acc, cur) => acc + cur.total, 0);
    const totalSaidas = saidas.reduce((acc, cur) => acc + cur.total, 0);

    res.json({ totalEntradas, totalSaidas, entradas, saidas });
  } catch (err) {
    res.status(500).json({ error: "Erro ao gerar resumo" });
  }
});


module.exports = (app) => {
    return app.use('/api/movimentacoes', router)
}
