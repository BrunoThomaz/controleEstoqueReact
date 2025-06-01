import "../db.js"
import Produto from "../models/produtoModel.js"


const pipeline = [
      {
        $group: {
          _id: { CODIGOAUXILIAR: "$CODIGOAUXILIAR" }, // Agrupa por "nome"
          idsUnicos: { $addToSet: "$_id" }, // Armazena os IDs únicos em cada grupo
          total: { $sum: 1 } // Conta o número de documentos em cada grupo
        }
      },
      {
        $match: { total: { $gt: 1 } } // Filtra para grupos com mais de um documento
      }
    ];

    const duplicatas = await Produto.aggregate(pipeline).toArray();