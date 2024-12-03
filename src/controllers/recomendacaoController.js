var recomendacaoModel = require("../models/recomendacaoModel");

function listarRecomendacoes(req, res){
  var codigoInstituicao = req.body.codigoInstituicaoServer;

  recomendacaoModel.listarRecomendacoes(codigoInstituicao).then((resultado) => {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).json([]);
    }
  }).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao buscar as recomendacoes: ", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}

function ultimaRecomendacao(req, res){
  var codigoInstituicao = req.body.codigoInstituicaoServer;

  recomendacaoModel.ultimaRecomendacao(codigoInstituicao).then((resultado) => {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).json([]);
    }
  }).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao buscar aultima recomendacao: ", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}

module.exports = {
    listarRecomendacoes,
    ultimaRecomendacao
  };