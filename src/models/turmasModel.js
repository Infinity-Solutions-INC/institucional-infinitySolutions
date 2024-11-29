var database = require("../database/config");

function buscarTurmasPorCurso(idUnidade, idCurso) {
  var buscarTurmas = `SELECT codigo_turma, ano_turma, turno_turma, modalidade_turma, mensalidade_turma
    FROM turma turma
    INNER JOIN curso curso ON turma.fkcodigo_curso = curso.codigo_curso
    WHERE curso.fkcodigo_instituicao = '${idUnidade}'
    AND curso.codigo_curso = '${idCurso}'
    AND turma.turno_turma IS NOT NULL
    AND turma.modalidade_turma IS NOT NULL
    AND turma.mensalidade_turma IS NOT NULL`;

  console.log("Executando a instrução SQL: \n" + buscarTurmas);
  return database.executar(buscarTurmas);
}

function buscarAlunosPorCurso(idUnidade) {
  var buscarTurmas = `
      SELECT
    curso.nome_curso,
    turma.ano_turma AS ano_atual,
    SUM(turma.qtd_ingressantes) AS total_ingressantes,
    SUM(turma.qtd_alunos_permanencia) AS total_permanentes,
    SUM(turma.qtd_ingressantes - turma.qtd_alunos_permanencia) AS total_evasao,
    (
        SELECT 
            COALESCE(SUM(t_anterior.qtd_ingressantes - t_anterior.qtd_alunos_permanencia), 0)
        FROM 
            turma t_anterior
        WHERE 
            t_anterior.fkcodigo_curso = turma.fkcodigo_curso
            AND t_anterior.ano_turma = turma.ano_turma - 1
            AND t_anterior.turno_turma IS NOT NULL
            AND t_anterior.modalidade_turma IS NOT NULL
            AND t_anterior.mensalidade_turma IS NOT NULL
    ) AS evasao_anterior
FROM
    turma
INNER JOIN
    curso
    ON turma.fkcodigo_curso = curso.codigo_curso
WHERE
    curso.fkcodigo_instituicao = '${idUnidade}'
    AND turma.turno_turma IS NOT NULL
    AND turma.modalidade_turma IS NOT NULL
    AND turma.mensalidade_turma IS NOT NULL
    AND turma.ano_turma = (
        SELECT MAX(t2.ano_turma)
        FROM turma t2
        WHERE t2.fkcodigo_curso = turma.fkcodigo_curso
          AND t2.modalidade_turma IS NOT NULL
    )
GROUP BY
    curso.codigo_curso, curso.nome_curso, turma.ano_turma;

`;

  console.log("Executando a instrução SQL: \n" + buscarTurmas);
  return database.executar(buscarTurmas);
}

function registrarTurmaPorCurso(
  idUnidade,
  idCurso,
  nomeCurso,
  anoTurma,
  turnoTurma,
  modalidadeTurma,
  mensalidadeTurma
) {
  var registrarTurma = `UPDATE turma t
INNER JOIN curso c ON t.fkcodigo_curso = c.codigo_curso
JOIN (
    SELECT t1.codigo_turma
    FROM turma t1
    INNER JOIN curso c1 ON t1.fkcodigo_curso = c1.codigo_curso
    WHERE 
        c1.nome_curso = '${nomeCurso}'
        AND t1.ano_turma = '${anoTurma}'
        AND c1.codigo_curso = '${idCurso}'
        AND c1.fkcodigo_instituicao = '${idUnidade}'
        AND t1.turno_turma IS NULL
        AND t1.modalidade_turma IS NULL
        AND t1.mensalidade_turma IS NULL
    ORDER BY t1.ano_turma DESC
    LIMIT 1
) AS subquery ON t.codigo_turma = subquery.codigo_turma
SET 
    t.turno_turma = '${turnoTurma}', 
    t.modalidade_turma = '${modalidadeTurma}', 
    t.mensalidade_turma = '${mensalidadeTurma}';
  
  `;
  console.log("Execurando a instrução SQL: \n" + registrarTurma);
  return database.executar(registrarTurma);
}

function atualizarTurma(
  idTurma,
  turnoTurma,
  modalidadeTurma,
  mensalidadeTurma
) {
  var atualizarTurma = `
  UPDATE turma
  SET
  turno_turma = '${turnoTurma}',
  modalidade_turma = '${modalidadeTurma}',
  mensalidade_turma = '${mensalidadeTurma}'
  WHERE
  codigo_turma = '${idTurma}';
  `;
  console.log("Execurando a instrução SQL: \n" + atualizarTurma);
  return database.executar(atualizarTurma);
}

function deletarTurma(idTurma) {
  var deletarTurma = `
  UPDATE turma
  SET
  turno_turma = null,
  modalidade_turma = null,
  mensalidade_turma = null
  WHERE
  codigo_turma = '${idTurma}'
  `;
  console.log("Execurando a instrução SQL: \n" + deletarTurma);
  return database.executar(deletarTurma);
}

function deletarTODASTurmas(nomeCurso) {
  var deletarTODASTurmas = `
  UPDATE turma
  JOIN curso ON turma.fkcodigo_curso = curso.codigo_curso
  SET 
    turma.modalidade_turma = NULL,
    turma.mensalidade_turma = NULL,
    turma.turno_turma = NULL
  WHERE curso.nome_curso = '${nomeCurso}';
  `;
  console.log("Execurando a instrução SQL: \n" + deletarTODASTurmas);
  return database.executar(deletarTODASTurmas);
}

function buscarDadosTurmas(idUnidade) {
  var buscarDadosTurmas = `
  SELECT
    COUNT(CASE WHEN modalidade_turma = 'Online' THEN 1 END) AS total_online,
    COUNT(CASE WHEN modalidade_turma = 'Presencial' THEN 1 END) AS total_presencial,
    COUNT(CASE WHEN turno_turma = 'Matinal' THEN 1 END) AS total_matinal,
    COUNT(CASE WHEN turno_turma = 'Vespertino' THEN 1 END) AS total_vespertino,
    COUNT(CASE WHEN turno_turma = 'Noturno' THEN 1 END) AS total_noturno
  FROM
    turma 
    JOIN curso ON turma.fkcodigo_curso = curso.codigo_curso
    WHERE curso.fkcodigo_instituicao = '${idUnidade}';
`;

  console.log("Execurando a instrução SQL: \n" + buscarDadosTurmas);
  return database.executar(buscarDadosTurmas);
}

module.exports = {
  buscarTurmasPorCurso,
  buscarAlunosPorCurso,
  registrarTurmaPorCurso,
  atualizarTurma,
  deletarTurma,
  deletarTODASTurmas,
  buscarDadosTurmas,
  
};
