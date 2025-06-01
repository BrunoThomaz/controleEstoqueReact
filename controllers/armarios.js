const express = require('express')
const router = express.Router()
const {Armario} = require('../models/armarioModel')

const QRCode = require('qrcode')
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



// GET - listar armários
router.get("/", async (req, res) => {
  const armarios = await Armario.find();
  res.json(armarios);
});

// GET - listar armário por Id
router.get("/:armarioId", async (req, res) => {
  const armario = await Armario.findById(req.params.armarioId);
  res.json(armario);
});

//GET - listar prateleira por Id
router.get("/:armarioId/prateleira/:prateleiraId", async (req, res) => {
  const { armarioId, prateleiraId } = req.params;
  console.log(req.params)
  const armario = await Armario.findById(armarioId);
  console.log(armario)
  const selecionaPrateleira = (prateleiraId) => {
    for (prat of armario.prateleiras) {
      if (prat._id == prateleiraId) return prat
    }
  }

  const prateleira = selecionaPrateleira(prateleiraId);

  if (!prateleira) res.status(400).json({msg: 'Prateleira não encontrada.'})
  res.json(prateleira)
})

//GET - listar caixa por Id
router.get("/:armarioId/prateleira/:prateleiraId/caixa/:caixaId", async (req, res) => {
  const { armarioId, prateleiraId, caixaId } = req.params;
  const armario = await Armario.findById(armarioId);
  const selecionaPrateleira = (prateleiraId) => {
    for (prat of armario.prateleiras) {
      if (prat._id == prateleiraId) return prat
    }
  }

  const selecionaCaixa = (caixaId) => {
    for (cx of prateleira.caixas) {
      if (cx._id == caixaId) return cx
    }
  }
  const prateleira = selecionaPrateleira(prateleiraId);
  const caixa = selecionaCaixa(caixaId);

  if (!caixa) res.status(400).json({msg: 'Caixa não encontrada.'})
  res.json(caixa)
})

//GET - listar produtos caixa
// router.get("/:armarioId/prateleira/:prateleiraId/caixa/:caixaId/produtos", async (req, res) => {
//   const { armarioId, prateleiraId, caixaId } = req.params;
//   const armario = await Armario.findById(armarioId);
//   const selecionaPrateleira = (prateleiraId) => {
//     for (prat of armario.prateleiras) {
//       if (prat._id == prateleiraId) return prat
//     }
//   }

//   const selecionaCaixa = (caixaId) => {
//     for (cx of prateleira.caixas) {
//       if (cx._id == caixaId) return cx
//     }
//   }
//   const prateleira = selecionaPrateleira(prateleiraId);
//   const caixa = selecionaCaixa(caixaId);

//   if (!caixa) res.status(400).json({msg: 'Caixa não encontrada.'})
//   res.json(caixa.produtos)
// })

// POST - adicionar armário
router.post("/", async (req, res) => {

  const novo = req.body;
  novoArmario = await Armario.create(novo);
  res.status(201).json(novoArmario);
});

// POST - adicionar prateleira a um armário
router.post("/:idArmario/prateleiras", async (req, res) => {
  const prateleira = await Prateleira.create({nome:req.body.nome});
  const armario = await Armario.findById(req.params.idArmario);
  armario.prateleiras.push(prateleira);
  await armario.save();
  await Prateleira.findByIdAndDelete(prateleira._id)
  res.json(armario);
});

// POST - adicionar caixa a uma prateleira
router.post("/:idArmario/prateleiras/:idPrateleira/caixas", async (req, res) => {
  const caixa = await Caixa.create(req.body)
  const armario = await Armario.findById(req.params.idArmario);
  const prateleira = armario.prateleiras.id(req.params.idPrateleira);
  prateleira.caixas.push({ nome: req.body.nome });
  await armario.save();
  await Caixa.findByIdAndDelete(caixa._id)
  res.json(armario);
});

// DELETE - remover armário
router.delete("/:id", async (req, res) => {
  await Armario.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

// DELETE - remover prateleira
router.delete("/:idArmario/prateleiras/:idPrateleira", async (req, res) => {
  const armarioId = req.params.idArmario;
  let armario = await Armario.findById(req.params.idArmario);
  novaLista = armario.prateleiras.filter((prateleira) => {
    return prateleira._id != req.params.idPrateleira
  })
  armario.prateleiras = novaLista;
  armarioNovo = await Armario.findOneAndUpdate({_id:armarioId},armario,{new:true})
  console.log(armarioNovo)
  res.sendStatus(204);
});

// DELETE - remover caixa
router.delete("/:idArmario/prateleiras/:idPrateleira/caixas/:idCaixa", async (req, res) => {
  const { idArmario, idPrateleira, idCaixa } = req.params;
  console.log(idArmario);
  const armario = await Armario.findById(idArmario);
  console.log(armario);
  try {
    for (prateleira of armario.prateleiras) {
      if (prateleira._id == idPrateleira) {
        prateleira.caixas = prateleira.caixas.filter((caixa) => {
          return caixa._id != idCaixa;
        })
      }
    }
    armarioNovo = await Armario.findOneAndUpdate({_id:idArmario},armario,{new:true})
    console.log(armarioNovo);
    res.sendStatus(204);
  } catch (error) {
    res.sendStatus(400)
  }
});


//PUT - editar nome armário
router.put("/edit/:armarioId", async (req, res) => {
  const { armarioId } = req.params;
  const { novoNome } = req.body;
  const armario = await Armario.findById(armarioId);
  armario.nome = novoNome;
  await armario.save();
  res.status(202).send(armario);
})



module.exports = (app) => {
    return app.use('/api/armarios', router)
}
