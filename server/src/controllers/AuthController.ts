import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repositories/UserRepository";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export class AuthController {
    async authenticate(request, response) {
        const { email,  password } = request.body;

        const userRepository = getCustomRepository(UserRepository);

        const user = await userRepository.findOne({ where: {email} })

        if (!user) {
            return response.sendStatus(401);
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            return response.sendStatus(401);
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });

        delete user.password;

        return response.json({
            user,
            token
        });
    }
}