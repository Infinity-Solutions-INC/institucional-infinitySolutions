var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/validarUsuario", function (req, res) {
    usuarioController.validarUsuario(req, res);
})

router.post("/buscarUsuariosUnidade", function (req, res) {
    usuarioController.buscarUsuariosUnidade(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

module.exports = router;