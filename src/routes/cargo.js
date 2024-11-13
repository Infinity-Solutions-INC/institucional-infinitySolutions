var express = require("express");
var router = express.Router();

var cargoController = require("../controllers/cargoController");


router.post("/listarCargos", function (res) {
    cargoController.listarCargos(res);
})

module.exports = router;