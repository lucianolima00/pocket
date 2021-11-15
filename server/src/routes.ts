import { Router } from "express";
import { getCustomRepository } from "typeorm";
import { UserRepository } from "./repositories/UserRepository";

const routes = Router();

routes.get("/", (request, response) => {
    return response.json({
        message: "Hello World",
    })
});

routes.post("/user", async (request, response) => {
    const { name, birthdate, cpf_cnpj, picture } = request.body;

    const userRepository = getCustomRepository(UserRepository);

    const user = userRepository.create({
        name,
        birthdate,
        cpf_cnpj,
        picture
    });

    await userRepository.save(user);

    return response.json(user);
})

export { routes };