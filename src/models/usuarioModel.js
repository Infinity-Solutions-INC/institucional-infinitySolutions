var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucaoSql = `
        SELECT codigo_funcionario, nome_funcionario, cpf_funcionario, email_funcionario, cargo_funcionario, senha_funcionario, status_funcionario, fkcodigo_unidade FROM funcionario WHERE email_funcionario = '${email}' AND senha_funcionario = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarUsuario(codigoAcesso, cpf) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", cpf, codigoAcesso)
    var instrucaoSql = `
        SELECT codigo_funcionario, nome_funcionario, cpf_funcionario, email_funcionario, cargo_funcionario, senha_funcionario, status_funcionario, fkcodigo_unidade FROM funcionario WHERE codigo_funcionario = '${codigoAcesso}' AND cpf_funcionario = '${cpf}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(nome, cpf, codigoAcesso, cargo) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, cpf, codigoAcesso, cargo);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO funcionario (codigo_funcionario, cpf_funcionario, cargo_funcionario, nome_funcionario, status_funcionario, fkcodigo_unidade) VALUES ('${codigoAcesso}', '${cpf}', '${cargo}', '${nome}', 'aguardando verificação', 1000);
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function atualizarCadastro(codigoAcesso, email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", email, senha, codigoAcesso);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        UPDATE funcionario
        SET email_funcionario = '${email}', 
            senha_funcionario = '${senha}', 
            status_funcionario = 'ativo'
        WHERE codigo_funcionario = '${codigoAcesso}';`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarUsuariosUnidade(codigoUnidade){
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", codigoUnidade);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        SELECT codigo_funcionario, nome_funcionario, cpf_funcionario, email_funcionario, cargo_funcionario, senha_funcionario, status_funcionario, fkcodigo_unidade FROM funcionario WHERE fkcodigo_unidade = ${codigoUnidade} ORDER BY codigo_funcionario DESC;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarUsuariosCodigo(codigoFuncionario){
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", codigoFuncionario);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        SELECT codigo_funcionario, nome_funcionario, cpf_funcionario, email_funcionario, cargo_funcionario, senha_funcionario, status_funcionario, fkcodigo_unidade FROM funcionario WHERE codigo_funcionario = '${codigoFuncionario}';
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function excluirUsuario(codigoFuncionario){
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function excluir():", codigoFuncionario);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        UPDATE funcionario
        SET  status_funcionario = 'bloqueado'
        WHERE codigo_funcionario = '${codigoFuncionario}';`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    cadastrar,
    buscarUsuario,
    atualizarCadastro,
    buscarUsuariosUnidade,
    buscarUsuariosCodigo,
    excluirUsuario
};