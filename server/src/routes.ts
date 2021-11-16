import { Router } from "express";
import {UserController} from "./controllers/UserController";

const userController = new UserController();

const routes = Router();

routes.get("/", (request, response) => {
    return response.json({
        message: "Hello World",
    })
});

routes.post("/user", userController.create);

export { routes };