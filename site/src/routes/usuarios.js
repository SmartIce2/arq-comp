var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

router.get("/", function (req, res) {
    usuarioController.testar(req, res);
});

router.get("/listar", function (req, res) {
    usuarioController.listar(req, res);
});

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrarempresa", function (req, res) {
    usuarioController.cadastrar_empresa(req, res);
});

router.post("/CadastrarEndereco", function (req, res) {
    usuarioController.cadastrar_endereco(req, res);
});

router.post("/CadastrarUsuario", function (req, res) {
    usuarioController.cadastrar_funcionario(req, res);
});

router.post("/autenticar", function (req, res) {
    usuarioController.validar_login(req, res);
});

module.exports = router;