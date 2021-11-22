import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repositories/UserRepository";
import {BankAccountRepository} from "../repositories/BankAccountRepository";

const userRepository = getCustomRepository(UserRepository);

export class UserController {

    async index(request, response) {

        const usersExist = await userRepository.find({ where: { active: true }});

        if (usersExist) {
            return response.send(usersExist);
        }
    }

    async view(request, response) {
        const { id } = request.body;
        const user = this.findModel(id);

        if (user) {
            return response.send(user);
        }

        return response.sendStatus(404)
    }

    async create(request, response) {
        const { name, birthdate, cpf_cnpj, email,  password, picture } = request.body;

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

    async update(request, response) {
        const { name, birthdate, cpf_cnpj, email,  password, picture } = request.body;

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

    async delete(request, response) {
        const { id } = request.body;
        const user = this.findModel(id);

        if (user && await userRepository.delete({ id: id, active: true })) {
            return response.send(200);
        }

        return response.send(404);
    }

    private async findModel(id) {
        const userExist = await userRepository.findOne({ where: { id: id, active: true }});

        if (userExist) {
            return userExist;
        }

        return null;
    }
}