import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repositories/UserRepository";

const userRepository = getCustomRepository(UserRepository);

export class UserController {

    /**
     * Get all users
     * @param request
     * @param response
     */
    async index(request, response) {
        const users = await userRepository.find({active: true});

        if (users) {
            return response.send(users);
        }
    }

    /**
     * View an user
     * @param request
     * @param response
     */
    async view(request, response) {

        const user = await userRepository.findOne(request.params.id);

        if (user) {
            return response.send(user);
        }

        return response.sendStatus(404)
    }

    /**
     * Create an user
     * @param request
     * @param response
     */
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

        const userExist = await userRepository.findByEmailOrCpfCnpj(email, cpf_cnpj);

        if (userExist) {
            return response.sendStatus(409)
        } else if (await userRepository.save(user)) {
            return response.json(user);
        }

        return response.sendStatus(400)
    }

    /**
     * Update an user
     * @param request
     * @param response
     */
    async update(request, response) {
        const { name, cpf_cnpj, email, birthdate,  password, picture, active } = request.body;


        const user = await userRepository.findOne(request.params.id);

        if (user) {
            user.name = name;
            user.cpf_cnpj = cpf_cnpj;
            user.email = email;
            user.birthdate = birthdate;
            user.password = password;
            user.picture = picture;
            user.active = active;

            if (await userRepository.save(user)) {
                return response.json(user);
            }
        }

        return response.sendStatus(400);
    }

    /**
     * Delete an user
     * @param request
     * @param response
     */
    async delete(request, response) {
        const user = await userRepository.findOne(request.params.id);

        if (user && await userRepository.delete({ id: request.params.id, active: true })) {
            return response.send(200);
        }

        return response.send(404);
    }
}