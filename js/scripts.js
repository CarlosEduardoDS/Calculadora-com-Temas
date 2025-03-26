const iconeTema = $("#iconeTema");
const btnNumero = $(".btn-numero");
const btnLimpar = $("#btnLimpar");
const btnApagar = $("#btnApagar");
const displayCalc = $("#displayCalc");
const btnPonto = $("#btnPonto");
const btnAdicao = $("#btnAdicao");
const btnSubtracao = $("#btnSubtracao");
const btnMultiplicacao = $("#btnMultiplicacao");
const btnDivisao = $("#btnDivisao");
const btnIgual = $("#btnIgual");
const body = $("body")

$(document).ready(function () {
    let state = 1;
    

    let estaAnimando = false;
    $("#btnTema").on("click",  () => {

        if (estaAnimando) return;
        estaAnimando = true;

        state = (state % 3) + 1;

        body.append(
            `<div id="telaLoading">
                <div class="loading-top loading-partes"></div>
                <div class="loading-middle loading-partes"></div>
                <div class="loading-bottom loading-partes"></div>      
            </div>`
        );

        setTimeout(() => {
           $("#telaLoading").remove();
           estaAnimando = false;
        }, 1400);
        
        setTimeout(() => {
            body.removeClass("tema1 tema2 tema3").addClass(`tema${state}`);
            iconeTema.removeClass("fas fa-meteor fa-fire fa-cube");
            if (state == 1) {
                iconeTema.addClass("fas fa-cube");
            } else if (state == 2) {
                iconeTema.addClass("fas fa-meteor");
            } else {
                iconeTema.addClass("fas fa-fire");
            }
            
        }, 600);    
    });

    function limparErro() {
        if (displayCalc.text() === "Erro") {
            displayCalc.text("");
        }
    }

    btnNumero.on("click", function () {
        limparErro();
        let numero = $(this).text();
        let valor = displayCalc.text();

        if (valor === "" && (numero === "." || isNaN(numero))) return;
        let display = displayCalc.text();

        let partes = display.split(/[\+\-\x\/]/);
        let ultimoNumero = partes[partes.length - 1];

        if (ultimoNumero.includes(".") && numero === ".") return;

        if (ultimoNumero === "" && numero === ".") return;

        displayCalc.text(valor + numero);

        if (displayCalc.text().length > 26) {
            displayCalc.text(displayCalc.text().slice(0, 26));
        }
    });


    $(document).keydown(function (event) {
        let tecla = event.key;

        if (event.ctrlKey || event.altKey || event.shiftKey) return;

        if (tecla >= "0" && tecla <= "9") {
            $(`.btn-numero:contains(${tecla})`).click();
        }

        if (tecla === ".") {
            let display = displayCalc.text();
            let partes = display.split(/[\+\-\x\/]/);
            let ultimoNumero = partes[partes.length - 1];

            if (!ultimoNumero.includes(".")) {
                btnPonto.click();
            }
        }

        if (tecla === "+") {
            btnAdicao.click();
        } else if (tecla === "-") {
            btnSubtracao.click();
        } else if (tecla === "*") {
            btnMultiplicacao.click();
        } else if (tecla === "/") {
            btnDivisao.click();
        }

        if (tecla === "Enter") {
            btnIgual.click();
        }

        if (tecla === "Delete") {
            btnLimpar.click();
        }

        if (tecla === "Backspace") {
            btnApagar.click();
        }
    });

    btnAdicao.on("click", function () { limparErro(); adicionarOperador("+"); });
    btnSubtracao.on("click", function () { limparErro(); adicionarOperador("-"); });
    btnMultiplicacao.on("click", function () { limparErro(); adicionarOperador("x"); });
    btnDivisao.on("click", function () { limparErro(); adicionarOperador("/"); });

    function adicionarOperador(operador) {
        let display = displayCalc.text();

        if (display === "" || /[+\-x/]$/.test(display)) return;

        displayCalc.text(display + operador);
    }

    btnLimpar.on("click", function () {
        displayCalc.text("");
    });

    btnApagar.on("click", function () {
        limparErro();
        displayCalc.text(displayCalc.text().slice(0, -1));
    });

    btnIgual.on("click", function () {
        let expressao = displayCalc.text();
        expressao = expressao.replace(/x/g, "*");
    
        try {
            let resultado = eval(expressao);
    
            if (!isNaN(resultado) && isFinite(resultado)) {
                displayCalc.text(Number(resultado.toFixed(10))); // Corrige a precisão
            } else {
                displayCalc.text("Erro");
            }
        } catch (e) {
            displayCalc.text("Erro");
        }
    });
});
