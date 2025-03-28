import JWT from "jsonwebtoken";
import userController from "../controllers/userController.js";

export const authorization = (req, res, next) => {
    const authToken = req.headers.authorization;
    if (authToken) {
        const bearer = authToken.split(" ");
        const token = bearer[1];
        JWT.verify(token, userController.JWTSecret, (error, data) => {
            if (error) {
                res.status(401).json({ message: "Token inválido" }); // 401 Unauthorized
            } else {
                req.token = token;
                req.loggedUser = {
                    id: data.id,
                    name: data.name,
                    email: data.email,
                };
                next();
            }
        });
    } else {
        res.status(401).json({ message: "Token inválido" }); // 401 Unauthorized
    }
};
