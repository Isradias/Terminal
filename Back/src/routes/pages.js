import express from "express";
import path from "path";

const router = express.Router();

router.get("/", (req, res) => {
	res.sendFile(path.resolve("../Front/Home/index.html"));
});

router.get("/cadastro", (req, res) => {
	res.sendFile(path.resolve("../Front/Cadastro/cadastro.html"));
});

export default router;
