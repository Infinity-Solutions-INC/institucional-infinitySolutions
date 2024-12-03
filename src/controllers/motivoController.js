var motivoModel = require("../models/motivoModel");

function buscarDadosGrafico(req, res) {
    var codigo_instituicao = req.body.codigo_instituicao;
    console.log(codigo_instituicao)

    motivoModel.buscarDadosGraficosEvasao(codigo_instituicao).then((resultado) => {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).json([]);
        }
    }).catch((erro) => {
        console.log("Erro ao buscar os dados:", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
  }

  module.exports = {
    buscarDadosGrafico
 }