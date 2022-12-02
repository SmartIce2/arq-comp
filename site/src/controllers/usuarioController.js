var usuarioModel = require("../models/usuarioModel");

var sessoes = [];

function testar(req, res) {
    console.log("ENTRAMOS NA usuarioController");
    res.json("ESTAMOS FUNCIONANDO!");
}

function listar(req, res) {
    usuarioModel.listar()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function validar_login(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.validar_login(email, senha)
            .then(
                function (resultado) {
                    console.log(`\nResultados encontrados: ${resultado.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

                    if (resultado.length == 1) {
                        console.log(resultado);
                        res.json(resultado[0]);
                    } else if (resultado.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar_empresa(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var razaoSocial = req.body.razaoSocialServer;
    var nomeFantasia = req.body.nomeFantasiaServer;
    var cnpj = req.body.cnpjServer;
    var telefone1 = req.body.telefone1Server;
    var telefone2 = req.body.telefone2Server;
    var email_empresa = req.body.emailServer;
    var senha_empresa = req.body.senhaServer;

    // Faça as validações dos valores
    if (razaoSocial == undefined) {
        res.status(400).send("A razão social está undefined!");
    } else if (nomeFantasia == undefined) {
        res.status(400).send("O nome fantasia está undefined!");
    } else if (cnpj == undefined) {
        res.status(400).send("O CNPJ está undefined")
    } else if (telefone1 == undefined) {
        res.status(400).send("O telefone principal está undefined")
    } else if (telefone2 == undefined) {
        res.status(400).send("O telefone secundário está undefined")
    } else if (email_empresa == undefined) {
        res.status(400).send("O e-mail está undefined")
    } else if (senha_empresa == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar_empresa(razaoSocial, nomeFantasia, cnpj, telefone1, telefone2, email_empresa, senha_empresa)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function cadastrar_endereco(req, res) {
    var cep = req.body.cepServer;
    var rua = req.body.ruaServer;
    var bairro = req.body.bairroServer;
    var cidade = req.body.cidadeServer;
    var estado = req.body.estadoServer;
    var numero = req.body.numeroServer;

    usuarioModel.cadastrar_endereco(cep, rua, bairro, cidade, estado, numero)
        .then(
            function (resultado) {
                res.json(resultado);
            }

        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar o cadastro! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function cadastrar_funcionario(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var cargo = req.body.funcaoServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var idEmpresa = req.body.idEmpresaServer;

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("O nome está undefined!");
    } else if (cargo == undefined) {
        res.status(400).send("O cargo / função está undefined!");
    } else if (email == undefined) {
        res.status(400).send("O e-mail está undefined")
    } else if (senha == undefined) {
        res.status(400).send("A senha está undefined")
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar_funcionario(nome, cargo, email, senha, idEmpresa)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    validar_login,
    cadastrar_empresa,
    cadastrar_endereco,
    cadastrar_funcionario,
    listar,
    testar
}