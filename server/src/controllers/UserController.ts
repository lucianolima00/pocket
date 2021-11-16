import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repositories/UserRepository";

export class UserController {
    async create(request, response) {
        const { name, birthdate, cpf_cnpj, picture } = request.body;

        const userRepository = getCustomRepository(UserRepository);

        const user = userRepository.create({
            name,
            cpf_cnpj,
            birthdate,
            picture
        });

        await userRepository.save(user);

        return response.json(user);
    }
}