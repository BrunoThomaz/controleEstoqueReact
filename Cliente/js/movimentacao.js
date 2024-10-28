const codigo = document.getElementById('codigo');
codigo.addEventListener('change', mostraResultado);

async function mostraResultado() {
    const resultadoPesquisa = await pesquisaCodigo();
    if (resultadoPesquisa.message) {
        alert(resultadoPesquisa.message)
    } else {
        if (resultadoPesquisa.produto != undefined) {
            document.getElementById('produto').value = resultadoPesquisa.produto;
            document.getElementById('produto').disabled = "true";
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
            document.getElementById('localizacao').value = resultadoPesquisa.localizacao;
        document.getElementById('localizacao').disabled = "true";
        }
        
        
        
    }
}

