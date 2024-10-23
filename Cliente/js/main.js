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
    return await fetch(`/pesquisa/${valorCodigo}`)
    .then((result) => result.json());
}

const response =  new URLSearchParams(window.location.search).get('response');
if (response != undefined) {
    alert(response);
}