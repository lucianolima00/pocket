import {getCustomRepository} from "typeorm";
import { RevenueCategoryRepository } from "../repositories/RevenueCategoryRepository";

const revenueCategoryRepository = getCustomRepository(RevenueCategoryRepository);

export class RevenueCategoryController {

    /**
     * Get all revenueCategories
     * @param request
     * @param response
     */
    async index(request, response) {

        const categories = await revenueCategoryRepository.find({ active: true });

        if (categories) {
            return response.send(categories);
        }
    }

    /**
     * View a revenueCategory
     * @param request
     * @param response
     */
    async view(request, response) {
        const revenueCategory = await revenueCategoryRepository.findOne(request.params.id);

        if (revenueCategory) {
            return response.send(revenueCategory);
        }

        return response.sendStatus(404)
    }

    /**
     * Create a revenueCategory
     * @param request
     * @param response
     */
    async create(request, response) {
        const { name, active } = request.body;

        const revenueCategory = revenueCategoryRepository.create({
            name,
            active
        });

        if (await revenueCategoryRepository.save(revenueCategory)) {
            return response.json(revenueCategory);
        }

        return response.sendStatus(400);
    }

    /**
     * Update a revenueCategory
     * @param request
     * @param response
     */
    async update(request, response) {
        const { name, active } = request.body;

        const revenueCategory = await revenueCategoryRepository.findOne(request.params.id);

        if (revenueCategory) {
            revenueCategory.name = name;
            revenueCategory.active = active;

            if (await revenueCategoryRepository.save(revenueCategory)) {
                return response.json(revenueCategory);
            }
        }

        return response.sendStatus(400);
    }

    /**
     * Delete a revenueCategory
     * @param request
     * @param response
     */
    async delete(request, response) {
        const revenueCategory = await revenueCategoryRepository.findOne(request.params.id);

        if (revenueCategory && await revenueCategoryRepository.delete({ id: request.params.id, active: true })) {
            return response.sendStatus(200);
        }
        return response.sendStatus(404);
    }
}