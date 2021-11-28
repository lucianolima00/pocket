import {ChildEntity, Column, ManyToOne} from "typeorm";
import {Movement} from "./Movement";
import {Category} from "./Category";
import {User} from "./User";
import {BankAccount} from "./BankAccount";

@ChildEntity()
export class Expense extends Movement{

    @Column({type: "int"})
    paymentMode: number;

    @Column({type: "int"})
    installmentNumber: number;

    @ManyToOne(() => Category, category => category.expenses)
    category: Category

    @ManyToOne(() => BankAccount, bankAccount => bankAccount.expenses)
    bankAccount: BankAccount

    @ManyToOne(() => User, user => user.expenses)
    user: User
}
