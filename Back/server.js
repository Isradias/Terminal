import express from 'express';
import path from 'path';
import authRoutes from './src/routes/auth.js';
import pagesRoutes from './src/routes/pages.js'
import fasesRoutes from './src/routes/fases.js'
import { configDotenv } from 'dotenv';
import session from 'express-session';

const app = express();

app.use(express.json());
app.use(express.static(path.resolve("../Front")));
app.use(session({
  secret: process.env.SESSION_PASS,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

app.use(authRoutes);
app.use(pagesRoutes);
app.use(fasesRoutes);

app.listen(3000, () => {console.log("Rodando na porta 3000")});