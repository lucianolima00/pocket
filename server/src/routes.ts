import {Router} from "express";
import {UserController}  from "./controllers/UserController";
import {RevenueController} from "./controllers/RevenueController";
import {ExpenseController} from "./controllers/ExpenseController";
import {DefaultController}  from "./controllers/DefaultController";
import {BankAccountController} from "./controllers/BankAccountController";
import {TransferenceController} from "./controllers/TransferenceController";
import {RevenueCategoryController} from "./controllers/RevenueCategoryController";
import {ExpenseCategoryController}  from "./controllers/ExpenseCategoryController";

import authMiddleware from "./middlewares/authMiddleware";

const userController = new UserController();
const defaultController = new DefaultController();
const revenueController = new RevenueController();
const expenseController = new ExpenseController();
const bankAccountController = new BankAccountController();
const transferenceController = new TransferenceController();
const expenseCategoryController = new ExpenseCategoryController();
const revenueCategoryController = new RevenueCategoryController();

const routes = Router();

routes.get("/", (request, response) => {
    return response.json({
        message: "Hello World",
    })
});

/**
 * Authenticate Route
 */
routes.post("/auth", defaultController.authenticate);

/**
 * Routes for BankAccount Controller
 */
routes.get("/bank-account", authMiddleware, bankAccountController.index);
routes.get("/bank-account/:id", authMiddleware, bankAccountController.view);
routes.post("/bank-account", authMiddleware, bankAccountController.create);
routes.put("/bank-account/:id", authMiddleware, bankAccountController.update);
routes.delete("/bank-account/:id", authMiddleware, bankAccountController.delete);

/**
 * Routes for Expense Controller
 */
routes.get("/expense", authMiddleware, expenseController.index);
routes.get("/expense/:id", authMiddleware, expenseController.view);
routes.post("/expense", authMiddleware, expenseController.create);
routes.put("/expense/:id", authMiddleware, expenseController.update);
routes.delete("/expense/:id", authMiddleware, expenseController.delete);

/**
 * Routes for Category Controller
 */
routes.get("/expense-category", authMiddleware, expenseCategoryController.index);
routes.get("/expense-category/:id", authMiddleware, expenseCategoryController.view);
routes.post("/expense-category", authMiddleware, expenseCategoryController.create);
routes.put("/expense-category/:id", authMiddleware, expenseCategoryController.update);
routes.delete("/expense-category/:id", authMiddleware, expenseCategoryController.delete);

/**
 * Routes for Expense Controller
 */
routes.get("/revenue", authMiddleware, revenueController.index);
routes.get("/revenue/:id", authMiddleware, revenueController.view);
routes.post("/revenue", authMiddleware, revenueController.create);
routes.put("/revenue/:id", authMiddleware, revenueController.update);
routes.delete("/revenue/:id", authMiddleware, revenueController.delete);

/**
 * Routes for Category Controller
 */
routes.get("/revenue-category", authMiddleware, revenueCategoryController.index);
routes.get("/revenue-category/:id", authMiddleware, revenueCategoryController.view);
routes.post("/revenue-category", authMiddleware, revenueCategoryController.create);
routes.put("/revenue-category/:id", authMiddleware, revenueCategoryController.update);
routes.delete("/revenue-category/:id", authMiddleware, revenueCategoryController.delete);

/**
 * Routes for User Controller
 */
routes.get("/transference", authMiddleware, transferenceController.index);
routes.get("/transference/:id", authMiddleware, transferenceController.view);
routes.post("/transference", transferenceController.create);
routes.put("/transference/:id", authMiddleware, transferenceController.update);
routes.delete("/transference/:id", authMiddleware, transferenceController.delete);

/**
 * Routes for User Controller
 */
routes.get("/user", authMiddleware, userController.index);
routes.get("/user/:id", authMiddleware, userController.view);
routes.post("/user", userController.create);
routes.put("/user/:id", authMiddleware, userController.update);
routes.delete("/user/:id", authMiddleware, userController.delete);

export { routes };