const mongoose = require("mongoose");

// const ProdutoSchema = new mongoose.Schema({
//   codigoProduto: String,
//   caixa: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Caixa",
//   },
//   quantidade: {
//     type: Number,
//     default: 1,
//   },
//   codigoFluig: String,
//   temCodigoFluig: Boolean,
// });

const ProdutoSchema = new mongoose.Schema({
  BLOQUEADO:String,
  CODIGOAUXILIAR:String,
  CODIGOPRD:String,
  CODUNDCOMPRA:String,
  CODUNDCONTROLE:String,
  CUSTOMEDIO:String,
  DESCRICAO:String,
  DESCRICAOAUX:String,
  ID:String,
  INATIVO:String,
  NOMEFANTASIA:String,
  NOMEINGLES:String,
  NUMEROCCF:String,
  OBSCOMPRAS:String,
  OBSENGENHARIA:String,
  PESOBRUTO:String,
  PESOLIQUIDO:String,
  TOLERANCIAINF:String,
  TOLERANCIASUP:String
});

const CaixaSchema = new mongoose.Schema({
  nome: String,
  prateleira: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Prateleira",
  },
  quantidade: {
    type: Number,
    default: 0,
  },
  cheio: {
    type: Boolean,
    default: false,
  },
  produtos:[ProdutoSchema]
});


const PrateleiraSchema = new mongoose.Schema({
  nome: String,
  armario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Armario",
  },
  caixas: {
    type: [CaixaSchema]
  },
  quantidade: {
    type: Number,
    default: 0,
  },
  cheio: {
    type: Boolean,
    default: false,
  }
});


const ArmarioSchema = new mongoose.Schema({
  nome: String,
  prateleiras: [PrateleiraSchema],
  quantidade: {
    type: Number,
    default: 0
  },
  cheio: {
    type: Boolean,
    default: false
  }
});

Armario = mongoose.model("Armario", ArmarioSchema);
Prateleira = mongoose.model("Prateleira", PrateleiraSchema);
Caixa = mongoose.model("Caixa", CaixaSchema);
Produto = mongoose.model("Produto", ProdutoSchema);

module.exports = {
  Armario,
  Prateleira,
  Caixa,
  Produto
}