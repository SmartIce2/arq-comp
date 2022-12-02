var database = require("../database/config")

function listar() {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
        SELECT * FROM usuario;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function validar_login(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function validar_login(): ", email, senha)
    var instrucao = `
        select * from empresa e left join usuario u on u.fkempresa = e.idempresa 
where e.email = '${email}' and e.senha = '${senha}' or u.email = '${email}' and u.senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrar_empresa(razaoSocial, nomeFantasia, cnpj, telefone1, telefone2, email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar_empresa():", razaoSocial, nomeFantasia, cnpj, telefone1, telefone2, email, senha);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO empresa (razaoSocial, nomeFantasia, CNPJ , telefone1, telefone2, email, senha) VALUES ('${razaoSocial}', '${nomeFantasia}', '${cnpj}', '${telefone1}', '${telefone2}', '${email}', '${senha}');
        `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastrar_endereco(cep, logradouro, bairro, cidade, estado, numero) {
    var cadastro_endereco = `
    INSERT INTO endereco (CEP, logradouro, bairro , cidade, estado, numero) VALUES ('${cep}', '${logradouro}', '${bairro}', '${cidade}', '${estado}', '${numero}');`

    console.log("Executando a instrução SQL: \n" + cadastro_endereco);
    return database.executar(cadastro_endereco);

}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao

// funcao para cadastrar funcionario!!!!!!!!!!!!!!!
function cadastrar_funcionario(nome, cargo, email, senha, idEmpresa) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, cargo, email, senha, idEmpresa);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var cadastrar_funcionario = `
        INSERT INTO usuario (nome, funcao, email, senha, fkEmpresa) VALUES ('${nome}', '${cargo}', '${email}', '${senha}', '${idEmpresa}');
    `;
    console.log("Executando a instrução SQL: \n" + cadastrar_funcionario);
    return database.executar(cadastrar_funcionario);
}

module.exports = {
    validar_login,
    cadastrar_empresa,
    cadastrar_funcionario,
    cadastrar_endereco,
    listar,
};