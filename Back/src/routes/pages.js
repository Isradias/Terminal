import express from "express";
import path from "path";
import session from "express-session";
import logged from "./utils.js"
import sql from "../../db.js";

const router = express.Router();

router.get("/", (req, res) => {
	res.sendFile(path.resolve("../Front/Home/home.html"));
});

router.get("/cadastro", (req, res) => {
	res.sendFile(path.resolve("../Front/Cadastro/cadastro.html"));
});

router.get("/apresentacao", async (req, res) => {
	if (!logged(req, res)) return;

	try {
		const email = req.session.user.email;

		await sql`
			UPDATE usuarios
			SET primeiro_acesso = false
			WHERE email = ${email}
		`;

		res.sendFile(
			path.resolve("../Front/PrimeiroAcesso/primeiro_acesso.html")
		);
	} catch (error) {
		console.log(erro);
		res.status(400).send("Erro");
	}
});

router.get("/fases", (req, res) => {
	if (!logged(req, res)) return
	res.sendFile(path.resolve("../Front/Fases/hub.html"));
});

router.get("/protocolo_01", (req, res) => {
	if (!logged(req, res)) return
	res.sendFile(path.resolve("../Front/Fases/Missoes/Missao01/index.html"));
})

export default router;
