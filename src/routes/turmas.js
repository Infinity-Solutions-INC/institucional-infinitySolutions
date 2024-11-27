var express = require("express");
var router = express.Router();

var turmasController = require("../controllers/turmasController");

router.get("/buscarTurmasPorCurso/:idUnidade/:idCurso", function (req, res) {
  turmasController.buscarTurmasPorCurso(req, res);
});

router.get("/buscarAlunosPorCurso/:idUnidade", function (req, res) {
  turmasController.buscarAlunosPorCurso(req, res);
});

module.exports = router;
