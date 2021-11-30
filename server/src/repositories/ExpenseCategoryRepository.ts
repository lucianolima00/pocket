import {EntityRepository, Repository} from "typeorm";
import { ExpenseCategory } from "../models/ExpenseCategory";

@EntityRepository(ExpenseCategory)
class ExpenseCategoryRepository extends Repository<ExpenseCategory> {

}

export { ExpenseCategoryRepository }