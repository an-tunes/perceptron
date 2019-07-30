//---------------------------------------------------------------------------------------------------
// Implementação de um perceptron em JavaScript.
// Algorítmo baseado no livro: Redes Neurais Artificiais para Engenharias e Ciências Aplicadas.
// Programador: Lucas Antunes - lucas.antunes91@gmail.com

//------------------------------------
// Variáveis.
var taxaDeAprendizagem = 0.02;
var resultado_treino = [1, -1, -1, 1];
var amostras_treino = [
    [-1, -1, -1, -1],
    [0.1, 0.3, 0.6, 0.5],
    [0.4, 0.7, 0.9, 0.7],
    [0.7, 0.2, 0.8, 0.1]
];

//---------------------------------------------------------------------------------------------------
//Função inicial
iniciaPesos(function (pesos) {
    treinaPerceptron(pesos);
});

//---------------------------------------------------------------------------------------------------
// Inicia pesos do perceptron com valores aleatórios.
function iniciaPesos(callback) {
    let pesos = [];
    for (let i = 0; i < 4; i++) {
        pesos.push(Math.random());
    }
    callback(pesos);
}

//---------------------------------------------------------------------------------------------------
// Função de ajuste dos pesos do perceptron.
async function treinaPerceptron(pesos) {

    let epoca = 0;
    let erro = true;

    try {

        while (erro) {

            erro = false;
            console.log("\nÉpoca de treinamento: " + epoca++);
            console.log("Obtido\t>\tEsperado");

            for (let i = 0; i < 4; i++) {

                var response = await perceptron(transpose(amostras_treino)[i], pesos)
                console.log(resultado_treino[i] + '\t>\t' + response);

                if (response == resultado_treino[i])
                    continue;

                erro = true;
                let desvio = resultado_treino[i] - response;

                for (j in transpose(amostras_treino)[i]) {
                    pesos[j] += (desvio * taxaDeAprendizagem * transpose(amostras_treino)[i][j]);
                }

            }

        }

        console.log("Pesos: " + pesos);

    } catch (err) {
        console.log(err);
    }
}

//---------------------------------------------------------------------------------------------------
// Executa calculos do perceptron.
function perceptron(entradas, pesos) {

    return new Promise((resolve, reject) => {

        if (entradas.length != pesos.length) {
            reject("Tamanho dos arrays de pesos e entradas diferentes");
        }

        let u = 0;
        for (let i in entradas) {
            u += entradas[i] * pesos[i];
        }

        resolve(((u > 0) ? (1) : (-1)));
    });
}

//---------------------------------------------------------------------------------------------------
// Retorna a matriz transposta.
function transpose(a) {
    return a[0].map(function (_, c) { return a.map(function (r) { return r[c]; }); });
}
