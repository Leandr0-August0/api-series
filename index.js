import mongoose from "mongoose";
import express from "express";
const app = express();
// Importando o router
import seriesRoutes from "./routers/seriesRouter.js";
import userRouter from './routers/userRouter.js';

// INICIANDO A CONEXÃO COM O BANCO DE DADOS DO MONGODB
const user = "Leandro";
const pass = "eaKfAatjDCucMlz0";
mongoose.connect(
    `mongodb+srv://${user}:${pass}@api-the-game.7jjhq.mongodb.net/?retryWrites=true&w=majority&appName=api-the-game`
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
