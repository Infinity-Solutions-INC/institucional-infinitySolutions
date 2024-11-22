var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucaoSql = `
        SELECT funcionario.codigo_funcionario, funcionario.nome_funcionario, funcionario.cpf_funcionario, funcionario.email_funcionario, cargo.nome_cargo, funcionario.senha_funcionario, funcionario.status_funcionario, funcionario.fkcodigo_instituicao FROM funcionario
        INNER JOIN cargo on codigo_cargo = fkcodigo_cargo
        WHERE funcionario.email_funcionario = '${email}' AND funcionario.senha_funcionario = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarUsuario(codigoAcesso, cpf) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", cpf, codigoAcesso)
    var instrucaoSql = `
        SELECT codigo_funcionario, nome_funcionario, cpf_funcionario, email_funcionario, fkcodigo_cargo, senha_funcionario, status_funcionario, fkcodigo_instituicao FROM funcionario WHERE codigo_funcionario = '${codigoAcesso}' AND cpf_funcionario = '${cpf}';
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
        INSERT INTO funcionario (codigo_funcionario, cpf_funcionario, fkcodigo_cargo, nome_funcionario, status_funcionario, fkcodigo_instituicao) VALUES ('${codigoAcesso}', '${cpf}', ${cargo}, '${nome}', 'aguardando verificação', 100);
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

function atualizarUsuario(codigoAcesso, email, nome) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", email, nome, codigoAcesso);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        UPDATE funcionario
        SET email_funcionario = '${email}', 
            nome_funcionario = '${nome}'
        WHERE codigo_funcionario = '${codigoAcesso}';`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarUsuariosUnidade(codigoInstituicao){
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", codigoInstituicao);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        SELECT funcionario.codigo_funcionario, funcionario.nome_funcionario, funcionario.cpf_funcionario, funcionario.email_funcionario, cargo.nome_cargo, funcionario.senha_funcionario, funcionario.status_funcionario, funcionario.fkcodigo_instituicao FROM funcionario 
        INNER JOIN cargo on  codigo_cargo = funcionario.fkcodigo_cargo
        WHERE fkcodigo_instituicao = ${codigoInstituicao} 
        ORDER BY codigo_funcionario DESC;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarUsuariosCodigo(codigoFuncionario){
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", codigoFuncionario);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        SELECT codigo_funcionario, nome_funcionario, cpf_funcionario, email_funcionario, cargo_funcionario, senha_funcionario, status_funcionario, fkcodigo_instituicao FROM funcionario WHERE codigo_funcionario = '${codigoFuncionario}';
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
    excluirUsuario,
    atualizarUsuario
};