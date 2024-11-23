var express = require("express");
var router = express.Router();

var cursosController = require("../controllers/cursosController");

router.get("/buscarCursosPorUnidade/:idUnidade", function (req, res) {
  cursosController.buscarCursosPorUnidade(req, res);
});

router.post("/cadastrarCurso", function (req, res) {
  cursosController.cadastrarCurso(req, res);
});

router.put("/editarCurso/:idCurso", function (req, res) {
  cursosController.editarCurso(req, res);
});

router.post("/deletarCurso", function (req, res) {
  cursosController.deletarCurso(req, res);
});

module.exports = router;
