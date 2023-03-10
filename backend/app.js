import express from 'express';
import cors from 'cors';
import path, { dirname } from "path"
import dotenv from 'dotenv/config';
import { router } from './routes/Router.js';
import { fileURLToPath } from "url";
import { db } from './config/db.js';

const port = process.env.PORT;

const app = express();

// config JSON
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Cors

app.use(cors({ credentials: true, origin: "http://localhost:5173" }));

// Upload

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use("/uploads", express.static(path.join(__dirname, '/uploads')));

// DB connection 

db.on('error', console.log.bind(console, 'Error connection'));
db.once('open', () => {
    console.log('Connection db sucessfull')
})

// routes

app.use(router);

app.listen(port, () => {
    console.log(`App rodando na porta ${port}`);
});