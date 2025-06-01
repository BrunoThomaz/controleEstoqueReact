const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const {Armario} = require('../models/armarioModel');
const { json } = require('body-parser');

const upload = multer({ dest: 'uploads/' });

//POST - recebe arquivo .csv
router.post('/importar', upload.single('arquivo'), async (req, res) => {
  const filePath = path.join(__dirname, '..', req.file.path);
  const resultados = [];
  fs.createReadStream(filePath)
    .pipe(json())
    .on('data', (data) => resultados.push(data))
    .on('end', async () => {
      try {
        for (const row of resultados) {
          const { armario, prateleira, caixa, codigoProduto, codigoFluig, nomeProduto, quantidade } = row;

          // Criação ou busca hierárquica
          const arm = await Armario.findOneAndUpdate(
            { nome: armario },
            { $setOnInsert: { nome: armario, prateleiras: [] } },
            { upsert: true, new: true }
          );

          let prat = arm.prateleiras.find(p => p.nome === prateleira);
          if (!prat) {
            prat = { nome: prateleira, caixas: [] };
            arm.prateleiras.push(prat);
          }

          let cxa = prat.caixas.find(c => c.nome === caixa);
          if (!cxa) {
            cxa = { nome: caixa, produtos: [] };
            prat.caixas.push(cxa);
          }

          cxa.produtos.push({
            codigoProduto,
            codigoFluig,
            nome: nomeProduto,
            quantidade: parseInt(quantidade)
          });

          await arm.save();
        }

        fs.unlinkSync(filePath); // remover arquivo temporário
        res.json({ sucesso: true, mensagem: 'Importação concluída!' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ sucesso: false, mensagem: 'Erro ao importar dados.' });
      }
    });
});

  
module.exports = (app) => {
  return app.use('/api/importacao', router)
}
