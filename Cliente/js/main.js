var GLOBAL_ARMARIOS = {}
const modal = document.querySelector('.modal');

const scanner = new Html5QrcodeScanner('reader',{
    qrbox: {
        width: 250,
        height: 250,
    },
    fps: 20,
});
function escanearQR() {
    modal.style.display = 'block';
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
    setTimeout(stopScanner,30000)
}

function stopScanner() {
    scanner.clear();
    modal.style.display = 'none';
    alert('Código não encontrado, digite ou tente novamente.');
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
        console.log(json);
        if (json != null) {
            GLOBAL_ARMARIOS = json;
            const selectArmario = document.getElementById('select-armario');
            if (selectArmario != null) {
                selectArmario.innerHTML = '<option value="">Selecione o Armário</option>';
                for (let armario of json) {
                    selectArmario.innerHTML += `<option value="${armario.codigo}">${armario.nome}</option>`
                    
                }
            }
            const selectArmarioCaixa = document.getElementById('select-armario-caixa')
            if (selectArmarioCaixa != null) {
                selectArmarioCaixa.innerHTML = '<option value="">Selecione o Armário</option>'
                for (let armario of json) {
                    selectArmarioCaixa.innerHTML += `<option value="${armario.codigo}">${armario.nome}</option>`
                    
                }
            }
        }
    })
}

function atualizaPrateleiras(event) {
    const codigoArmario = document.getElementById('select-armario-caixa').value;
    for (armario of GLOBAL_ARMARIOS) {
        if (codigoArmario == armario.codigo) {
            const selectPrateleira = document.getElementById('select-prateleira');
            selectPrateleira.innerHTML = '<option value="">Selecione a Prateleira</option>';
            for (let prateleira of armario.prateleiras) {
                selectPrateleira.innerHTML += `<option value="${prateleira.codigo}">${prateleira.nome}</option>`;
            }
        }
    }
}

function atualizaCaixas(event) {
    for (armario of GLOBAL_ARMARIOS) {
        const codigoArmario = document.getElementById('select-armario-caixa').value;
        const codigoPrateleira = document.getElementById('select-prateleira').value;
        for (armario of GLOBAL_ARMARIOS) {
            if (codigoArmario == armario.codigo) {
                for (prateleira of armario.prateleiras) {
                    if (codigoPrateleira == prateleira.codigo) {
                        const selectCaixa = document.getElementById('select-caixa')
                        selectCaixa.innerHTML = `<option value="">Selecione uma caixa</option>`
                        for (caixa of prateleira.caixas) {
                            selectCaixa.innerHTML += `<option value="${caixa.codigo}">${caixa.nome}</option>`
                        }
                    }
                }
            }
        }
    }
}

buscaArmarios();