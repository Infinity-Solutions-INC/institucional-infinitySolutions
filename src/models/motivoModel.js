var database = require("../database/config")

function buscarDadosGraficosEvasao(codigo_instituicao) {
    var instrucaoSql = `
        SELECT 
            turma.ano_turma,
            COALESCE(evasao_turno.qtd_evasao_turno, 0) AS qtd_evasao_turno,
            COALESCE(evasao_mensalidade.qtd_evasao_mensalidade, 0) AS qtd_evasao_mensalidade,
            COALESCE(evasao_espubli.qtd_evasao_espubli, 0) AS qtd_evasao_espubli
        FROM (
            SELECT DISTINCT ano_turma
            FROM turma
        ) AS turma
        LEFT JOIN (
            SELECT 
                turma.ano_turma, 
                SUM(turma.qtd_ingressantes - turma.qtd_alunos_permanencia) AS qtd_evasao_turno
            FROM turma
            INNER JOIN curso ON curso.codigo_curso = turma.fkcodigo_curso
            INNER JOIN instituicao ON instituicao.codigo_instituicao = curso.fkcodigo_instituicao
            WHERE instituicao.codigo_instituicao = 100 
              AND turma.turno_turma IN ('Matutino', 'Vespertino')
            GROUP BY turma.ano_turma
        ) AS evasao_turno ON turma.ano_turma = evasao_turno.ano_turma
        LEFT JOIN (
            SELECT 
                turma.ano_turma, 
                SUM(turma.qtd_ingressantes - turma.qtd_alunos_permanencia) AS qtd_evasao_mensalidade
            FROM turma
            INNER JOIN curso ON curso.codigo_curso = turma.fkcodigo_curso
            INNER JOIN instituicao ON instituicao.codigo_instituicao = curso.fkcodigo_instituicao
            WHERE instituicao.codigo_instituicao = 100 
              AND turma.mensalidade_turma > 927.00
            GROUP BY turma.ano_turma
        ) AS evasao_mensalidade ON turma.ano_turma = evasao_mensalidade.ano_turma
        LEFT JOIN (
            SELECT 
                turma.ano_turma, 
                ROUND(SUM(turma.qtd_ingressantes - turma.qtd_alunos_permanencia) * 0.67, 0) AS qtd_evasao_espubli
            FROM turma
            INNER JOIN curso ON curso.codigo_curso = turma.fkcodigo_curso
            INNER JOIN instituicao ON instituicao.codigo_instituicao = curso.fkcodigo_instituicao
            WHERE instituicao.codigo_instituicao = 100 
              AND turma.modalidade_turma IS NOT NULL
            GROUP BY turma.ano_turma
        ) AS evasao_espubli ON turma.ano_turma = evasao_espubli.ano_turma
        ORDER BY turma.ano_turma DESC
        LIMIT 7;
    `;
    console.log(codigo_instituicao);
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarDadosGraficosEvasao
};