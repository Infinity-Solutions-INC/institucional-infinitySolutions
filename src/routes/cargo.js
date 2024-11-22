var express = require("express");
var router = express.Router();

var cargoController = require("../controllers/cargoController");


router.post("/listarCargos", function (req, res) {
    cargoController.listarCargos(req, res);
})


module.exports = router;