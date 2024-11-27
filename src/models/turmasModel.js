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
  var buscarTurmas = `    SELECT
    curso.nome_curso,
    SUM(turma.qtd_ingressantes) AS total_ingressantes,
    SUM(turma.qtd_alunos_permanencia) AS total_permanentes,
    SUM(turma.qtd_ingressantes - turma.qtd_alunos_permanencia) AS total_evasao
FROM
    turma turma
INNER JOIN
    curso curso
    ON turma.fkcodigo_curso = curso.codigo_curso
WHERE
    curso.fkcodigo_instituicao = '${idUnidade}'
    AND turma.turno_turma IS NOT NULL
    AND turma.modalidade_turma IS NOT NULL
    AND turma.mensalidade_turma IS NOT NULL
    AND turma.ano_turma = (
        SELECT MAX(ano_turma)
        FROM turma
        WHERE modalidade_turma IS NOT NULL
    )
GROUP BY
    curso.codigo_curso, curso.nome_curso;
`;

  console.log("Executando a instrução SQL: \n" + buscarTurmas);
  return database.executar(buscarTurmas);
}

module.exports = {
  buscarTurmasPorCurso,
  buscarAlunosPorCurso,
};
