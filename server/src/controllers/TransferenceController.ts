import { getCustomRepository } from "typeorm";
import { TransferenceRepository } from "../repositories/TransferenceRepository";
import { BankAccountRepository } from "../repositories/BankAccountRepository";
import {UserRepository} from "../repositories/UserRepository";

const transferenceRepository = getCustomRepository(TransferenceRepository);
const bankAccountRepository = getCustomRepository(BankAccountRepository);
const userRepository = getCustomRepository(UserRepository);

export class TransferenceController {

    /**
     * Get all transferences
     * @param request
     * @param response
     */
    async index(request, response) {
        const transferences = await transferenceRepository.find({active: true});

        if (transferences) {
            return response.send(transferences);
        }
    }

    /**
     * View an transference
     * @param request
     * @param response
     */
    async view(request, response) {

        const transference = await transferenceRepository.findOne(request.params.id);

        if (transference) {
            return response.send(transference);
        }

        return response.sendStatus(404)
    }

    /**
     * Create an transference
     * @param request
     * @param response
     */
    async create(request, response) {
        const { value, date, fromBankAccountId, toBankAccountId, userId, active } = request.body;

        const fromBankAccount = await bankAccountRepository.findOne(fromBankAccountId);
        const toBankAccount = await bankAccountRepository.findOne(toBankAccountId);
        const user = await userRepository.findOne(userId);

        const transference = transferenceRepository.create({
            value,
            date,
            fromBankAccount: fromBankAccount,
            toBankAccount: toBankAccount,
            user: user,
            active
        });

        if (await transferenceRepository.save(transference)) {
            return response.json(transference);
        }

        return response.sendStatus(400)
    }

    /**
     * Update an transference
     * @param request
     * @param response
     */
    async update(request, response) {
        const { value, date, fromBankAccountId, toBankAccountId, userId, active } = request.body;

        const fromBankAccount = await bankAccountRepository.findOne(fromBankAccountId);
        const toBankAccount = await bankAccountRepository.findOne(toBankAccountId);
        const user = await userRepository.findOne(userId);

        const transference = await transferenceRepository.findOne(request.params.id);

        if (transference) {
            transference.value = value;
            transference.date = date;
            transference.fromBankAccount = fromBankAccount;
            transference.toBankAccount = toBankAccount;
            transference.user = user;
            transference.active = active

            if (await transferenceRepository.save(transference)) {
                return response.json(transference);
            }
        }

        return response.sendStatus(400);
    }

    /**
     * Delete an transference
     * @param request
     * @param response
     */
    async delete(request, response) {
        const transference = await transferenceRepository.findOne(request.params.id);

        if (transference && await transferenceRepository.delete({ id: request.params.id, active: true })) {
            return response.send(200);
        }

        return response.send(404);
    }
}