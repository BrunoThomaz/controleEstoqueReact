const modal = document.querySelector('.modal');

const codigo = document.getElementById('codigo');
codigo.addEventListener('change', atualizaCampos);

function escanearQR() {
    console.log('escanearQR');
    modal.style.display = 'block';
    const scanner = new Html5QrcodeScanner('reader',{
        qrbox: {
            width: 250,
            height: 250,
        },
        fps: 20,
    });
    scanner.render(
        (result)=>{
            codigo.value = result;
            codigo.dispatchEvent(new Event('change'));
            scanner.clear();
            modal.style.display = 'none';
        }, 
        
        (error)=>{
            console.log(error);
        })
}

async function pesquisaCodigo() {
    valorCodigo = codigo.value;
    const resultadoPesquisa = await fetch(`/pesquisa/${valorCodigo}`)
    .then((result) => result.json());
    return resultadoPesquisa;
}

async function atualizaCampos() {
    const resultadoPesquisa = await pesquisaCodigo();
    console.log(resultadoPesquisa);
    document.getElementById('produto').value = resultadoPesquisa.produto;
    document.getElementById('quantidade').value = resultadoPesquisa.quantidade;
    document.getElementById('equipamento').value = resultadoPesquisa.equipamento;
    document.getElementById('valorUnitario').value = resultadoPesquisa.valorUnitario;
    document.getElementById('descricao').value = resultadoPesquisa.descricao;
    document.getElementById('localizacao').value = resultadoPesquisa.localizacao;
    document.getElementById('estoqueMinimo').value = resultadoPesquisa.estoqueMinimo;

}


const response =  new URLSearchParams(window.location.search).get('response');
        if (response != undefined) {
            alert(response);
        }