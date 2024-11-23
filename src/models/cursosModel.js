var database = require("../database/config")

function buscarCursosPorUnidade(idUnidade) {
    var buscarCursos = `SELECT codigo_curso, nome_curso, ano_curso FROM curso WHERE fkcodigo_instituicao = ${idUnidade}`

    console.log("Executando a instrução SQL: \n" + buscarCursos);
    return database.executar(buscarCursos);
}

function cadastrarCurso(nomeCurso, anoCurso, idUnidade) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarCurso(): ", nomeCurso, anoCurso, idUnidade)

    var cadastroCurso = `INSERT INTO curso (nome_curso, ano_curso, fkcodigo_instituicao, fkcodigo_area) VALUES ('${nomeCurso}', '${anoCurso}', '${idUnidade}', null)`;

    console.log("Executando a instrução SQL: \n" + cadastroCurso);
    return database.executar(cadastroCurso);
}

function editarCurso(idCurso, nomeCurso, anoCurso, idUnidade) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editarCurso(): ", idCurso, nomeCurso, anoCurso, idUnidade)

    var editarCurso = `UPDATE curso 
      SET nome_curso = '${nomeCurso}', ano_curso = '${anoCurso}'
      WHERE codigo_curso = '${idCurso}' AND fkcodigo_instituicao = '${idUnidade}'`;

    console.log("Executando a instrução SQL: \n" + editarCurso);
    return database.executar(editarCurso);
}

function deletarCurso(idCurso, idUnidade) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editarCurso(): ", idCurso, idUnidade)

    var deletarCurso = `DELETE FROM curso
      WHERE codigo_curso = '${idCurso}' AND fkcodigo_instituicao = '${idUnidade}'`;

    console.log("Executando a instrução SQL: \n" + deletarCurso);
    return database.executar(deletarCurso);
}


module.exports = {
    buscarCursosPorUnidade,
    cadastrarCurso,
    editarCurso,
    deletarCurso
}