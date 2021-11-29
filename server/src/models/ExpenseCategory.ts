import {
    ChildEntity,
    OneToMany,
} from "typeorm";
import {Expense} from "./Expense";
import {Category} from "./Category";

@ChildEntity()
export class ExpenseCategory extends Category {
    @OneToMany(() => Expense, expense => expense.category)
    expenses: Expense[]
}
