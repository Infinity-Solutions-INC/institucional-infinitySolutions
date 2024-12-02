var database = require("../database/config");

function buscarTurmasPorCurso(idUnidade, idCurso) {
  var buscarTurmas = `SELECT codigo_turma, ano_turma, turno_turma, modalidade_turma, mensalidade_turma FROM turma turma INNER JOIN curso curso ON turma.fkcodigo_curso = curso.codigo_curso WHERE curso.fkcodigo_instituicao = '${idUnidade}' AND curso.codigo_curso = '${idCurso}' AND turma.turno_turma IS NOT NULL AND turma.modalidade_turma IS NOT NULL AND turma.mensalidade_turma IS NOT NULL;`;
  console.log("Executando a instrução SQL: \n" + buscarTurmas);
  return database.executar(buscarTurmas);
}

function buscarAlunosPorCurso(idUnidade) {
  var buscarTurmas = `SELECT curso.nome_curso, turma.ano_turma AS ano_atual, SUM(turma.qtd_ingressantes) AS total_ingressantes, SUM(turma.qtd_alunos_permanencia) AS total_permanentes, SUM(turma.qtd_ingressantes - turma.qtd_alunos_permanencia) AS total_evasao, (SELECT COALESCE(SUM(t_anterior.qtd_ingressantes - t_anterior.qtd_alunos_permanencia), 0) FROM turma t_anterior WHERE t_anterior.fkcodigo_curso = turma.fkcodigo_curso AND t_anterior.ano_turma = turma.ano_turma - 1 AND t_anterior.turno_turma IS NOT NULL AND t_anterior.modalidade_turma IS NOT NULL AND t_anterior.mensalidade_turma IS NOT NULL) AS evasao_anterior FROM turma INNER JOIN curso ON turma.fkcodigo_curso = curso.codigo_curso WHERE curso.fkcodigo_instituicao = '${idUnidade}' AND turma.turno_turma IS NOT NULL AND turma.modalidade_turma IS NOT NULL AND turma.mensalidade_turma IS NOT NULL AND turma.ano_turma = (SELECT MAX(t2.ano_turma) FROM turma t2 WHERE t2.fkcodigo_curso = turma.fkcodigo_curso AND t2.modalidade_turma IS NOT NULL) GROUP BY curso.codigo_curso, curso.nome_curso, turma.ano_turma;`;
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
  var registrarTurma = `UPDATE turma t INNER JOIN curso c ON t.fkcodigo_curso = c.codigo_curso JOIN (SELECT t1.codigo_turma FROM turma t1 INNER JOIN curso c1 ON t1.fkcodigo_curso = c1.codigo_curso WHERE c1.nome_curso = '${nomeCurso}' AND t1.ano_turma = '${anoTurma}' AND c1.codigo_curso = '${idCurso}' AND c1.fkcodigo_instituicao = '${idUnidade}' AND t1.turno_turma IS NULL AND t1.modalidade_turma IS NULL AND t1.mensalidade_turma IS NULL ORDER BY t1.ano_turma DESC LIMIT 1) AS subquery ON t.codigo_turma = subquery.codigo_turma SET t.turno_turma = '${turnoTurma}', t.modalidade_turma = '${modalidadeTurma}', t.mensalidade_turma = '${mensalidadeTurma}';`;
  console.log("Execurando a instrução SQL: \n" + registrarTurma);
  return database.executar(registrarTurma);
}

function atualizarTurma(
  idTurma,
  turnoTurma,
  modalidadeTurma,
  mensalidadeTurma
) {
  var atualizarTurma = `UPDATE turma SET turno_turma = '${turnoTurma}', modalidade_turma = '${modalidadeTurma}', mensalidade_turma = '${mensalidadeTurma}' WHERE codigo_turma = '${idTurma}';`;
  console.log("Execurando a instrução SQL: \n" + atualizarTurma);
  return database.executar(atualizarTurma);
}

function deletarTurma(idTurma) {
  var deletarTurma = `UPDATE turma SET turno_turma = null, modalidade_turma = null, mensalidade_turma = null WHERE codigo_turma = '${idTurma};'
  `;
  console.log("Execurando a instrução SQL: \n" + deletarTurma);
  return database.executar(deletarTurma);
}

