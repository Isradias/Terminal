import express from "express";
import path from "path";
import session from "express-session";
import logged from "./utils.js"

const router = express.Router();

router.get("/", (req, res) => {
	res.sendFile(path.resolve("../Front/Home/home.html"));
});

router.get("/cadastro", (req, res) => {
	res.sendFile(path.resolve("../Front/Cadastro/cadastro.html"));
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
