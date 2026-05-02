import express from "express";
import path from "path";

const router = express.Router();

router.get("/", (req, res) => {
	res.sendFile(path.resolve("../Front/Home/home.html"));
});

router.get("/cadastro", (req, res) => {
	res.sendFile(path.resolve("../Front/Cadastro/cadastro.html"));
});

router.get("/fases", (req, res) => {
	res.sendFile(path.resolve("../Front/Fases/hub.html"));
})

export default router;
