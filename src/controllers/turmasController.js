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

function registrarTurmaPorCurso(req, res) {
  var idUnidade = req.body.idInstituicaoServer;
  var idCurso = req.body.idCursoServer;
  var nomeDoCurso = req.body.nomeDoCursoServer;
  var anoDaTurma = req.body.anoDaTurmaServer;
  var turnoDaTurma = req.body.turnoDaTurmaServer;
  var modalidadeDaTurma = req.body.modalidadeDaTurmaServer;
  var mensalidadeDaTurma = req.body.mensalidadeDaTurmaServer;

  if (idUnidade == undefined) {
    res.status(400).send("O id da instituição está undefined!");
  } else if (idCurso == undefined) {
    res.status(400).send("O id do curso está undefined!");
  } else {
    console.log("Dados válidos!");

    turmasModel
      .registrarTurmaPorCurso(
        idUnidade,
        idCurso,
        nomeDoCurso,
        anoDaTurma,
        turnoDaTurma,
        modalidadeDaTurma,
        mensalidadeDaTurma
      )
      .then(function (resultado) {
        res.json(resultado);
      })
      .catch(function (erro) {
        console.log(erro);
        console.log(
          "\nHouve um erro ao cadastrar a turma! Erro: ",
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      });
  }
}

function atualizarTurma(req, res) {
  var idTurma = req.body.idTurmaServer;
  var turnoDaTurma = req.body.turnoDaTurmaServer;
  var modalidadeDaTurma = req.body.modalidadeDaTurmaServer;
  var mensalidadeDaTurma = req.body.mensalidadeDaTurmaServer;

  if (idTurma == undefined) {
    res.status(400).send("O id da turma está undefined!");
  } else if (turnoDaTurma == undefined) {
    res.status(400).send("O ano da turma está undefined!");
  } else {
    console.log("Dados válidos!");

    turmasModel
      .atualizarTurma(
        idTurma,
        turnoDaTurma,
        modalidadeDaTurma,
        mensalidadeDaTurma
      )
      .then(function (resultado) {
        res.json(resultado);
      })
      .catch(function (erro) {
        console.log(erro);
        console.log(
          "\nHouve um erro ao cadastrar a turma! Erro: ",
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      });
  }
}

function deletarTurma(req, res) {
  var idTurma = req.body.idTurmaServer;

  if (idTurma == undefined) {
    res.status(400).send("O ID da turma está undefined!");
  } else {
    console.log("Dados válidos!");

    turmasModel
      .deletarTurma(idTurma)
      .then(function (resultado) {
        res.json(resultado);
      })
      .catch(function (erro) {
        console.log(erro);
        console.log(
          "\nHouve um erro ao deletar a turma! Erro: ",
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      });
  }
}

function deletarTODASTurmas(req, res) {
  var nomeCurso = req.body.nomeDoCursoServer;
  
  if (nomeCurso == undefined) {
    res.status(400).send("O nome do curso está undefined!");
  } else {
    console.log("Dados válidos!");

    turmasModel
      .deletarTODASTurmas(nomeCurso)
      .then(function (resultado) {
        res.json(resultado);
      })
      .catch(function (erro) {
        console.log(erro);
        console.log(
          "\nHouve um erro ao deletar todas as turmas! Erro: ",
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      });
  }
}

function buscarDadosTurmas(req, res) {
  var idUnidade = req.params.idUnidade;

  turmasModel
    .buscarDadosTurmas(idUnidade)
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado); /*resposta que o bd traz*/
      } else {
        res.status(204).send("Nenhum resultado encontrado!");
      }
    })
    .catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao buscar dados das turmas.", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });  
}

function buscarTurnoEvasao(req, res) {
  var idUnidade = req.params.idUnidade;

  turmasModel
    .buscarTurnoEvasao(idUnidade)
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado); /*resposta que o bd traz*/
      } else {
        res.status(204).send("Nenhum resultado encontrado!");
      }
    })
    .catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao buscar o turno das turmas.", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });  
}

function buscarModalidadeEvasao(req, res) {
  var idUnidade = req.params.idUnidade;

  turmasModel
    .buscarModalidadeEvasao(idUnidade)
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado); /*resposta que o bd traz*/
      } else {
        res.status(204).send("Nenhum resultado encontrado!");
      }
    })
    .catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao buscar a modalidade das turmas.", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });  
}

function buscarCursoMaiorEvasao(req, res) {
  var nomeCurso = req.params.nomeCurso;
  var idUnidade = req.params.idUnidade;

  turmasModel
    .buscarCursoMaiorEvasao(nomeCurso, idUnidade)
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado); /*resposta que o bd traz*/
      } else {
        res.status(204).send("Nenhum resultado encontrado!");
      }
    })
    .catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao buscar o curso de maior evasão.", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });  
}

function buscarTurmasFiltradas(req, res) {
  var nomeCurso = req.params.nomeCurso;
  var idUnidade = req.params.idUnidade;

  turmasModel
    .buscarTurmasFiltradas(nomeCurso, idUnidade)
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado); /*resposta que o bd traz*/
      } else {
        res.status(204).send("Nenhum resultado encontrado!");
      }
    })
    .catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao buscar o curso de maior evasão.", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });  
}

function buscarRankingFiltrado(req, res) {
  var nomeCurso = req.params.nomeCurso;
  var idUnidade = req.params.idUnidade;

  turmasModel
    .buscarRankingFiltrado(nomeCurso, idUnidade)
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado); /*resposta que o bd traz*/
      } else {
        res.status(204).send("Nenhum resultado encontrado!");
      }
    })
    .catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao buscar o curso de maior evasão.", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });  
}

function buscarKPIfiltrada(req, res) {
  var nomeCurso = req.params.nomeCurso;
  var idUnidade = req.params.idUnidade;

  turmasModel
    .buscarKPIfiltrada(nomeCurso, idUnidade)
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado); /*resposta que o bd traz*/
      } else {
        res.status(204).send("Nenhum resultado encontrado!");
      }
    })
    .catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao buscar o curso de maior evasão.", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });  
}

function buscarDadosFiltrados(req, res) {
  var nomeCurso = req.params.nomeCurso;
  var idUnidade = req.params.idUnidade;

  turmasModel
    .buscarDadosFiltrados(nomeCurso, idUnidade)
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado); /*resposta que o bd traz*/
      } else {
        res.status(204).send("Nenhum resultado encontrado!");
      }
    })
    .catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao buscar o curso de maior evasão.", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });  
}

function buscarMensalidadesFiltrados(req, res) {
  var nomeCurso = req.params.nomeCurso;
  var idUnidade = req.params.idUnidade;

  turmasModel
    .buscarMensalidadesFiltrados(nomeCurso, idUnidade)
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado); /*resposta que o bd traz*/
      } else {
        res.status(204).send("Nenhum resultado encontrado!");
      }
    })
    .catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao buscar o curso de maior evasão.", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });  
}

module.exports = {
  buscarTurmasPorCurso,
  buscarAlunosPorCurso,
  registrarTurmaPorCurso,
  atualizarTurma,
  deletarTurma,
  deletarTODASTurmas,
  buscarDadosTurmas,
  buscarTurnoEvasao,
  buscarModalidadeEvasao,
  buscarCursoMaiorEvasao,
  buscarTurmasFiltradas,
  buscarRankingFiltrado,
  buscarKPIfiltrada,
  buscarDadosFiltrados,
  buscarMensalidadesFiltrados
};
