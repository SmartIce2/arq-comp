// não altere!
const serialport = require('serialport');
const express = require('express');
const mysql = require('mysql2');
const sql = require('mssql');

// não altere!
const SERIAL_BAUD_RATE = 9600;
const SERVIDOR_PORTA = 3300;

// configure a linha abaixo caso queira que os dados capturados sejam inseridos no banco de dados.
// false -> nao insere
// true -> insere
const HABILITAR_OPERACAO_INSERIR = true;

// altere o valor da variável AMBIENTE para o valor desejado:
// API conectada ao banco de dados remoto, SQL Server -> 'producao'
// API conectada ao banco de dados local, MySQL Workbench - 'desenvolvimento'
const AMBIENTE = 'desenvolvimento';

const serial = async (
    valorSteeping,
    valorMalting1,
    valorMalting2,
    valorMalting3,
    valorMilling,
    valorMashing1,
    valorMashing2,
    valorMashing3,
    valorBrewing,
    valorCooling1,
    valorCooling2,
    valorCooling3,
    valorMaturation,
    valorPackaging,
    valorProduct
) => {
    let poolBancoDados = ''

    if (AMBIENTE == 'desenvolvimento') {
        poolBancoDados = mysql.createPool(
            {
                // altere!
                // CREDENCIAIS DO BANCO LOCAL - MYSQL WORKBENCH
                host: 'localhost',
                user: 'insertCerveja',
                password: 'sptech',
                database: 'ProjetoCerveja'
            }
        ).promise();
    } else if (AMBIENTE == 'producao') {
        console.log('Projeto rodando inserindo dados em nuvem. Configure as credenciais abaixo.');
    } else {
        throw new Error('Ambiente não configurado. Verifique o arquivo "main.js" e tente novamente.');
    }


    const portas = await serialport.SerialPort.list();
    const portaArduino = portas.find((porta) => porta.vendorId == 2341 && porta.productId == 43);
    if (!portaArduino) {
        throw new Error('O arduino não foi encontrado em nenhuma porta serial');
    }
    const arduino = new serialport.SerialPort(
        {
            path: portaArduino.path,
            baudRate: SERIAL_BAUD_RATE
        }
    );
    arduino.on('open', () => {
        console.log(`A leitura do arduino foi iniciada na porta ${portaArduino.path} utilizando Baud Rate de ${SERIAL_BAUD_RATE}`);
    });
    arduino.pipe(new serialport.ReadlineParser({ delimiter: '\r\n' })).on('data', async (data) => {
        //console.log(data);
        const valores = data.split(';');
        const valorSteeping = parseFloat(valores[0]);
        const valorMalting1 = parseFloat(valores[1]);
        const valorMalting2 = parseFloat(valores[2]);
        const valorMalting3 = parseFloat(valores[3]);
        const valorMilling = parseInt(valores[4]);
        const valorMashing1 = parseInt(valores[5]);
        const valorMashing2 = parseInt(valores[6]);
        const valorMashing3 = parseInt(valores[7]);
        const valorBrewing = parseInt(valores[8]);
        const valorCooling1 = parseInt(valores[9]);
        const valorCooling2 = parseInt(valores[10]);
        const valorCooling3 = parseInt(valores[11]);
        const valorMaturation = parseInt(valores[12]);
        const valorPackaging = parseInt(valores[13]);
        const valorProduct = parseInt(valores[14]);

        valorSteeping.push(valorSteeping);
        valorMalting1.push(valorMalting1);
        valorMalting2.push(valorMalting2);
        valorMalting3.push(valorMalting3);
        valorMilling.push(valorMilling);
        valorMashing1.push(valorMashing1);
        valorMashing2.push(valorMashing2);
        valorMashing3.push(valorMashing3);
        valorBrewing.push(valorBrewing);
        valorCooling1.push(valorCooling1);
        valorCooling2.push(valorCooling2);
        valorCooling3.push(valorCooling3);
        valorMaturation.push(valorMaturation);
        valorPackaging.push(valorPackaging);
        valorProduct.push(valorProduct);

        if (HABILITAR_OPERACAO_INSERIR) {
            if (AMBIENTE == 'producao') {
                // altere!
                // Este insert irá inserir os dados na tabela "medida"
                // -> altere nome da tabela e colunas se necessário
                // Este insert irá inserir dados de fk_aquario id=1 (fixo no comando do insert abaixo)
                // >> Importante! você deve ter o aquario de id 1 cadastrado.
                sqlquery = `INSERT INTO medida (dht11_umidade, dht11_temperatura, luminosidade, lm35_temperatura, chave, momento, fk_aquario) VALUES (${dht11Umidade}, ${dht11Temperatura}, ${luminosidade}, ${lm35Temperatura}, ${chave}, CURRENT_TIMESTAMP, 1)`;

                // CREDENCIAIS DO BANCO REMOTO - SQL SERVER
                // Importante! você deve ter criado o usuário abaixo com os comandos presentes no arquivo
                // "script-criacao-usuario-sqlserver.sql", presente neste diretório.
                const connStr = "Server=servidor-acquatec.database.windows.net;Database=bd-acquatec;User Id=usuarioParaAPIArduino_datawriter;Password=#Gf_senhaParaAPI;";

                function inserirComando(conn, sqlquery) {
                    conn.query(sqlquery);
                    console.log("valores inseridos no banco: ", dht11Umidade + ", " + dht11Temperatura + ", " + luminosidade + ", " + lm35Temperatura + ", " + chave)
                }

                sql.connect(connStr)
                    .then(conn => inserirComando(conn, sqlquery))
                    .catch(err => console.log("erro! " + err));

            } else if (AMBIENTE == 'desenvolvimento') {

                // altere!
                // Este insert irá inserir os dados na tabela "medida"
                // -> altere nome da tabela e colunas se necessário
                // Este insert irá inserir dados de fk_aquario id=1 (fixo no comando do insert abaixo)
                // >> você deve ter o aquario de id 1 cadastrado.
                await poolBancoDados.execute(
                    'INSERT INTO hist_medida (processo1 , processo2 ,processo3 ,processo4 ,processo5 ,processo6 ,processo7 , processo8 , processo9 , processo10 , processo11, processo12 , processo13 , processo14 , processo15, DataHora) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, now())',
                    [valorSteeping, valorMalting1, valorMalting2, valorMalting3, valorMilling, valorMashing1, valorMashing2, valorMashing3, valorBrewing, valorCooling1, valorCooling2, valorCooling3, valorMaturation, valorPackaging, valorProduct]
                );
                console.log("valores inseridos no banco: ", valorSteeping + ", " + valorMalting1 + ", " + valorMalting2 + ", " + valorMalting3 + ", " + valorMilling + ", " + valorMashing1 + ", " + valorMashing2 + ", " + valorMashing3 + ", " + valorBrewing + ", " + valorCooling1 + ", " + valorCooling2 + ", " + valorCooling3 + ", " + valorMaturation + ", " + valorPackaging + ", " + valorProduct)

            } else {
                throw new Error('Ambiente não configurado. Verifique o arquivo "main.js" e tente novamente.');
            }
        }
    });
    arduino.on('error', (mensagem) => {
        console.error(`Erro no arduino (Mensagem: ${mensagem}`)
    });
}


