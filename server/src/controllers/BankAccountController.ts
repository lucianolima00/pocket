import { getCustomRepository } from "typeorm";
import { BankAccountRepository } from "../repositories/BankAccountRepository";
import { BankRepository } from "../repositories/BankRepository";
import { UserRepository } from "../repositories/UserRepository";

export class BankAccountController {

    async index(request, response) {
        const bankAccountRepository = getCustomRepository(BankAccountRepository);

        const userExist = await bankAccountRepository.find({ where: { active: true }});

        if (userExist) {
            return response.send(userExist);
        }
    }

    async create(request, response) {
        const { name, type, bankId, agency,  account, credit_limit, userId } = request.body;

        const bankAccountRepository = getCustomRepository(BankAccountRepository);
        const bankRepository = getCustomRepository(BankRepository);
        const userRepository = getCustomRepository(UserRepository);

        const bank = await bankRepository.findOne(bankId);
        const user = await userRepository.findOne(userId);

        const bankAccount = bankAccountRepository.create({
            name,
            type,
            bank: bank,
            agency,
            account,
            credit_limit,
            user: user
        });

        await bankAccountRepository.save(bankAccount);

        return response.json(bankAccount);
    }
}