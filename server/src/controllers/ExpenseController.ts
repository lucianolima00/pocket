import {getCustomRepository} from "typeorm";
import {ExpenseRepository} from "../repositories/ExpenseRepository";
import {ExpenseCategoryRepository} from "../repositories/ExpenseCategoryRepository";
import {BankAccountRepository} from "../repositories/BankAccountRepository";
import {UserRepository} from "../repositories/UserRepository";

const expenseRepository = getCustomRepository(ExpenseRepository);
const expenseCategoryRepository = getCustomRepository(ExpenseCategoryRepository);
const bankAccountRepository = getCustomRepository(BankAccountRepository);
const userRepository = getCustomRepository(UserRepository);

export class ExpenseController {

    /**
     * Get all expenses
     * @param request
     * @param response
     */
    async index(request, response) {

        const expenses = await expenseRepository.find({ where: { active: true }});

        if (expenses) {
            return response.send(expenses);
        }
    }

    /**
     * View a expense
     * @param request
     * @param response
     */
    async view(request, response) {
        const expense = await expenseRepository.findOne(request.params.id);

        if (expense) {
            return response.send(expense);
        }

        return response.sendStatus(404)
    }

    /**
     * Create a expense
     * @param request
     * @param response
     */
    async create(request, response) {
        const {
            date,
            value,
            billingType,
            description,
            categoryId,
            bankAccountId,
            userId,
            paymentMode,
            installmentNumber,
            active
        } = request.body;

        const category = await expenseCategoryRepository.findOne(categoryId);
        const bankAccount = await bankAccountRepository.findOne(bankAccountId);
        const user = await userRepository.findOne(userId);

        const expense = expenseRepository.create({
            date,
            value,
            description,
            billingType,
            bankAccount,
            category,
            user,
            paymentMode,
            installmentNumber,
            active
        });

        if (await expenseRepository.save(expense)) {
            return response.json(expense);
        }

        return response.sendStatus(400);
    }

    /**
     * Update a expense
     * @param request
     * @param response
     */
    async update(request, response) {
        const {
            date,
            value,
            billingType,
            description,
            categoryId,
            bankAccountId,
            userId,
            paymentMode,
            installmentNumber,
            active
        } = request.body;

        const expense = await expenseRepository.findOne(request.params.id);

        const category = await expenseCategoryRepository.findOne(categoryId);
        const bankAccount = await bankAccountRepository.findOne(bankAccountId);
        const user = await userRepository.findOne(userId);

        if (expense) {
            expense.date = date;
            expense.value = value;
            expense.description = description;
            expense.billingType = billingType;
            expense.bankAccount = bankAccount;
            expense.category = category;
            expense.user = user;
            expense.paymentMode = paymentMode;
            expense.installmentNumber = installmentNumber;
            expense.active = active;

            if (await expenseRepository.save(expense)) {
                return response.json(expense);
            }
        }

        return response.sendStatus(400);
    }

    /**
     * Delete a expense
     * @param request
     * @param response
     */
    async delete(request, response) {
        const { id } = request.params;
        const expense = await expenseRepository.findOne(id);

        if (expense && await expenseRepository.delete({ id: id, active: true })) {
            return response.sendStatus(200);
        }
        return response.sendStatus(404);
    }
}