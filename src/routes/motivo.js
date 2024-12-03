var express = require("express");
var router = express.Router();

var motivoController = require("../controllers/motivoController");

router.post("/buscarDadosGrafico", function (req, res) {
  motivoController.buscarDadosGrafico(req, res);
});

module.exports = router;