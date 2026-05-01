import express from "express";
import path from "path";
import sql from "./db.js";
import bcrypt from "bcrypt";

const app = express();
app.use(express.static(path.resolve("../Front")));
app.use(express.json());

app.get("/", function (req, res) {
	res.sendFile(path.resolve("../Front/Home/index.html"));
});

app.get("/cadastro", function (req, res) {
	res.sendFile(path.resolve("../Front/Cadastro/cadastro.html"));
});

app.post("/cadastrar", async function (req, res) {
	const {nick, email, senha} = req.body

	const hash = await bcrypt.hash(senha, 10);
	try {
		await sql`
            INSERT INTO usuarios (nick, email, senha)
            VALUES (${nick}, ${email}, ${hash})
        `;
		res.send("Cadastro realizado com sucesso!");
	} catch (err) {
		console.log(err);
		res.status(500).send("Deu ruim 😢");
	}
});

app.get("/delete", async function (req, res) {
	try {
		await sql`
            TRUNCATE TABLE usuarios
        `;
		res.send("<h1>Tudo deletado</h1>");
	} catch (err) {
		console.log(err);
		res.status(500).send("Erro ao deletar");
	}
});

app.listen(3000, function () {
	console.log("Rodando na porta 3000");
});
