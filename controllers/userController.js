import userService from "../services/userService.js";
import JWT from "jsonwebtoken";
const JWTSecret = "apiseriessecret";

export default {
    JWTSecret,
    async newUser(req, res) {
        const { name, email, password } = req.body;
        try {
            if (!name || !email || !password) {
                return res.status(400).json({
                    message: "Todos os campos devem ser preenchidos",
                }); // 400 Bad Request
            }
            const user = await userService.getOne(email);
            if (user) {
                return res
                    .status(400)
                    .json({ message: "Usuário ja cadastrado" }); // 400 Bad Request
            }
            await userService.create(name, email, password);
            res.status(201).json({ message: "Usuário criado com sucesso!" }); // 201 Created
        } catch (error) {
            res.status(500).json({
                message: "Erro ao criar usuário",
                error: "Erro interno do servidor",
            }); // 500 Internal Server Error
        }
    },

    async login(req, res) {
        const { email, password } = req.body;
        try {
            if (email && password) {
                const user = await userService.getOne(email);
                if (user) {
                    if (user.password === password) {
                        JWT.sign(
                            {
                                id: user._id,
                                name: user.name,
                                email: user.email,
                            },
                            JWTSecret,
                            { expiresIn: "1d" },
                            (error, token) => {
                                if (error) {
                                    res.status(500).json({
                                        message: "Erro ao gerar token",
                                        error: "Erro interno do servidor",
                                    }); // 500 Internal Server Error
                                } else {
                                    res.status(200).json({
                                        message: "Usuário logado com sucesso!",
                                        token,
                                    }); // 200 OK
                                }
                            }
                        );
                    } else {
                        res.status(401).json({
                            message: "Senha incorreta",
                        }); // 401 Unauthorized
                    }
                }else{
                    res.status(404).json({
                        message: "Usuário nao encontrado",
                    }); // 404 Not Found
                }
            }else{
                res.status(400).json({
                    message: "Todos os campos devem ser preenchidos",
                }); // 400 Bad Request
            }
        } catch (error) {
            res.status(500).json({
                message: "Erro ao buscar usuário",
                error: "Erro interno do servidor",
            }); // 500 Internal Server Error
        }
    },
};
