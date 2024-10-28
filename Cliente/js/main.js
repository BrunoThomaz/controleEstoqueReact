var GLOBAL_ARMARIOS = {}
const modal = document.querySelector('.modal');

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
    const resultado = await fetch(`/pesquisa/${valorCodigo}`)
    .then((result) => result.json());

    return resultado;
}

const response =  new URLSearchParams(window.location.search).get('response');
if (response != undefined) {
    alert(response);
}

function gerarQRCode(item) {
    switch (item) {
        case 'armario':
            const codigoArmario = document.getElementById('codigo-armario').value
            open(`/gera/${codigoArmario}`,"_blank")
        break;

        case 'prateleira':
            const codigoPrateleira = document.getElementById('codigo-prateleira').value
            open(`/gera/${codigoPrateleira}`,"_blank")
        break;

        case 'caixa':
            const caixa = document.getElementById('codigo-caixa').value
            open(`/gera/${codigoCaixa}`,"_blank")
        break;
    }

}

async function buscaArmarios() {
    fetch('/busca-armarios')
    .then(res => res.json())
    .then(json => {
        if (json != null) {
            GLOBAL_ARMARIOS = json;
            const selectArmario = document.getElementById('select-armario')
            selectArmario.innerHTML = '<option value="">Selecione o Armário</option>'
            for (let armario of json) {
                selectArmario.innerHTML += `<option value="${armario.codigo}">${armario.nome}</option>`
                
            }
            const selectArmarioCaixa = document.getElementById('select-armario-caixa')
            selectArmarioCaixa.innerHTML = '<option value="">Selecione o Armário</option>'
            for (let armario of json) {
                selectArmarioCaixa.innerHTML += `<option value="${armario.codigo}">${armario.nome}</option>`
                
            }
        }
    })
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
buscaArmarios();