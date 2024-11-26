var express = require("express");
var router = express.Router();

var turmasController = require("../controllers/turmasController");

router.get("/buscarTurmasPorUnidade/:idUnidade", function (req, res) {
  turmasController.buscarTurmasPorUnidade(req, res);
});

module.exports = router;
