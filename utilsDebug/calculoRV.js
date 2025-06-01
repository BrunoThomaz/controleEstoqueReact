//Leitura JSON
const fs = require('fs');
let operacoesBrutas;
fs.readFile('dados.json', 'utf8', function (err, data) {
  if (err) throw err;
  obj = JSON.parse(data);
});


// Função auxiliar para converter valores monetários
function parseReal(valor) {
    return parseFloat(valor.replace(/[R$\s.]/g, '').replace(',', '.'));
}

const carteira = {};
const resultado = [];

for (const item of operacoesBrutas) {
    const ativo = item["Ativo"];
    const tipo = item["C/V"] === 'C' ? 'compra' : 'venda';
    const quantidade = parseInt(item["Quantidade"], 10);
    const precoUnitario = parseReal(item["Preço Executado"]);
    const data = item["Data de Execução"];

    // Inicializa a posição do ativo
    if (!carteira[ativo]) {
        carteira[ativo] = {
            quantidade: 0,
            custoTotal: 0
        };
    }

    const posicao = carteira[ativo];
    let precoMedio = posicao.quantidade > 0 ? posicao.custoTotal / posicao.quantidade : 0;
    let lucroPrejuizo = null;

    if (tipo === 'compra') {
        posicao.custoTotal += precoUnitario * quantidade;
        posicao.quantidade += quantidade;
        precoMedio = posicao.custoTotal / posicao.quantidade;
    } else {
        lucroPrejuizo = (precoUnitario - precoMedio) * quantidade;
        posicao.custoTotal -= precoMedio * quantidade;
        posicao.quantidade -= quantidade;
    }

    resultado.push({
        data,
        tipo,
        ativo,
        quantidade,
        precoUnitario: precoUnitario.toFixed(2),
        precoMedio: precoMedio.toFixed(2),
        lucroPrejuizo: lucroPrejuizo !== null ? lucroPrejuizo.toFixed(2) : '-'
    });
}

// console.table(resultado);

// -------------------
// Função para exportar para CSV
// -------------------
function exportarParaCSV(dados, nomeArquivo) {
    const cabecalho = Object.keys(dados[0]).join(',') + '\n';
    const linhas = dados.map(linha => Object.values(linha).join(',')).join('\n');
    const conteudoCSV = cabecalho + linhas;

    fs.writeFileSync(nomeArquivo, conteudoCSV, 'utf8');
    console.log(`Arquivo CSV exportado com sucesso para "${nomeArquivo}"`);
}

// Exporta o resultado
exportarParaCSV(resultado, 'resultado_operacoes.csv');