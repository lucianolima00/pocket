import {ChildEntity, ManyToOne} from "typeorm";
import {Movement} from "./Movement";
import {Category} from "./Category";
import {BankAccount} from "./BankAccount";
import {User} from "./User";

@ChildEntity()
export class Revenue extends Movement {

    @ManyToOne(() => Category, category => category.revenues)
    category: Category

    @ManyToOne(() => BankAccount, bankAccount => bankAccount.revenues)
    bankAccount: BankAccount

    @ManyToOne(() => User, user => user.revenues)
    user: User
}
