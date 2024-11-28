var express = require("express");
var router = express.Router();

var turmasController = require("../controllers/turmasController");

router.get("/buscarTurmasPorCurso/:idUnidade/:idCurso", function (req, res) {
  turmasController.buscarTurmasPorCurso(req, res);
});

router.get("/buscarAlunosPorCurso/:idUnidade", function (req, res) {
  turmasController.buscarAlunosPorCurso(req, res);
});

router.put("/registrarTurmaPorCurso/:idUnidade/:idCurso", function (req, res) {
  turmasController.registrarTurmaPorCurso(req, res);
});

router.put("/atualizarTurma/:idTurma", function (req, res) {
  turmasController.atualizarTurma(req, res);
});

router.post("/deletarTurma", function (req, res) {
  turmasController.deletarTurma(req, res);
});

module.exports = router;
