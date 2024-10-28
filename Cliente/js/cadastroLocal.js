async function salvarArmario(event) {
    event.preventDefault()
    const nomeArmario = document.getElementById('armario').value;
    const codigo = document.getElementById('codigo-armario').value;
    const data = {nome:nomeArmario,codigo}
    const response = await fetch('/cadastro-armario', {
        method: "POST",
        body: JSON.stringify(data),
        headers: {"Content-type": "application/json; charset=UTF-8"}
      })
    .then((res)=>res.json())
    console.log(response);
    buscaArmarios();
}

async function salvarPrateleira(event) {
    event.preventDefault()
    const codigoArmario = document.getElementById('select-armario').value;
    const nomePrateleira = document.getElementById('prateleira').value;
    const codigo = document.getElementById('codigo-prateleira').value;
    const data = {
        nome:nomePrateleira,
        codigoArmario,
        codigo
    };
    const response = await fetch('/cadastro-prateleira', {
        method: "POST",
        body: JSON.stringify(data),
        headers: {"Content-type": "application/json; charset=UTF-8"}
      })
    .then((res)=>res.json())
    .catch(error => console.log(error))
    console.log(response);
    buscaArmarios();
}

function atualizaPrateleiras(event) {
    for (armario of GLOBAL_ARMARIOS) {
        if (event.target.value == armario.codigo) {
            const selectArmarioCaixa = document.getElementById('select-prateleira');
            selectArmarioCaixa.innerHTML = '<option value="">Selecione a Prateleira</option>';
            for (let prateleira of armario.prateleiras) {
                selectArmarioCaixa.innerHTML += `<option value="${prateleira.codigo}">${prateleira.nome}</option>`;
                
            }
        }
    }
}

async function salvarCaixa(event) {
    event.preventDefault()
    const codigoArmario = document.getElementById('select-armario-caixa').value;
    const codigoPrateleira = document.getElementById('select-prateleira').value;
    const codigo = document.getElementById('codigo-caixa').value;
    const nomeCaixa = document.getElementById('caixa').value;
    const data = {
        nome:nomeCaixa,
        codigoPrateleira,
        codigoArmario,
        codigo
    };
    const response = await fetch('/cadastro-caixa', {
        method: "POST",
        body: JSON.stringify(data),
        headers: {"Content-type": "application/json; charset=UTF-8"}
      })
    .then((res)=>res.json())
    .catch(error => console.log(error))
    console.log(response);
    buscaArmarios();
}