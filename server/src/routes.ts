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
routes.all("/bank-account/*", authMiddleware)
routes.get("/bank-account/", bankAccountController.index);
routes.get("/bank-account/:id", bankAccountController.view);
routes.post("/bank-account/", bankAccountController.create);
routes.put("/bank-account/update/:id", bankAccountController.update);
routes.delete("/bank-account/delete/:id", bankAccountController.delete);

/**
 * Routes for Expense Controller
 */
routes.all("/expense/*", authMiddleware)
routes.get("/expense", expenseController.index);
routes.get("/expense/:id", expenseController.view);
routes.post("/expense", expenseController.create);
routes.put("/expense/update/:id", expenseController.update);
routes.delete("/expense/:id", expenseController.delete);

/**
 * Routes for Category Controller
 */
routes.all("/expense-category/*", authMiddleware)
routes.get("/expense-category", expenseCategoryController.index);
routes.get("/expense-category/:id", expenseCategoryController.view);
routes.post("/expense-category", expenseCategoryController.create);
routes.put("/expense-category/update/:id", expenseCategoryController.update);
routes.delete("/expense-category/:id", expenseCategoryController.delete);

/**
 * Routes for Revenue Controller
 */
routes.all("/revenue/*", authMiddleware)
routes.get("/revenue", revenueController.index);
routes.get("/revenue/:id", revenueController.view);
routes.post("/revenue", revenueController.create);
routes.put("/revenue/update/:id", revenueController.update);
routes.delete("/revenue/:id", revenueController.delete);

/**
 * Routes for Category Controller
 */
routes.all("/revenue-category/*", authMiddleware)
routes.get("/revenue-category", revenueCategoryController.index);
routes.get("/revenue-category/:id", revenueCategoryController.view);
routes.post("/revenue-category", revenueCategoryController.create);
routes.put("/revenue-category/update/:id", revenueCategoryController.update);
routes.delete("/revenue-category/:id", revenueCategoryController.delete);

/**
 * Routes for Transference Controller
 */
routes.all("/transference/*", authMiddleware)
routes.get("/transference", transferenceController.index);
routes.get("/transference/:id", transferenceController.view);
routes.post("/transference", transferenceController.create);
routes.put("/transference/update/:id", transferenceController.update);
routes.delete("/transference/:id", transferenceController.delete);

/**
 * Routes for User Controller
 */
routes.get("/user", authMiddleware, userController.index);
routes.get("/user/:id", authMiddleware, userController.view);
routes.post("/user", userController.create);
routes.put("/user/update/:id", authMiddleware, userController.update);
routes.delete("/user/:id", authMiddleware, userController.delete);

export { routes };