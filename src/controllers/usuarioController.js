var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

       
        usuarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1 && resultadoAutenticar[0].status_funcionario == "ativo" || resultadoAutenticar[0].status_funcionario == "master") {
                        console.log(resultadoAutenticar);
                        res.json({
                            codigo_funcionario: resultadoAutenticar[0].codigo_funcionario,
                            nome_funcionario: resultadoAutenticar[0].nome_funcionario,
                            cpf_funcionario: resultadoAutenticar[0].cpf_funcionario,
                            cargo_funcionario: resultadoAutenticar[0].nome_cargo,
                            senha_funcionario: resultadoAutenticar[0].senha_funcionario,
                            email_funcionario: resultadoAutenticar[0].email_funcionario,
                            status_funcionario: resultadoAutenticar[0].status_funcionario,
                            fkcodigo_instituicao: resultadoAutenticar[0].fkcodigo_instituicao
                        });

                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

    function buscarUsuariosUnidade(req, res){
        var codigoInstituicao = req.body.codigoInstituicaoServer;
  
        usuarioModel.buscarUsuariosUnidade(codigoInstituicao).then((resultado) => {
          if (resultado.length > 0) {
            res.status(200).json(resultado);
          } else {
            res.status(204).json([]);
          }
        }).catch(function (erro) {
          console.log(erro);
          console.log("Houve um erro ao buscar os aquarios: ", erro.sqlMessage);
          res.status(500).json(erro.sqlMessage);
        });
    }

    function buscarUsuariosCodigo(req, res){
        var codigoFuncionario = req.body.codigoFuncionarioServer;
  
        usuarioModel.buscarUsuariosCodigo(codigoFuncionario).then((resultado) => {
          if (resultado.length > 0) {
            usuarioModel.excluirUsuario(codigoFuncionario)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
          } else {
            res.status(204).json([]);
          }
        }).catch(function (erro) {
          console.log(erro);
          console.log("Houve um erro ao buscar os aquarios: ", erro.sqlMessage);
          res.status(500).json(erro.sqlMessage);
        });
    }

function validarUsuario(req, res) {
    var cpf = req.body.cpfServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var codigoAcesso = req.body.codigoAcessoServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else if (cpf == undefined) {
        res.status(400).send("Seu cpf está indefinido!");
    } else if (codigoAcesso == undefined) {
        res.status(400).send("Seu codigo está indefinido!");
    }   else {

       
        usuarioModel.buscarUsuario(codigoAcesso, cpf)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);
                        
                        usuarioModel.atualizarCadastro(codigoAcesso, email, senha)
                        .then(
                            function (resultado) {
                                res.json(resultado);
                            }
                        ).catch(
                            function (erro) {
                                console.log(erro);
                                console.log(
                                    "\nHouve um erro ao realizar o cadastro! Erro: ",
                                    erro.sqlMessage
                                );
                                res.status(500).json(erro.sqlMessage);
                            }
                        );

                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Codigo e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var cpf = req.body.cpfServer;
    var cargo = req.body.cargoServer;
    var codigoAcesso = req.body.codigoAcessoServer;

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (codigoAcesso == undefined) {
        res.status(400).send("Seu codigo acesso está undefined!");
    } else if (cargo == undefined) {
        res.status(400).send("Seu cargo está undefined!");
    } else if (cpf == undefined) {
        res.status(400).send("Seu cpf está undefined!");
    } else {
        console.log("cheguei aqui");
        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(nome, cpf, codigoAcesso, cargo)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function atualizarUsuario(req, res) {
    var nome = req.body.nomeServer;
    var cpf = req.body.cpfServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var codigoAcesso = req.body.codigoAcessoServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else if (cpf == undefined) {
        res.status(400).send("Seu cpf está indefinido!");
    } else if (codigoAcesso == undefined) {
        res.status(400).send("Seu codigo está indefinido!");
    }   else {

       
        usuarioModel.buscarUsuario(codigoAcesso, cpf)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);
                        
                        usuarioModel.atualizarCadastro(codigoAcesso, email, senha)
                        .then(
                            function (resultado) {
                                res.json(resultado);
                            }
                        ).catch(
                            function (erro) {
                                console.log(erro);
                                console.log(
                                    "\nHouve um erro ao realizar o cadastro! Erro: ",
                                    erro.sqlMessage
                                );
                                res.status(500).json(erro.sqlMessage);
                            }
                        );

                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Codigo e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

module.exports = {
    autenticar,
    cadastrar,
    validarUsuario,
    buscarUsuariosUnidade,
    buscarUsuariosCodigo,
    atualizarUsuario
}