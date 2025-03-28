import express from "express";
const userRouter = express.Router();
import userController from "../controllers/userController.js";

// Endpoint para criar um novo usuário
userRouter.post("/newUser", userController.newUser);

// Endpoint para fazer login
userRouter.post("/login", userController.login);

export default userRouter;
