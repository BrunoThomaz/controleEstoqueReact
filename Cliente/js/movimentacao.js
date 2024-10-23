const codigo = document.getElementById('codigo');
codigo.addEventListener('change', mostraResultado);

async function mostraResultado() {
    const resultadoPesquisa = await pesquisaCodigo();
    console.log(resultadoPesquisa);
    document.getElementById('produto').value = resultadoPesquisa.produto;
    document.getElementById('equipamento').value = resultadoPesquisa.equipamento;
    document.getElementById('descricao').value = resultadoPesquisa.descricao;
    document.getElementById('localizacao').value = resultadoPesquisa.localizacao;
}

