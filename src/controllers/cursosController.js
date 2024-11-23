var cursosModel = require("../models/cursosModel");

function buscarCursosPorUnidade(req, res) {
  var idUnidade = req.params.idUnidade;

  cursosModel
    .buscarCursosPorUnidade(idUnidade)
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado); /*resposta que o bd traz*/
      } else {
        res.status(204).send("Nenhum resultado encontrado!");
      }
    })
    .catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao buscar os cursos.", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

function cadastrarCurso(req, res) {
  var nomeCurso = req.body.nomeCursoServer;
  var anoCurso = req.body.anoCursoServer;
  var idUnidade = req.body.idInstituicaoServer;

  if (nomeCurso == undefined) {
    res.status(400).send("O nome do curso está undefined!");
  } else if (anoCurso == undefined) {
    res.status(400).send("O ano do curso está undefined!");
  } else if (idUnidade == undefined) {
    res.status(400).send("O id da instituição está undefined!");
  } else {
    console.log("Dados válidos!");

    cursosModel
      .cadastrarCurso(nomeCurso, anoCurso, idUnidade)
      .then(function (resultado) {
        res.json(resultado);
      })
      .catch(function (erro) {
        console.log(erro);
        console.log(
          "\nHouve um erro ao cadastrar o curso! Erro: ",
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      });
  }
}

function editarCurso(req, res) {
  var idCurso = req.params.idCurso;
  var nomeCurso = req.body.nomeCursoServer;
  var anoCurso = req.body.anoCursoServer;
  var idUnidade = req.body.idInstituicaoServer;

  if (idCurso == undefined) {
    res.status(400).send("O id do curso está undefined!");
  } else if (nomeCurso == undefined) {
    res.status(400).send("O nome do curso está undefined!");
  } else if (anoCurso == undefined) {
    res.status(400).send("O ano do curso está undefined!");
  } else if (idUnidade == undefined) {
    res.status(400).send("O id da instituição está undefined!");
  } else {
    cursosModel
      .editarCurso(idCurso, nomeCurso, anoCurso, idUnidade)
      .then(function (resultado) {
        res.json(resultado);
      })
      .catch(function (erro) {
        console.log(erro);
        console.log(
          "\nHouve um erro ao editar o curso! Erro: ",
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      });
  }
}

function deletarCurso(req, res) {
    var idCurso = req.body.idCursoServer; 
    var idUnidade = req.body.idInstituicaoServer; 
  
    if (idCurso == undefined) {
      res.status(400).send("O id do curso está undefined!");
    } else if (idUnidade == undefined) {
      res.status(400).send("O id da instituição está undefined!");
    } else {
      cursosModel
        .deletarCurso(idCurso, idUnidade)
        .then(function (resultado) {
          res.json(resultado);  // Retorna o resultado da exclusão
        })
        .catch(function (erro) {
          console.log(erro);
          console.log("Houve um erro ao deletar o curso! Erro: ", erro.sqlMessage);
          res.status(500).json(erro.sqlMessage);
        });
    }
}


module.exports = {
  buscarCursosPorUnidade,
  cadastrarCurso,
  editarCurso,
  deletarCurso
};
