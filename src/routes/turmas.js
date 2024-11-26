var express = require("express");
var router = express.Router();

var turmasController = require("../controllers/turmasController");


router.get("/buscarAlunosPorTurma/:idCurso", function (req, res) {
    turmasController.buscarAlunosPorTurma(req, res);
  });


module.exports = router;
