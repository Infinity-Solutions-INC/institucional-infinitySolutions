var turmasModel = require("../models/turmasModel");


function buscarTurmasPorCurso(req, res) {
    var idUnidade = req.params.idUnidade;
    var idCurso = req.params.idCurso;
  
    turmasModel
      .buscarTurmasPorCurso(idUnidade, idCurso)
      .then(function (resultado) {
        if (resultado.length > 0) {
          res.status(200).json(resultado); /*resposta que o bd traz*/
        } else {
          res.status(204).send("Nenhum resultado encontrado!");
        }
      })
      .catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as turmas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
      });
}

function buscarAlunosPorCurso(req, res) {
  var idUnidade = req.params.idUnidade;

  turmasModel
    .buscarAlunosPorCurso(idUnidade)
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado); /*resposta que o bd traz*/
      } else {
        res.status(204).send("Nenhum resultado encontrado!");
      }
    })
    .catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao buscar os alunos.", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
  }



module.exports = {
    buscarTurmasPorCurso,
    buscarAlunosPorCurso
}