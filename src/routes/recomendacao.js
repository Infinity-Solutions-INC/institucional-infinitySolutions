var express = require("express");
var router = express.Router();

var recomendacaoController = require("../controllers/recomendacaoController");

router.post("/listarRecomendacoes", function (req, res) {
    recomendacaoController.listarRecomendacoes(req, res);
})

router.post("/ultimaRecomendacao", function (req, res) {
    recomendacaoController.ultimaRecomendacao(req, res);
})

module.exports = router;