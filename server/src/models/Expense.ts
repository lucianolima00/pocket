import {ChildEntity, Column, ManyToOne} from "typeorm";
import {Movement} from "./Movement";
import {User} from "./User";
import {BankAccount} from "./BankAccount";
import {ExpensePaymentMode} from "../helpers/MovementEnums";
import {ExpenseCategory} from "./ExpenseCategory";

@ChildEntity()
export class Expense extends Movement{

    @Column({
        type: "enum",
        enum: ExpensePaymentMode,
        default: ExpensePaymentMode.IN_CASH
    })
    paymentMode: ExpensePaymentMode;

    @Column({type: "int", default: 0})
    installmentNumber: number;

    @ManyToOne(() => ExpenseCategory, expenseCategory => expenseCategory.expenses)
    category: ExpenseCategory;

    @ManyToOne(() => BankAccount, bankAccount => bankAccount.expenses)
    bankAccount: BankAccount;

    @ManyToOne(() => User, user => user.expenses)
    user: User;
}
