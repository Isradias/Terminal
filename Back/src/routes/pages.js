import express from "express";
import path from "path";
import session from "express-session";

const router = express.Router();

router.get("/", (req, res) => {
	res.sendFile(path.resolve("../Front/Home/home.html"));
});

router.get("/cadastro", (req, res) => {
	res.sendFile(path.resolve("../Front/Cadastro/cadastro.html"));
});

router.get("/fases", (req, res) => {
	if (!req.session.user) {
		// TODO: Criar uma página para os espertinhos não autenticados
		return res.status(401).send("Não autenticado");
	}
	res.sendFile(path.resolve("../Front/Fases/hub.html"));
});

export default router;
