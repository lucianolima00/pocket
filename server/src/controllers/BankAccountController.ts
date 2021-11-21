import { getCustomRepository } from "typeorm";
import { BankAccountRepository } from "../repositories/BankAccountRepository";

export class BankAccountController {

    async index(request, response) {
        const bankAccountRepository = getCustomRepository(BankAccountRepository);

        const userExist = await bankAccountRepository.find({ where: { active: true }});

        if (userExist) {
            return response.send(userExist);
        }
    }

    async create(request, response) {
        const { name, type, bank, agency,  account, credit_limit, user } = request.body;

        const bankAccountRepository = getCustomRepository(BankAccountRepository);

        const bankAccount = bankAccountRepository.create({
            name,
            type,
            bank,
            agency,
            account,
            credit_limit,
            user
        });

        await bankAccountRepository.save(bankAccount);

        return response.json(bankAccount);
    }
}