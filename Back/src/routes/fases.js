import express from "express";
import sql from "../../db.js";
import session from "express-session";
import logged from "./utils.js"

const router = express.Router();

router.get("/nivel", async function (req, res) {
	if (!logged(req, res)) return;

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
	if (!logged(req, res)) return;

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

router.put("/reset", async function (req, res) {
	if (!logged(req, res)) return;

	try {
		const email = req.session.user.email;
		const get_result = await sql`
			SELECT nivel FROM usuarios WHERE email = ${email}
		`;

		const put_result = await sql`
			UPDATE usuarios SET nivel = 0, primeiro_acesso = TRUE WHERE email = ${email}
		`;

		return res.json({ nivel: 0 });
	} catch (err) {
		console.log(err);
	}
})

router.get("/get_user", async function (req, res) {
	if (!logged(req, res)) return;

	try {
		const email = req.session.user.email;
		const result = await sql`
			SELECT nick, nivel FROM usuarios WHERE email = ${email}
		`;
		return res
			.status(200)
			.send({ nick: result[0].nick, nivel: result[0].nivel });
	} catch (err) {
		console.log(err);
		return res.send("Erro ao buscar usuario");
	}
});

export default router;
