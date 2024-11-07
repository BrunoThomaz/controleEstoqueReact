const codigo = document.getElementById('codigo');
codigo.addEventListener('change', mostraResultado);

async function mostraResultado() {
    const resultadoPesquisa = await pesquisaCodigo();
    console.log(resultadoPesquisa);
    if (resultadoPesquisa.message) {
        alert(resultadoPesquisa.message)
    } else {
        if (resultadoPesquisa.produto != undefined) {
            document.getElementById('produto').value = resultadoPesquisa.produto;
        }
        if (resultadoPesquisa.equipamento != undefined) {
            document.getElementById('equipamento').value = resultadoPesquisa.equipamento;
            document.getElementById('equipamento').disabled = "true";
        }
        if (resultadoPesquisa.descricao != undefined) {
            document.getElementById('descricao').value = resultadoPesquisa.descricao;
            document.getElementById('descricao').disabled = "true";
        }
        if (resultadoPesquisa.localizacao != undefined) {
            document.getElementById('select-armario-caixa').innerHTML = `<option value="${resultadoPesquisa.localizacao.armario}">${resultadoPesquisa.localizacao.armario}</option>`;
            document.getElementById('select-armario-caixa').disabled = "true";
            document.getElementById('select-prateleira').innerHTML = `<option value="${resultadoPesquisa.localizacao.prateleira}">${resultadoPesquisa.localizacao.prateleira}</option>`;
            document.getElementById('select-prateleira').disabled = "true";
            document.getElementById('select-caixa').innerHTML = `<option value="${resultadoPesquisa.localizacao.caixa}">${resultadoPesquisa.localizacao.caixa}</option>`;
            document.getElementById('select-caixa').disabled = "true";
        }
        
        
    }
}

