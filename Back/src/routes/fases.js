import express from "express";
import sql from "../../db.js";
import session from "express-session";

const router = express.Router();

router.get("/nivel", async function (req, res) {
	if (!req.session.user) {
		// TODO: Criar uma página para os espertinhos não autenticados
		return res.status(401).send("Não autenticado");
	}

	try {
		const email = req.session.user.email;
		const result = await sql`
		SELECT nivel FROM usuarios WHERE email = ${email}
        `;
		return res.status(200).send({ nivel: result[0].nivel });
	} catch (err) {
		res.status(500).send(err);
	}
});

router.put("/subir_nivel", async function (req, res) {
	if (!req.session.user) {
		// TODO: Criar uma página para os espertinhos não autenticados
		return res.status(401).send("Não autenticado");
	}

	try {
		const email = req.session.user.email;
		const get_result = await sql`
			SELECT nivel FROM usuarios WHERE email = ${email}
		`;

		const nivel_atual = Number(get_result[0].nivel);
		const nivel_novo = nivel_atual + 1;

		const put_result = await sql`
			UPDATE usuarios SET nivel = ${nivel_novo} WHERE email = ${email}
		`;

		return res.json({ nivel: nivel_novo });
	} catch (err) {
		console.log(err);
	}
});

export default router;
