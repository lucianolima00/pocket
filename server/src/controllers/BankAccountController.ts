import { getCustomRepository } from "typeorm";
import { BankAccountRepository } from "../repositories/BankAccountRepository";
import { BankRepository } from "../repositories/BankRepository";
import { UserRepository } from "../repositories/UserRepository";

const bankAccountRepository = getCustomRepository(BankAccountRepository);

export class BankAccountController {

    /**
     * Get all bank accounts
     * @param request
     * @param response
     */
    async index(request, response) {
        const bankAccounts = await bankAccountRepository.find({ active: true });

        if (bankAccounts) {
            return response.send(bankAccounts);
        }
    }

    /**
     * View a bank account
     * @param request
     * @param response
     */
    async view(request, response) {
        const bankAccount = await bankAccountRepository.findOne(request.params.id);

        if (bankAccount) {
            return response.send(bankAccount);
        }

        /**
         * Create a bank account
         * @param request
         * @param response
         */
        return response.sendStatus(404)
    }

    async create(request, response) {
        const bankRepository = getCustomRepository(BankRepository);
        const userRepository = getCustomRepository(UserRepository);
        const { name, type, bankId, agency,  account, credit_limit, userId, active } = request.body;

        const bank = await bankRepository.findOne(bankId);
        const user = await userRepository.findOne(userId);

        const bankAccount = bankAccountRepository.create({
            name,
            type,
            bank: bank,
            agency,
            account,
            credit_limit,
            user: user,
            active: active
        });

        if (await bankAccountRepository.save(bankAccount)) {
            return response.json(bankAccount);
        }

        return response.sendStatus(400);
    }

    /**
     * Update a bank account
     * @param request
     * @param response
     */
    async update(request, response) {
        const bankRepository = getCustomRepository(BankRepository);
        const userRepository = getCustomRepository(UserRepository);
        const { name, type, bankId, agency,  account, credit_limit, userId, active } = request.body;

        const bank = await bankRepository.findOne(bankId);
        const user = await userRepository.findOne(userId);

        const bankAccount = await bankAccountRepository.findOne(request.params.id);

        if (bankAccount) {
            bankAccount.name = name;
            bankAccount.type = type;
            bankAccount.bank = bank;
            bankAccount.agency = agency;
            bankAccount.account = account;
            bankAccount.credit_limit = credit_limit;
            bankAccount.user = user;
            bankAccount.active = active;

            if (await bankAccountRepository.save(bankAccount)) {
                return response.json(bankAccount);
            }
        }

        return response.sendStatus(400);
    }

    /**
     * Delete a bank account
     * @param request
     * @param response
     */
    async delete(request, response) {
        const bankAccount = await bankAccountRepository.findOne(request.params.id);

        if (bankAccount && await bankAccountRepository.delete({ id: request.params.id, active: true })) {
            return response.sendStatus(200);
        }
        return response.sendStatus(404);
    }
}