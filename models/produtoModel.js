const mongoose = require("mongoose");


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

module.exports = mongoose.model("Produto", ProdutoSchema);