function deletarTODASTurmas(nomeCurso) {
  var deletarTODASTurmas = `UPDATE turma JOIN curso ON turma.fkcodigo_curso = curso.codigo_curso SET turma.modalidade_turma = NULL, turma.mensalidade_turma = NULL, turma.turno_turma = NULL WHERE curso.nome_curso = '${nomeCurso}';`;
  console.log("Execurando a instrução SQL: \n" + deletarTODASTurmas);
  return database.executar(deletarTODASTurmas);
}

function buscarDadosTurmas(idUnidade) {
  var buscarDadosTurmas = `SELECT COUNT(CASE WHEN modalidade_turma = 'Online' THEN 1 END) AS total_online, COUNT(CASE WHEN modalidade_turma = 'Presencial' THEN 1 END) AS total_presencial, COUNT(CASE WHEN turno_turma = 'Matutino' THEN 1 END) AS total_matutino, COUNT(CASE WHEN turno_turma = 'Vespertino' THEN 1 END) AS total_vespertino, COUNT(CASE WHEN turno_turma = 'Noturno' THEN 1 END) AS total_noturno, SUM(CASE WHEN modalidade_turma = 'Online' THEN qtd_alunos_permanencia ELSE 0 END) AS matriculas_online, SUM(CASE WHEN modalidade_turma = 'Presencial' THEN qtd_alunos_permanencia ELSE 0 END) AS matriculas_presencial, SUM(CASE WHEN turno_turma = 'Matutino' THEN qtd_alunos_permanencia ELSE 0 END) AS matriculas_matutino, SUM(CASE WHEN turno_turma = 'Vespertino' THEN qtd_alunos_permanencia ELSE 0 END) AS matriculas_vespertino, SUM(CASE WHEN turno_turma = 'Noturno' THEN qtd_alunos_permanencia ELSE 0 END) AS matriculas_noturno FROM turma JOIN curso ON turma.fkcodigo_curso = curso.codigo_curso WHERE curso.fkcodigo_instituicao = '${idUnidade}';
`;

  console.log("Execurando a instrução SQL: \n" + buscarDadosTurmas);
  return database.executar(buscarDadosTurmas);
}

function buscarTurnoEvasao(idUnidade) {
  var buscarTurnoEvasao = `SELECT turno_turma AS turno_maior_evasao, SUM(qtd_ingressantes - qtd_alunos_permanencia) AS total_evasao, COUNT(*) AS total_turmas_no_turno, SUM(qtd_alunos_permanencia) AS total_alunos_permanentes FROM turma INNER JOIN curso ON turma.fkcodigo_curso = curso.codigo_curso WHERE curso.fkcodigo_instituicao = '${idUnidade}' AND turma.turno_turma IS NOT NULL GROUP BY turno_turma ORDER BY total_evasao DESC LIMIT 1;
  `;
  console.log("Execurando a instrução SQL: \n" + buscarTurnoEvasao);
  return database.executar(buscarTurnoEvasao);
}

function buscarModalidadeEvasao(idUnidade) {
  var buscarModalidadeEvasao = `SELECT modalidade_turma AS modalidade_maior_evasao, SUM(qtd_ingressantes - qtd_alunos_permanencia) AS total_evasao, COUNT(*) AS total_turmas_na_modalidade, SUM(qtd_alunos_permanencia) AS total_alunos_permanentes FROM turma INNER JOIN curso ON turma.fkcodigo_curso = curso.codigo_curso WHERE curso.fkcodigo_instituicao = '${idUnidade}' AND turma.modalidade_turma IS NOT NULL GROUP BY modalidade_turma ORDER BY total_evasao DESC LIMIT 1;
  `;
  console.log("Execurando a instrução SQL: \n" + buscarModalidadeEvasao);
  return database.executar(buscarModalidadeEvasao);
}

