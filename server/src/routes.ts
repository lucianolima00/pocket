import { Router } from "express";
import { CategoryController }  from "./controllers/CategoryController";
import { UserController }  from "./controllers/UserController";
import { AuthController }  from "./controllers/AuthController";
import { BankAccountController } from "./controllers/BankAccountController";
import authMiddleware from "./middlewares/authMiddleware";

const userController = new UserController();
const authController = new AuthController();
const bankAccountController = new BankAccountController();
const categoryController = new CategoryController();

const routes = Router();

routes.get("/", (request, response) => {
    return response.json({
        message: "Hello World",
    })
});

/**
 * Authenticate Route
 */
routes.post("/auth", authController.authenticate);

/**
 * Routes for User Controller
 */
routes.get("/user", authMiddleware, userController.index);
routes.get("/user/:id", authMiddleware, userController.view);
routes.post("/user", userController.create);
routes.put("/user/:id", authMiddleware, userController.update);
routes.delete("/user/:id", authMiddleware, userController.delete);

/**
 * Routes for BankAccount Controller
 */
routes.get("/bank-account", authMiddleware, bankAccountController.index);
routes.get("/bank-account/:id", authMiddleware, bankAccountController.view);
routes.post("/bank-account", authMiddleware, bankAccountController.create);
routes.put("/bank-account/:id", authMiddleware, bankAccountController.update);
routes.delete("/bank-account/:id", authMiddleware, bankAccountController.delete);

/**
 * Routes for Category Controller
 */
routes.get("/category", authMiddleware, categoryController.index);
routes.get("/category/:id", authMiddleware, categoryController.view);
routes.post("/category", authMiddleware, categoryController.create);
routes.put("/category/:id", authMiddleware, categoryController.update);
routes.delete("/category/:id", authMiddleware, categoryController.delete);

export { routes };