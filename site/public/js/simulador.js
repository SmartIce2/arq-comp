
    var reset = calculadora.innerHTML;

    function calcular() {
        var tipo = tipo_sorvete.value;
        var producao = Number(und_produzidas.value);
        var desperdicio = Number(und_descartadas.value);
        var valor_fabricacao = Number(preco_fabrica.value);
        var valor_venda = Number(preco_venda.value);

        var perda_porcento = desperdicio * 100 / producao;
        var lucro_porcento = (valor_venda / valor_fabricacao) * 100 - 100;
        var gasto_producao = producao * valor_fabricacao;
        var lucro_sem_desperdicio = producao * valor_venda;
        var total_despercidio = producao - desperdicio;
        var lucro_com_desperdicio = lucro_sem_desperdicio - desperdicio * valor_venda;
        var deixa_ganhar_mes = lucro_sem_desperdicio - total_despercidio * valor_venda;
        var deixa_ganhar_ano = deixa_ganhar_mes * 12;
        calculadora.innerHTML =
        `<h2>Com base nos valores registrados:</h2> <br> <br>
        <spam>
        Valor da produção de sorvete de ${tipo}: <b style="color: green;"> ${gasto_producao.toLocaleString("pt-BR", { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' })} </b>.<br><br> 
        
        Sorvetes produzidos: <b style="color: green;"> ${producao} </b> <br><br>
        
        Descartes: <b style="color: red;">${desperdicio}</b><br><br>

        Receita sem desperdício: <b style="color: green;">${lucro_sem_desperdicio.toLocaleString("pt-BR", { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' })}.</b><br><br>

        Receita com desperdício: <b style="color: red;"> ${lucro_com_desperdicio.toLocaleString("pt-BR", { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' })}</b>.<br><br>
        
        Porcentagem de receita mensal reduzida: <b style="color: red;"> ${perda_porcento.toFixed(0)}%.</b><br><br>

        Perda MENSAL: <b style="color: red;"> ${deixa_ganhar_mes.toLocaleString("pt-BR", { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' })}.</b> <br><br>
        
        Total de perda ANUAL: <b style="color: red;">${(deixa_ganhar_ano).toLocaleString("pt-BR", { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' })}.</b><br><br>
      
        </spam>


        <div class="botao2">
                <button onclick="novoCalculo()">Novo Calculo</button>
            </div>
        </div>`
    }
    function novoCalculo() {
        calculadora.innerHTML = reset;
    }

    // CASO SENTIR SAUDADE DA RECEITA GERADA

    // Receita gerada: <b style="color: green;"> ${lucro_porcento.toFixed(0)}% </b> <br><br>
        