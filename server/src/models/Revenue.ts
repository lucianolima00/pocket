import {ChildEntity, ManyToOne} from "typeorm";
import {Movement} from "./Movement";
import {BankAccount} from "./BankAccount";
import {User} from "./User";
import {RevenueCategory} from "./RevenueCategory";

@ChildEntity()
export class Revenue extends Movement {

    @ManyToOne(() => RevenueCategory, revenueCategory => revenueCategory.revenues)
    category: RevenueCategory

    @ManyToOne(() => BankAccount, bankAccount => bankAccount.revenues)
    bankAccount: BankAccount

    @ManyToOne(() => User, user => user.revenues)
    user: User
}
