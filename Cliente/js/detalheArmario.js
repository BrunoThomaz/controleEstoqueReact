var SOBRESSALENTES = []
async function consultaArmario() {
    const urlParams = new URLSearchParams(window.location.search);
    const codigo = urlParams.get('codigo');
    SOBRESSALENTES = await fetch(`/consulta/armario/${codigo}`).then(res => res.json()).then(json => json);
    // Inicializar a tabela ao carregar a página
    inicializarTabela();
}
consultaArmario();
// Função para agrupar sobressalentes por prateleiras e caixas
function agruparSobressalentesPorLocalizacao(sobressalentes) {
    const agrupados = {};

    sobressalentes.forEach(item => {
        const { armario, prateleira, caixa } = item.localizacao;
        if (!agrupados[prateleira]) agrupados[prateleira] = {};
        if (!agrupados[prateleira][caixa]) agrupados[prateleira][caixa] = [];
        agrupados[prateleira][caixa].push(item);
    });

    return agrupados;
}

// Função para criar a tabela de sobressalentes
function criarTabelaSobressalentes(prateleira, caixa, itens) {
    const container = document.getElementById('table-container');

    const titulo = document.createElement('h2');
    titulo.textContent = `Prateleira: ${prateleira} - Caixa: ${caixa}`;
    container.appendChild(titulo);

    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    thead.innerHTML = `
        <tr>
            <th>Código</th>
            <th>Produto</th>
            <th>Quantidade</th>
            <th>Equipamento</th>
            <th>Valor Médio</th>
        </tr>
    `;

    itens.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.codigo}</td>
            <td>${item.produto}</td>
            <td>${item.quantidade}</td>
            <td>${item.equipamento}</td>
            <td>R$ ${item.valorMedio.toFixed(2)}</td>
        `;
        tbody.appendChild(row);
    });

    table.appendChild(thead);
    table.appendChild(tbody);
    container.appendChild(table);
}

// Função para inicializar a tabela com dados organizados
function inicializarTabela() {
    const agrupados = agruparSobressalentesPorLocalizacao(SOBRESSALENTES);
    for (const prateleira in agrupados) {
        for (const caixa in agrupados[prateleira]) {
            criarTabelaSobressalentes(prateleira, caixa, agrupados[prateleira][caixa]);
        }
    }
}
