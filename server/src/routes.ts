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
routes.get("/user/:id", authMiddleware, userController.view);
routes.post("/user", userController.create);
routes.put("/user/:id", userController.update);
routes.delete("/user/:id", userController.delete);

routes.get("/bank-account", authMiddleware, bankAccountController.index);
routes.get("/bank-account/:id", authMiddleware, bankAccountController.view);
routes.post("/bank-account", authMiddleware, bankAccountController.create);
routes.delete("/bank-account/:id", authMiddleware, bankAccountController.delete);

export { routes };