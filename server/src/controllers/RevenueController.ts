import {getCustomRepository} from "typeorm";
import { RevenueRepository } from "../repositories/RevenueRepository";
import {RevenueCategoryRepository} from "../repositories/RevenueCategoryRepository";
import {BankAccountRepository} from "../repositories/BankAccountRepository";
import {UserRepository} from "../repositories/UserRepository";

const revenueRepository = getCustomRepository(RevenueRepository);
const expenseCategoryRepository = getCustomRepository(RevenueCategoryRepository);
const bankAccountRepository = getCustomRepository(BankAccountRepository);
const userRepository = getCustomRepository(UserRepository);

export class RevenueController {

    /**
     * Get all revenues
     * @param request
     * @param response
     */
    async index(request, response) {

        const revenues = await revenueRepository.find({ where: { active: true }});

        if (revenues) {
            return response.send(revenues);
        }
    }

    /**
     * View a revenue
     * @param request
     * @param response
     */
    async view(request, response) {
        const revenue = await revenueRepository.findOne(request.params.id);

        if (revenue) {
            return response.send(revenue);
        }

        return response.sendStatus(404)
    }

    /**
     * Create a revenue
     * @param request
     * @param response
     */
    async create(request, response) {
        const { date, value, billingType, description, categoryId, bankAccountId, userId, active } = request.body;

        const category = await expenseCategoryRepository.findOne(categoryId);
        const bankAccount = await bankAccountRepository.findOne(bankAccountId);
        const user = await userRepository.findOne(userId);

        delete user.password;

        const revenue = revenueRepository.create({
            date,
            value,
            description,
            billingType,
            bankAccount,
            category,
            user,
            active
        });

        if (await revenueRepository.save(revenue)) {
            return response.json(revenue);
        }

        return response.sendStatus(400);
    }

    /**
     * Update a revenue
     * @param request
     * @param response
     */
    async update(request, response) {
        const { date, value, billingType, description, categoryId, bankAccountId, userId, active } = request.body;

        const revenue = await revenueRepository.findOne(request.params.id);

        const category = await expenseCategoryRepository.findOne(categoryId);
        const bankAccount = await bankAccountRepository.findOne(bankAccountId);
        const user = await userRepository.findOne(userId);

        delete user.password;

        if (revenue) {
            revenue.date = date;
            revenue.value = value;
            revenue.description = description;
            revenue.billingType = billingType;
            revenue.bankAccount = bankAccount;
            revenue.category = category;
            revenue.user = user;
            revenue.active = active;

            if (await revenueRepository.save(revenue)) {
                return response.json(revenue);
            }
        }

        return response.sendStatus(400);
    }

    /**
     * Delete a revenue
     * @param request
     * @param response
     */
    async delete(request, response) {
        const { id } = request.params;
        const revenue = await revenueRepository.findOne(id);

        if (revenue && await revenueRepository.delete({ id: id, active: true })) {
            return response.sendStatus(200);
        }
        return response.sendStatus(404);
    }
}