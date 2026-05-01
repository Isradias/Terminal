const express = require("express"); //express vira a classe, require é o import
const app = express(); // express() cria e retorna o objeto, app vira objeto
const path = require("path"); //trabalha caminhos rel e abs, ja vem com o node
const Sequelize = require("sequelize");
const sequelize = new Sequelize("postgres", "postgres", "3381", {
	host: "localhost",
	dialect: "postgres"
});

app.get("/", function (req, res) {
	res.sendFile(path.join(__dirname, "../Front/index.html"));
});

app.get("/cadastrar", async function (req, res) {
    try {
        await sequelize.query(`
            INSERT INTO cadastro (nome, sobrenome, idade, email, senha)
            VALUES ('Israel', 'Dias', 25, 'israelcaldas10@.com', '123')
        `);

        res.send("Inserido direto no SQL 😎");

    } catch (err) {
        console.log(err);
        res.status(500).send("Deu ruim 😢");
    }
});
//Função de callback é executada sempre que um evento acontece
//A maioria das funções do express tem callback
//No caso da função abaixo é essa arrow function
app.listen(3000, function () {
	console.log("Rodando na porta 3000");
});