function buscarCursoMaiorEvasao(nomeCurso, idUnidade) {
  var buscarCursoMaiorEvasao = `SELECT turno_turma AS turno_maior_evasao, modalidade_turma AS modalidade_maior_evasao, SUM(qtd_ingressantes - qtd_alunos_permanencia) AS total_evasao, COUNT(*) AS total_turmas, SUM(qtd_alunos_permanencia) AS total_alunos_permanentes FROM turma INNER JOIN curso ON turma.fkcodigo_curso = curso.codigo_curso WHERE curso.nome_curso = '${nomeCurso}' AND curso.fkcodigo_instituicao = '${idUnidade}' AND turma.modalidade_turma IS NOT NULL AND  turma.ano_turma = (SELECT MAX(ano_turma) FROM turma WHERE modalidade_turma IS NOT NULL) GROUP BY  turno_turma, modalidade_turma ORDER BY  total_evasao DESC LIMIT 1;
    `;
  console.log("Execurando a instrução SQL: \n" + buscarCursoMaiorEvasao);
  return database.executar(buscarCursoMaiorEvasao);
}

function buscarTurmasFiltradas(nomeCurso, idUnidade) {
  var buscarTurmasFiltradas = `SELECT curso.nome_curso AS nome_curso, SUM(turma.qtd_alunos_permanencia) AS total_alunos_no_curso, COUNT(CASE WHEN turma.turno_turma = 'Matutino' THEN 1 END) AS turmas_matutino, COUNT(CASE WHEN turma.turno_turma = 'Vespertino' THEN 1 END) AS turmas_vespertino, COUNT(CASE WHEN turma.turno_turma = 'Noturno' THEN 1 END) AS turmas_noturno, COUNT(CASE WHEN turma.modalidade_turma = 'Online' THEN 1 END) AS turmas_online, COUNT(CASE WHEN turma.modalidade_turma = 'Presencial' THEN 1 END) AS turmas_presencial FROM turma INNER JOIN curso ON turma.fkcodigo_curso = curso.codigo_curso WHERE   curso.nome_curso = '${nomeCurso}' AND curso.fkcodigo_instituicao = '${idUnidade}' AND turma.modalidade_turma IS NOT NULL GROUP BY curso.nome_curso;`;
  console.log("Execurando a instrução SQL: \n" + buscarTurmasFiltradas);
  return database.executar(buscarTurmasFiltradas);
}

function buscarRankingFiltrado(nomeCurso, idUnidade) {
  var buscarRankingFiltrado = `WITH evasao_por_curso AS (SELECT curso.codigo_curso, curso.nome_curso, SUM(turma.qtd_ingressantes) AS total_ingressantes, SUM(turma.qtd_alunos_permanencia) AS total_permanentes, SUM(turma.qtd_ingressantes - turma.qtd_alunos_permanencia) AS total_evasao, SUM(turma.qtd_alunos_permanencia) * 1.0 / (SELECT SUM(qtd_alunos_permanencia) FROM turma WHERE modalidade_turma IS NOT NULL) * 100 AS percentual_matriculas FROM turma INNER JOIN curso ON turma.fkcodigo_curso = curso.codigo_curso WHERE turma.modalidade_turma IS NOT NULL AND curso.fkcodigo_instituicao = '${idUnidade}' GROUP BY curso.codigo_curso, curso.nome_curso), ranking AS (SELECT *, RANK() OVER (ORDER BY total_evasao DESC) AS posicao_ranking FROM evasao_por_curso)' SELECT posicao_ranking, nome_curso, total_ingressantes, total_permanentes, total_evasao, ROUND(total_evasao * 100.0 / total_ingressantes, 2) AS taxa_evasao_percentual, ROUND(percentual_matriculas, 2) AS percentual_matriculas FROM ranking WHERE nome_curso = '${nomeCurso}' ORDER BY posicao_ranking;
  `;
  console.log("Execurando a instrução SQL: \n" + buscarRankingFiltrado);
  return database.executar(buscarRankingFiltrado);
}

