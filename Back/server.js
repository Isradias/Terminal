import express from 'express';
import path from 'path';
import authRoutes from './src/routes/auth.js';
import pagesRoutes from './src/routes/pages.js'

const app = express();

app.use(express.json());
app.use(express.static(path.resolve("../Front")));

app.use(authRoutes);
app.use(pagesRoutes);

app.listen(3000, () => {console.log("Rodando na porta 3000")});