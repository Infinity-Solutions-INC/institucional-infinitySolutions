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

router.post("/deletarTODASTurmas", function (req, res) {
  turmasController.deletarTODASTurmas(req, res);
});

router.get("/buscarDadosTurmas/:idUnidade", function (req, res) {
  turmasController.buscarDadosTurmas(req, res);
});

router.get("/buscarTurnoEvasao/:idUnidade", function (req, res) {
  turmasController.buscarTurnoEvasao(req, res);
});

router.get("/buscarModalidadeEvasao/:idUnidade", function (req, res) {
  turmasController.buscarModalidadeEvasao(req, res);
});

router.get(
  "/buscarCursoMaiorEvasao/:idUnidade/:nomeCurso",
  function (req, res) {
    turmasController.buscarCursoMaiorEvasao(req, res);
  }
);

router.get("/buscarTurmasFiltradas/:idUnidade/:nomeCurso", function (req, res) {
  turmasController.buscarTurmasFiltradas(req, res);
});

router.get("/buscarRankingFiltrado/:idUnidade/:nomeCurso", function (req, res) {
  turmasController.buscarRankingFiltrado(req, res);
});

router.get("/buscarKPIfiltrada/:idUnidade/:nomeCurso", function (req, res) {
  turmasController.buscarKPIfiltrada(req, res);
});

router.get("/buscarDadosFiltrados/:idUnidade/:nomeCurso", function (req, res) {
  turmasController.buscarDadosFiltrados(req, res);
});

router.get("/buscarMensalidadesFiltrados/:idUnidade/:nomeCurso", function (req, res) {
  turmasController.buscarMensalidadesFiltrados(req, res);
});

module.exports = router;
