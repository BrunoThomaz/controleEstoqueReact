const codigo = document.getElementById('codigo');
codigo.addEventListener('change', atualizaCampos);

async function pesquisaCodigo() {
    valorCodigo = codigo.value;
    return await fetch(`/pesquisa/${valorCodigo}`)
    .then((result) => result.json());
}

async function atualizaCampos() {
    const resultadoPesquisa = await pesquisaCodigo();
    console.log(resultadoPesquisa);
    document.getElementById('produto').value = resultadoPesquisa.produto;
    document.getElementById('quantidade').value = resultadoPesquisa.quantidade;
    document.getElementById('equipamento').value = resultadoPesquisa.equipamento;
    document.getElementById('valorMedio').value = resultadoPesquisa.valorMedio;
    document.getElementById('descricao').value = resultadoPesquisa.descricao;
    document.getElementById('localizacao').value = resultadoPesquisa.localizacao;
    document.getElementById('estoqueMinimo').value = resultadoPesquisa.estoqueMinimo;

}
