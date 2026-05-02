import express from "express";
import path from "path";
import sql from "./db.js";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import crypto from "crypto";

const app = express();
app.use(express.static(path.resolve("../Front")));
app.use(express.json());

const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASS,
	},
});

async function enviarEmail(destino, token) {
	await transporter.sendMail({
		from: '"Terminal_os" <terminal_online_saga@gmail.com>',
		to: destino,
		subject: "[Terminal_os] Autenticação necessária",
		html: `
			<h2>🖥️ Terminal_os</h2>
			<p>> Usuário detectado, mas não autenticado.</p>

			<p>Para continuar, confirme sua identidade:</p>

			<a href="http://localhost:3000/verificar?email=${destino}&token=${token}" style="
				background:black;
				color:#00ff00;
				padding:10px;
				text-decoration:none;
				font-family:monospace;
			">
				VERIFICAR ACESSO
			</a>

			<p>Se você não reconhece esta tentativa, ignore este email.</p>
		`
	});
}

app.get("/", function (req, res) {
	res.sendFile(path.resolve("../Front/Home/index.html"));
});

app.get("/cadastro", function (req, res) {
	res.sendFile(path.resolve("../Front/Cadastro/cadastro.html"));
});

app.post("/cadastrar", async function (req, res) {
	const { nick, email, senha } = req.body;

	const hash_senha = await bcrypt.hash(senha, 10);
	try {
		const result = await sql`
			SELECT email FROM usuarios WHERE email = ${email}
		`;
		if (result.length > 0) {
			res.status(400).send("Email já cadastrado");
			return;
		}
		const token = crypto.randomBytes(32).toString("hex");
		const hash_token = await bcrypt.hash(token, 10);
		await sql`
		INSERT INTO usuarios (nick, email, senha, token)
		VALUES (${nick}, ${email}, ${hash_senha}, ${hash_token})
        `;
		enviarEmail(email, token);
		res.status(200).send("Cadastro realizado com sucesso!");
	} catch (err) {
		console.log(err);
		res.status(500).send("Erro no cadastro");
	}
});

app.get("/verificar", async (req, res) => {
	const email = req.query.email;
	const token = req.query.token;

	try {
		const user = await sql`
			SELECT * FROM usuarios WHERE email = ${email}
		`;

		if (user.length === 0) {
			return res.status(400).send("Email inválido");
		}

		const valido = await bcrypt.compare(token, user[0].token)
		if (valido){
			await sql`
			UPDATE usuarios
			SET verificado = true,
			token = NULL
			WHERE email = ${email}
			`;
			res.send("Conta verificada com sucesso!");
		} else {
			res.status(400).send("Token inválido");
		}

	} catch (err) {
		console.log(err);
		res.status(500).send("Erro no servidor");
	}
});

app.get("/delete", async function (req, res) {
	try {
		await sql`
            TRUNCATE TABLE usuarios
        `;
		res.send(`
			<script>
				alert("Tabela limpa");
				window.location.href = "/cadastro";
			</script>
		`);
	} catch (err) {
		console.log(err);
		res.status(500).send("Erro ao deletar");
	}
});

app.listen(3000, function () {
	console.log("Rodando na porta 3000");
});
