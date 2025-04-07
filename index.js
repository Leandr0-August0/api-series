import mongoose from "mongoose";
import express from "express";
const app = express();
// Importando o router
import seriesRoutes from "./routers/seriesRouter.js";
import userRouter from './routers/userRouter.js';

// INICIANDO A CONEXÃO COM O BANCO DE DADOS DO MONGODB
const user = "shrekfeliz";
const pass = "LGqrITANdhi8VC09";
mongoose.connect(
    `mongodb+srv://${user}:${pass}@shrek-flix.w2qdu8q.mongodb.net/?retryWrites=true&w=majority&appName=shrek-flix`
);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// Usando as rotas do router
app.use('/', seriesRoutes);
app.use('/', userRouter)
app.get("/", (req, res) => {
    res.send("Hello World");
});

const port = 3000;
app.listen(port, (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log(`Api rodando em http://localhost:${port}`);
    }
});