// não altere!
const servidor = (
    valoresDht11Umidade,
    valoresDht11Temperatura,
    valoresLuminosidade,
    valoresLm35Temperatura,
    valoresChave
) => {
    const app = express();
    app.use((request, response, next) => {
        response.header('Access-Control-Allow-Origin', '*');
        response.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
        next();
    });
    app.listen(SERVIDOR_PORTA, () => {
        console.log(`API executada com sucesso na porta ${SERVIDOR_PORTA}`);
    });
    app.get('/sensores/dht11/umidade', (_, response) => {
        return response.json(valoresDht11Umidade);
    });
    app.get('/sensores/dht11/temperatura', (_, response) => {
        return response.json(valoresDht11Temperatura);
    });
    app.get('/sensores/luminosidade', (_, response) => {
        return response.json(valoresLuminosidade);
    });
    app.get('/sensores/lm35/temperatura', (_, response) => {
        return response.json(valoresLm35Temperatura);
    });
    app.get('/sensores/chave', (_, response) => {
        return response.json(valoresChave);
    });
}

(async () => {
    const valorSteeping = [];
    const valorMalting1 = [];
    const valorMalting2 = [];
    const valorMalting3 = [];
    const valorMilling = [];
    const valorMashing1 = [];
    const valorMashing2 = [];
    const valorMashing3 = [];
    const valorBrewing = [];
    const valorCooling1 = [];
    const valorCooling2 = [];
    const valorCooling3 = [];
    const valorMaturation = [];
    const valorPackaging = [];
    const valorProduct = [];
    await serial(
        valorSteeping,
        valorMalting1,
        valorMalting2,
        valorMalting3,
        valorMilling,
        valorMashing1,
        valorMashing2,
        valorMashing3,
        valorBrewing,
        valorCooling1,
        valorCooling2,
        valorCooling3,
        valorMaturation,
        valorPackaging,
        valorProduct
    );
    servidor(
        valorSteeping,
        valorMalting1,
        valorMalting2,
        valorMalting3,
        valorMilling,
        valorMashing1,
        valorMashing2,
        valorMashing3,
        valorBrewing,
        valorCooling1,
        valorCooling2,
        valorCooling3,
        valorMaturation,
        valorPackaging,
        valorProduct
    );
})();
