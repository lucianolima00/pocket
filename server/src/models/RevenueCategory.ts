import {
    ChildEntity,
    OneToMany,
} from "typeorm";
import {Revenue} from "./Revenue";
import {Category} from "./Category";

@ChildEntity()
export class RevenueCategory extends Category {
    @OneToMany(() => Revenue, revenue => revenue.category)
    revenues: Revenue[]
}
