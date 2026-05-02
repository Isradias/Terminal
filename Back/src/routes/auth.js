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

		res.send("Cadastro realizado!");
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

		if (!valido) {
			return res.status(400).send("Token inválido");
		}

		await sql`
			UPDATE usuarios
			SET verificado = true, token = NULL
			WHERE email = ${email}
		`;

		res.send("Conta verificada!");
	} catch {
		res.status(500).send("Erro");
	}
});

export default router;
