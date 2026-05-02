import express from "express";
import bcrypt from "bcrypt";
import crypto from "crypto";
import sql from "../../db.js";
import { enviarEmail } from "../services/email.js";

const router = express.Router();

router.post("/cadastrar", async (req, res) => {
	const { nick, email, senha } = req.body;

	try {
		const existe = await sql`
			SELECT email FROM usuarios WHERE email = ${email}
		`;

		if (existe.length > 0) {
			return res.status(400).send("Email já cadastrado");
		}

		const hash_senha = await bcrypt.hash(senha, 10);
		const token = crypto.randomBytes(32).toString("hex");
		const hash_token = await bcrypt.hash(token, 10);

		await sql`
			INSERT INTO usuarios (nick, email, senha, token)
			VALUES (${nick}, ${email}, ${hash_senha}, ${hash_token})
		`;

		enviarEmail(email, token);

		res.send(
			"Cadastro realizado! Por favor, verifique seu email para autenticação do usuário",
		);
	} catch (err) {
		res.status(500).send("Erro");
	}
});

router.get("/verificar", async (req, res) => {
	const { email, token } = req.query;

	try {
		const user = await sql`
			SELECT * FROM usuarios WHERE email = ${email}
		`;

		if (user.length === 0) {
			return res.status(400).send("Email inválido");
		}

		const valido = await bcrypt.compare(token, user[0].token);

		if (valido) {
			await sql`
				UPDATE usuarios
				SET verificado = true, token = NULL
				WHERE email = ${email}
				`;
			res.send("Conta verificada!");
		} else {
			return res.status(400).send("Token inválido");
		}
	} catch {
		res.status(500).send("Erro");
	}
});

router.post("/validate_login", async function (req, res) {
	const { email, senha } = req.body;

	try {
		const usuario = await sql`
		SELECT * FROM usuarios WHERE email = ${email}
		`;
		if (usuario.length === 0) {
			return res.status(401).send("Email ou senha incorretos");
		}
		if (usuario[0].verificado == false) {
			return res
				.status(403)
				.send("Verifique o email na caixa de entrada ou spam");
		}

		const validate = await bcrypt.compare(senha, usuario[0].senha);
		if (validate) {
			return res.status(200).send("Acesso permitido");
		} else {
			return res.status(401).send("Email ou senha incorretos");
		}
	} catch (err) {
		res.status(500).send("Erro");
	}
});

// TODO: Precisa apagar isso aqui :)
router.get("/delete", async function (req, res) {
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

export default router;
