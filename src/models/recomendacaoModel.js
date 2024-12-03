var database = require("../database/config")

function listarRecomendacoes(codigoInstituicao){
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", codigoInstituicao);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        select DATE_FORMAT(dt_hr_recomendacao_recebida, '%d/%m/%Y') AS data_formatada, 
        LEFT(descricao_recomendacao_recebida, 25) AS descricao_recomendacao_recebida
        from recomendacao_recebida
        inner join instituicao on instituicao.codigo_instituicao = recomendacao_recebida.fkcodigo_instituicao
        where instituicao.codigo_instituicao = ${codigoInstituicao}
        order by data_formatada DESC;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function ultimaRecomendacao(codigoInstituicao){
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function ultima recomendacao(): ", codigoInstituicao)
    var instrucaoSql = `
       select DATE_FORMAT(dt_hr_recomendacao_recebida, '%d/%m/%Y') AS data_formatada, 
        TIMESTAMPDIFF(MINUTE, dt_hr_recomendacao_recebida, NOW()) as tempo_decorrido,
        descricao_recomendacao_recebida
        from recomendacao_recebida
        inner join instituicao on instituicao.codigo_instituicao = recomendacao_recebida.fkcodigo_instituicao
        where instituicao.codigo_instituicao = 100
        order by data_formatada DESC limit 1;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    listarRecomendacoes,
    ultimaRecomendacao
};