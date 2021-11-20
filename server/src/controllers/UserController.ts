import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repositories/UserRepository";

export class UserController {

    async index(request, response) {
        return response.send({ userID: request.userId});
    }

    async create(request, response) {
        const { name, birthdate, cpf_cnpj, email,  password, picture } = request.body;

        const userRepository = getCustomRepository(UserRepository);

        const user = userRepository.create({
            name,
            cpf_cnpj,
            email,
            password,
            birthdate,
            picture
        });

        const userExist = await userRepository.findOne({ where: { email, cpf_cnpj }});

        if (userExist) {
            return response.sendStatus(409)
        }

        await userRepository.save(user);

        return response.json(user);
    }
}