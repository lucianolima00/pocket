import {EntityRepository, Repository} from "typeorm";
import { Expense } from "../models/Expense";

@EntityRepository(Expense)
export class ExpenseRepository extends Repository<Expense> {
}