function buscarKPIfiltrada(nomeCurso, idUnidade) {
  var buscarKPIfiltrada = `WITH dados_curso_turno AS (SELECT turma.turno_turma, SUM(turma.qtd_ingressantes - turma.qtd_alunos_permanencia) AS total_evasao, SUM(turma.qtd_alunos_permanencia) AS total_matriculados FROM turma INNER JOIN curso ON turma.fkcodigo_curso = curso.codigo_curso WHERE curso.nome_curso = '${nomeCurso}' AND turma.modalidade_turma IS NOT NULL AND curso.fkcodigo_instituicao = '${idUnidade}' GROUP BY turma.turno_turma), maior_evasao_turno AS (SELECT turno_turma, total_evasao, total_matriculados FROM dados_curso_turno WHERE total_evasao = (SELECT MAX(total_evasao) FROM dados_curso_turno)), dados_curso_modalidade AS (SELECT turma.modalidade_turma, SUM(turma.qtd_ingressantes - turma.qtd_alunos_permanencia) AS total_evasao, SUM(turma.qtd_alunos_permanencia) AS total_matriculados FROM turma INNER JOIN curso ON turma.fkcodigo_curso = curso.codigo_curso WHERE curso.nome_curso = '${nomeCurso}' AND turma.modalidade_turma IS NOT NULL AND curso.fkcodigo_instituicao = '${idUnidade}' GROUP BY turma.modalidade_turma), maior_evasao_modalidade AS (SELECT modalidade_turma, total_evasao, total_matriculados FROM dados_curso_modalidade WHERE total_evasao = (SELECT MAX(total_evasao) FROM dados_curso_modalidade)) SELECT maior_evasao_turno.turno_turma AS turno_maior_evasao, maior_evasao_turno.total_evasao AS total_evasao_turno, maior_evasao_turno.total_matriculados AS matriculados_turno, maior_evasao_modalidade.modalidade_turma AS modalidade_maior_evasao, maior_evasao_modalidade.total_evasao AS total_evasao_modalidade, maior_evasao_modalidade.total_matriculados AS matriculados_modalidade FROM maior_evasao_turno CROSS JOIN maior_evasao_modalidade;`;
  console.log("Execurando a instrução SQL: \n" + buscarKPIfiltrada);
  return database.executar(buscarKPIfiltrada);
}

function buscarDadosFiltrados(nomeCurso, idUnidade) {
  var buscarDadosFiltrados = `SELECT COUNT(CASE WHEN modalidade_turma = 'Online' THEN 1 END) AS total_online, COUNT(CASE WHEN modalidade_turma = 'Presencial' THEN 1 END) AS total_presencial, COUNT(CASE WHEN turno_turma = 'Matutino' THEN 1 END) AS total_matutino, COUNT(CASE WHEN turno_turma = 'Vespertino' THEN 1 END) AS total_vespertino, COUNT(CASE WHEN turno_turma = 'Noturno' THEN 1 END) AS total_noturno, SUM(CASE WHEN modalidade_turma = 'Online' THEN qtd_alunos_permanencia ELSE 0 END) AS matriculas_online SUM(CASE WHEN modalidade_turma = 'Presencial' THEN qtd_alunos_permanencia ELSE 0 END) AS matriculas_presencial, SUM(CASE WHEN turno_turma = 'Matutino' THEN qtd_alunos_permanencia ELSE 0 END) AS matriculas_matutino SUM(CASE WHEN turno_turma = 'Vespertino' THEN qtd_alunos_permanencia ELSE 0 END) AS matriculas_vespertino SUM(CASE WHEN turno_turma = 'Noturno' THEN qtd_alunos_permanencia ELSE 0 END) AS matriculas_noturno FROM turma JOIN curso ON turma.fkcodigo_curso = curso.codigo_curso WHERE curso.nome_curso = '${nomeCurso}' AND curso.fkcodigo_instituicao = '${idUnidade}';
  `;
  console.log("Execurando a instrução SQL: \n" + buscarDadosFiltrados);
  return database.executar(buscarDadosFiltrados);
}

function buscarMensalidadesFiltrados(nomeCurso, idUnidade) {
  var buscarMensalidadesFiltrados = `SELECT turma.ano_turma,   turma.turno_turma, turma.modalidade_turma, turma.mensalidade_turma FROM turma JOIN curso ON turma.fkcodigo_curso = curso.codigo_curso WHERE curso.nome_curso = '${nomeCurso}' AND curso.fkcodigo_instituicao = '${idUnidade}' AND turma.modalidade_turma IS NOT NULL ORDER BY turma.ano_turma;`;
  console.log("Execurando a instrução SQL: \n" + buscarMensalidadesFiltrados);
  return database.executar(buscarMensalidadesFiltrados);
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
  buscarMensalidadesFiltrados,
};
