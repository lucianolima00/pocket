import { getCustomRepository } from "typeorm";
import { BankAccountRepository } from "../repositories/BankAccountRepository";
import { BankRepository } from "../repositories/BankRepository";
import { UserRepository } from "../repositories/UserRepository";

const bankAccountRepository = getCustomRepository(BankAccountRepository);

export class BankAccountController {

    async index(request, response) {

        const bankAccountsExist = await bankAccountRepository.find({ where: { active: true }});

        if (bankAccountsExist) {
            return response.send(bankAccountsExist);
        }
    }

    async view(request, response) {
        const { id } = request.body;
        const bankAccount = this.findModel(id);

        if (bankAccount) {
            return response.send(bankAccount);
        }

        return response.sendStatus(404)
    }

    async create(request, response) {
        const bankRepository = getCustomRepository(BankRepository);
        const userRepository = getCustomRepository(UserRepository);

        const { name, type, bankId, agency,  account, credit_limit, userId } = request.body;

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

        if (await bankAccountRepository.save(bankAccount)) {
            return response.json(bankAccount);
        }

        return response.sendStatus(400);
    }

    async delete(request, response) {
        const { id } = request.body;
        const bankAccount = this.findModel(id);

        if (bankAccount && await bankAccountRepository.delete({ id: id, active: true })) {
            return response.sendStatus(200);
        }
        return response.sendStatus(404);
    }

    private async findModel(id) {
        const bankAccountExist = await bankAccountRepository.findOne({ where: { id: id, active: true }});

        if (bankAccountExist) {
            return bankAccountExist;
        }

        return null;
    }
}