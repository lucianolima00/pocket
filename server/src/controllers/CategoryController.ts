import { getCustomRepository } from "typeorm";
import { CategoryRepository } from "../repositories/CategoryRepository";

const categoryRepository = getCustomRepository(CategoryRepository);

export class CategoryController {

    /**
     * Get all categories
     * @param request
     * @param response
     */
    async index(request, response) {

        const categories = await categoryRepository.find({ where: { active: true }});

        if (categories) {
            return response.send(categories);
        }
    }

    /**
     * View a category
     * @param request
     * @param response
     */
    async view(request, response) {
        const category = this.findModel(request.params.id);

        if (category) {
            return response.send(category);
        }

        return response.sendStatus(404)
    }

    /**
     * Create a category
     * @param request
     * @param response
     */
    async create(request, response) {
        const { name, relatedTo, active } = request.body;

        const category = categoryRepository.create({
            name,
            relatedTo,
            active
        });

        if (await categoryRepository.save(category)) {
            return response.json(category);
        }

        return response.sendStatus(400);
    }

    /**
     * Update a category
     * @param request
     * @param response
     */
    async update(request, response) {
        const { name, relatedTo, active } = request.body;

        const category = await this.findModel(request.params.id);

        if (category) {
            category.name = name;
            category.relatedTo = relatedTo;
            category.active = active;

            if (await categoryRepository.save(category)) {
                return response.json(category);
            }
        }

        return response.sendStatus(400);
    }

    /**
     * Delete a category
     * @param request
     * @param response
     */
    async delete(request, response) {
        const category = this.findModel(request.params.id);

        if (category && await categoryRepository.delete({ id: request.params.id, active: true })) {
            return response.sendStatus(200);
        }
        return response.sendStatus(404);
    }


    /**
     * Find a category model
     * @param id
     * @param name
     * @param relatedTo
     */
    private async findModel(id=null, name=null, relatedTo=null) {
        let categoryExist = null;

        if (!id && name && relatedTo){
            categoryExist = await categoryRepository.findOne({ where: { name: name, relatedTo: relatedTo, active: true }});
        } else if (id) {
            categoryExist = await categoryRepository.findOne({ where: { id: id, active: true }});
        }

        if (categoryExist) {
            return categoryExist;
        }

        return null;
    }
}