import {getCustomRepository} from "typeorm";
import { ExpenseCategoryRepository } from "../repositories/ExpenseCategoryRepository";

const expenseCategoryRepository = getCustomRepository(ExpenseCategoryRepository);

export class ExpenseCategoryController {

    /**
     * Get all expenseCategories
     * @param request
     * @param response
     */
    async index(request, response) {

        const categories = await expenseCategoryRepository.find({ active: true });

        if (categories) {
            return response.send(categories);
        }
    }

    /**
     * View a expenseCategory
     * @param request
     * @param response
     */
    async view(request, response) {
        const expenseCategory = await expenseCategoryRepository.findOne(request.params.id);

        if (expenseCategory) {
            return response.send(expenseCategory);
        }

        return response.sendStatus(404)
    }

    /**
     * Create a expenseCategory
     * @param request
     * @param response
     */
    async create(request, response) {
        const { name, active } = request.body;

        const expenseCategory = expenseCategoryRepository.create({
            name,
            active
        });

        if (await expenseCategoryRepository.save(expenseCategory)) {
            return response.json(expenseCategory);
        }

        return response.sendStatus(400);
    }

    /**
     * Update a expenseCategory
     * @param request
     * @param response
     */
    async update(request, response) {
        const { name, active } = request.body;

        const expenseCategory = await expenseCategoryRepository.findOne(request.params.id);

        if (expenseCategory) {
            expenseCategory.name = name;
            expenseCategory.active = active;

            if (await expenseCategoryRepository.save(expenseCategory)) {
                return response.json(expenseCategory);
            }
        }

        return response.sendStatus(400);
    }

    /**
     * Delete a expenseCategory
     * @param request
     * @param response
     */
    async delete(request, response) {
        const expenseCategory = await expenseCategoryRepository.findOne(request.params.id);

        if (expenseCategory && await expenseCategoryRepository.delete({ id: request.params.id, active: true })) {
            return response.sendStatus(200);
        }
        return response.sendStatus(404);
    }
}