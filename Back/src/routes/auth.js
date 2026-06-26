import express from "express";
import bcrypt from "bcrypt";
import crypto from "crypto";
import sql from "../../db.js";
import { enviarEmail } from "../services/email.js";

const router = express.Router();

router.post("/cadastrar", async (req, res) => {
	const { nick, email, senha } = req.body;

    // --- REGRAS DE VALIDAÇÃO (ESPELHADAS DO FRONT) ---

    // 1. Verifica se campos estão vazios ou são apenas espaços
    if (!nick || !email || !senha || nick.trim() === "" || email.trim() === "") {
        return res.status(400).send("Todos os campos devem ser preenchidos.");
    }

	// 1. Verifica se campos estão vazios ou são apenas espaços
	if (
		!nick ||
		!email ||
		!senha ||
		nick.trim() === "" ||
		email.trim() === ""
	) {
		return res.status(400).send("Todos os campos devem ser preenchidos.");
	}

	// 2. Validação de Nick (mínimo 3 caracteres)
	if (nick.trim().length < 3) {
		return res.status(400).send("O Nick deve ter pelo menos 3 caracteres.");
	}

	// 3. Validação de formato de E-mail
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailRegex.test(email)) {
		return res.status(400).send("O e-mail fornecido é inválido.");
	}

	// 4. Validação de Senha Forte (Mínimo 8 caracteres, letras e números)
	const senhaRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
	if (!senhaRegex.test(senha)) {
		return res
			.status(400)
			.send(
				"A senha deve ter no mínimo 8 caracteres, incluindo letras e números.",
			);
	}

	try {
		// Verifica se o e-mail já existe no banco
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

		await enviarEmail(email, token);

		res.send(
			"Cadastro realizado! Por favor, verifique seu email para autenticação do usuário",
		);
	} catch (err) {
		console.error(err);
		res.status(500).send("Erro interno ao processar cadastro");
	}
});

// As outras rotas (/verificar, /validate_login, etc.) continuam iguais abaixo...
// [Mantendo o restante do seu código original]

router.get("/verificar", async (req, res) => {
	const { email, token } = req.query;
	try {
		const user = await sql`SELECT * FROM usuarios WHERE email = ${email}`;
		if (user.length === 0) return res.status(400).send("Email inválido");

		const valido = await bcrypt.compare(token, user[0].token);
		if (valido) {
			await sql`UPDATE usuarios SET verificado = true, token = NULL WHERE email = ${email}`;
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
		const usuario =
			await sql`SELECT * FROM usuarios WHERE email = ${email}`;
		if (usuario.length === 0)
			return res.status(401).send("Email ou senha incorretos");
		if (usuario[0].verificado == false) {
			return res
				.status(403)
				.send("Verifique o email na caixa de entrada ou spam");
		}
		const validate = await bcrypt.compare(senha, usuario[0].senha);
		if (validate) {
			req.session.user = {
				email: usuario[0].email,
			};

			req.session.save((err) => {
				if (err) {
					return res.status(500).send("Erro ao salvar sessão");
				}

				return res.json({
					primeiro_acesso: usuario[0].primeiro_acesso,
				});
			});
		} else {
			return res.status(401).send("Email ou senha incorretos");
		}
	} catch (err) {
		console.log(err);
		res.status(500).send("Erro");
	}
});

router.post("/logout", (req, res) => {
	req.session.destroy(() => res.sendStatus(200));
});

// TODO: Precisa apagar isso aqui :)
router.get("/delete", async function (req, res) {
	try {
		await sql`TRUNCATE TABLE usuarios`;
		res.send(
			`<script>alert("Tabela limpa"); window.location.href = "/cadastro";</script>`,
		);
	} catch (err) {
		res.status(500).send("Erro ao deletar");
	}
});

export default router;
