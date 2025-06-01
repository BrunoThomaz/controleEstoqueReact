const mongoose = require("mongoose");

const movimentacaoSchema = new mongoose.Schema({
  tipo: {
    type: String,
    enum: ["entrada", "saida"],
    required: true,
  },
  local: {
    armario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Armario",
      required: true,
    },
    prateleira: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Prateleira",
      required: true,
    },
    caixa: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Caixa",
      required: true,
    },
  },
  codigoProduto: {
    type: String,
    required: true,
    trim: true,
  },
  quantidade: {
    type: Number,
    required: true,
    min: 1,
  },
  temCodigoFluig: {
    type: Boolean,
    default: false,
  },
  codigoFluig: {
    type: String,
    trim: true,
    default: null,
  },
  criadoEm: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Movimentacao", movimentacaoSchema);