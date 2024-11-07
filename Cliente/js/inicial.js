var DADOS_ARMARIO = []
async function consultaArmarios() {
    const armarios = await fetch('/consulta/armarios').then(res => res.json()).then(json => json)
    for (let armario of armarios) {
        atualizaListaArmarios(armario);
    }
}
consultaArmarios();

async function atualizaListaArmarios(armario) {
    const codigoArmario = armario.codigo
    const produtosArmario = await fetch(`/consulta/armario/${codigoArmario}`).then(res => res.json()).then(json => json)
    let valorTotalArmario = 0;
    let produtoMaiorValor = {
        valorMedio: 0
    }
    let valorTotalEquipamento = {}
    for (produto of produtosArmario) {
        valorTotalArmario += (produto.quantidade * produto.valorMedio)

        if (produto.valorMedio > produtoMaiorValor.valorMedio) {
            produtoMaiorValor = produto;
        }

        if (!valorTotalEquipamento[produto.equipamento]) {

            valorTotalEquipamento[produto.equipamento] = {
                equipamento: produto.equipamento,
                valor: (produto.quantidade * produto.valorMedio)
            }
        } else {
            valorTotalEquipamento[produto.equipamento].valor += produto.quantidade * produto.valorMedio
        }

    }

    const dadosArmario = {
        nome: armario.nome,
        id: codigoArmario,
        totalValor: valorTotalArmario.toFixed(2),
        maiorSobressalente: {
        nome: produtoMaiorValor.descricao,
        valor: produtoMaiorValor.valorMedio
        },
        totalPorEquipamento: {}
    } 

    const equipamentos = Object.keys(valorTotalEquipamento);
    for (let equipamento of equipamentos) {
        dadosArmario.totalPorEquipamento[equipamento] = valorTotalEquipamento[equipamento].valor.toFixed(2);
    }
    DADOS_ARMARIO.push(dadosArmario);
    criarCardArmario(dadosArmario);
}

function criarCardArmario(armario) {
    const armarioCard = document.createElement('div');
    armarioCard.className = 'armario-card';

    armarioCard.innerHTML = `
        <h3>${armario.nome}</h3></br>
        <p><strong>Total:</strong> R$ ${armario.totalValor}</p></br>    
        <p><strong>Sobressalente maior valor:</strong> ${armario.maiorSobressalente.nome} (R$ ${armario.maiorSobressalente.valor.toFixed(2)})</p></br>
        <div class="chart-container">
            <canvas id="chart-${armario.id}"></canvas>
        </div>
    `;
    armarioCard.addEventListener('click', ()=> {
        window.location=`/detalhe-armario.html?codigo=${armario.id}`;
    })
    document.getElementById('armario-container').appendChild(armarioCard);

    criarGrafico(armario);
}

function criarGrafico(armario) {
    const ctx = document.getElementById(`chart-${armario.id}`).getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: Object.keys(armario.totalPorEquipamento),
            datasets: [{
                label: 'Valor por Equipamento',
                data: Object.values(armario.totalPorEquipamento),
                backgroundColor: ['#007bff', '#6c757d', '#adb5bd'],
                hoverOffset: 4
            }]
        },
        options: {
            plugins: {
                legend: {
                    position: 'bottom',
                }
            },
            responsive: true,
            maintainAspectRatio: false
        }
    });
}