const fs = require("fs");
const Produto = require("../models/produtoModel");
const db = require("../db");

// let start = 10.000001;
// let end = 10.999999;
// const step = 0.000001;
// const arr = [];

// for (let i = start; i<= end; i+= step) {
//     arr.push(parseFloat(i.toFixed(6)));
// }

// const content = JSON.stringify(arr);

// fs.writeFile('codigosFluig.json', content, 'utf8', (err) => {
//        if (err) {
//            console.error('Error writing file:', err);
//            return;
//        }
//        console.log('File written successfully!');
//    });

let listaResultados = [];


fs.readFile('codigosFluig.json', 'utf8', async function (err, data) {
    if (err) throw err;
    let codigosFluig;
    codigosFluig = await JSON.parse(data);
    for (let i = 600000; codigosFluig.length; i++) {
        codigosFluig[i] = codigosFluig[i].toFixed(6);
        await fetch("https://fluig.bramoffshore.com.br/api/public/ecm/dataset/datasets/", {
        "headers": {
            "accept": "application/json, text/javascript, */*; q=0.01",
            "accept-language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
            "cache-control": "no-cache",
            "content-type": "application/json; charset=UTF-8",
            "pragma": "no-cache",
            "sec-ch-ua": "\"Google Chrome\";v=\"137\", \"Chromium\";v=\"137\", \"Not/A)Brand\";v=\"24\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-requested-with": "XMLHttpRequest",
            "cookie": 'FLUIGCOOKIE=(null).fluig1; SERVERID=sticky.fluig1; JSESSIONID="R7DWaOYqRQvfQSzh7SsPzod5VVHwl_zEDwS9b9XL.master:fluig1"; JSESSIONIDSSO=abYJrKt-zdA6814bnEVqdv4kdZx0SzU8zkxmZIi7; jwt.token=eyJraWQiOiI4YjkyY2RlZC03MzcxLTQwMTgtOTMxNy1jZDYwYjRjMWViMjAiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJtdi5kZWJvcmFoLmtheSIsInJvbGUiOiJ1c2VyIiwidGVuYW50IjoxLCJ1c2VyVGVuYW50SWQiOjEyOSwic2l0ZUNvZGUiOiJGbHVpZyIsInNpdGVJZCI6MSwidXNlclR5cGUiOjAsInVzZXJVVUlEIjoiYTMzODZhMmEtZjQzNi00YzYzLWI5ODktYTNlZTIxNmRmYWUzIiwidGVuYW50VVVJRCI6IjhiOTJjZGVkLTczNzEtNDAxOC05MzE3LWNkNjBiNGMxZWIyMCIsImxhc3RVcGRhdGVEYXRlIjoxNzQwNTkxMTM2NzkyLCJ1c2VyVGltZVpvbmUiOiJBbWVyaWNhL1Nhb19QYXVsbyIsImV4cCI6MTc0ODc0NzE5NywiaWF0IjoxNzQ4NzQ1OTk3LCJhdWQiOiJmbHVpZ19hdXRoZW50aWNhdG9yX3Jlc291cmNlIn0.fc-dRRrpcOTeRuU7WCHnP61ZhtEVTJFBVNZ9WpoPDmFKfp76ot2sZaMPKSURdo6TpMTdTus80Lo_IcaK67E5CxZTc4ALt_9XMa6xeNdUyd9E0k9auAL5boU0h_Vaur6MXUUwnPuUe8e1rkkTlaZNJn3ZZlWnNNq6Rk31b_k4AxNV4hGvRvz8eZjUk0EgH54A_RD155DWXIPgeGnf1x3XVbzRjfLJiQG15Jtsk1rwHX1xkEePRgeuMPlv5jQNtDzI3S48CyAYC4PqIRuqlWeogv2LchNmDHWS0A-v5WwO8vhIGNTD4_d0RoOHkQWzICBQ6P0HkWpMjMEJ4YNYmEb7Jw',
            "Referer": "https://fluig.bramoffshore.com.br/portal/p/001/consultaProduto",
            "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        "body": `{\"name\":\"DS_PRODUTO_CORPORE\",\"fields\":null,\"constraints\":[{\"_field\":\"produto\",\"_initialValue\":\"${codigosFluig[i]}\",\"_finalValue\":\"10.000001\",\"_type\":1},{\"_field\":\"codcoligada\",\"_initialValue\":\"4\",\"_finalValue\":\"4\",\"_type\":1}],\"order\":null}`,
        "method": "POST"
        })
        .then((res) => res.json())
        .then(async (json) => {
            console.log(codigosFluig[i]);
            if (!json.content.values[0]) return
            console.log('Adicionando...')
            listaResultados[0] = json.content.values[0];
            listaResultados = listaResultados.filter(res => {
                return res != undefined
            });
            listaResultados = listaResultados.filter(res => {
                if (res.OBSENGENHARIA != null) {
                    return res.OBSENGENHARIA.indexOf("BLOQUEADO") == -1
                }
                if (res.OBSCOMPRAS != null) {
                    return res.OBSCOMPRAS.indexOf("BLOQUEADO") == -1
                }
            })
            if (listaResultados.length > 0) {
                await Produto.findOneAndUpdate({CODIGOAUXILIAR:`${codigosFluig[i]}`}, listaResultados[0], {
                new: true,
                upsert: true // Make this update into an upsert
                });
            }
        })
    }
});





