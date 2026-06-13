import express from "express";
import bcrypt from "bcrypt";
import crypto from "crypto";
import sql from "../../db.js";
import { enviarEmail } from "../services/email.js";
import qrcode from "qrcode";
import { gerarSegredo, verificarCodigo } from "../services/twofa.js";


let segredoTemp = {}; // guardar segredo por usuário


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

		res.send("Cadastro realizado! Verifique seu email");
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

router.post("/validate_login", async (req, res) => {
	const { email, senha } = req.body;

	try {
		const usuario = await sql`
			SELECT * FROM usuarios WHERE email = ${email}
		`;

		if (usuario.length === 0) {
			return res.status(401).send("Email ou senha incorretos");
		}

		if (!usuario[0].verificado) {
			return res.status(403).send("Verifique seu email");
		}

		const validate = await bcrypt.compare(senha, usuario[0].senha);

		if (!validate) {
			return res.status(401).send("Email ou senha incorretos");
		}

	
await sql`
UPDATE usuarios
SET secret_2fa = ${secret.base32}
WHERE email = ${email}
`;
		if (usuario[0].twofa_ativo) {
    return res.json({
        msg: "2FA necessário",
        twofa: true,
        email
    });
} else {
    return res.json({
        msg: "Login completo",
        twofa: false
    });
}

		

		return res.json({
			msg: "Escaneie o QR Code no Google Authenticator",
			qrCode,
			email
		});

	} catch (err) {
		res.status(500).send("Erro");
	}
});

router.post("/2fa/verify", (req, res) => {
	const { email, token } = req.body;
const usuario = await sql`
    SELECT secret_2fa FROM usuarios WHERE email = ${email}
`;

const valido = verificarCodigo(
    usuario[0].secret_2fa,
    token
);

	if (!segredo) {
		return res.status(400).send("2FA não iniciado");
	}

	const valido = verificarCodigo(segredo, token);

	if (valido) {
		delete segredoTemp[email]; // limpa

		return res.send("Login completo ✅");
	} else {
		return res.status(401).send("Código inválido ❌");
	}
});

router.get("/delete", async (req, res) => {
	try {
		await sql`TRUNCATE TABLE usuarios`;

		res.send(`
			<script>
				alert("Tabela limpa");
				window.location.href = "/cadastro";
			</script>
		`);
	} catch (err) {
		res.status(500).send("Erro ao deletar");
	}
});

export default router;

router.post("/2fa/ativar", async (req, res) => {
    const { email } = req.body;

    const secret = gerarSegredo();

    await sql`
        UPDATE usuarios
        SET 
            twofa_ativo = true,
            secret_2fa = ${secret.base32}
        WHERE email = ${email}
    `;

    const qrCode = await qrcode.toDataURL(secret.otpauth_url);

    res.json({ qrCode });
});

router.post("/2fa/desativar", async (req, res) => {
    const { email } = req.body;

    await sql`
        UPDATE usuarios
        SET 
            twofa_ativo = false,
            secret_2fa = NULL
        WHERE email = ${email}
    `;

    res.send("2FA desativado");
});
router.get("/status-2fa", async (req, res) => {
  const { email } = req.query;

  const user = await sql`
    SELECT twofa_ativo FROM usuarios WHERE email = ${email}
  `;

  res.json({ twofa_ativo: user[0].twofa_ativo });
});