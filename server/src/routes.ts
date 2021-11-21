import { Router } from "express";
import { UserController }  from "./controllers/UserController";
import { AuthController }  from "./controllers/AuthController";

import authMiddleware from "./middlewares/authMiddleware";
import {BankAccountController} from "./controllers/BankAccountController";

const userController = new UserController();
const authController = new AuthController();
const bankAccountController = new BankAccountController();

const routes = Router();

routes.get("/", (request, response) => {
    return response.json({
        message: "Hello World",
    })
});

routes.post("/auth", authController.authenticate);

routes.get("/user", authMiddleware, userController.index);
routes.post("/user", userController.create);

routes.get("/bank-account", authMiddleware, bankAccountController.index);
routes.post("/bank-account", authMiddleware, bankAccountController.create);

export { routes };