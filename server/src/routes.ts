import { Router } from "express";
import { UserController }  from "./controllers/UserController";
import { AuthController }  from "./controllers/AuthController";

import authMiddleware from "./middlewares/authMiddleware";

const userController = new UserController();
const authController = new AuthController();

const routes = Router();

routes.get("/", (request, response) => {
    return response.json({
        message: "Hello World",
    })
});

routes.get("/user", authMiddleware, userController.index);

routes.post("/user", userController.create);
routes.post("/auth", authController.authenticate);

export { routes };