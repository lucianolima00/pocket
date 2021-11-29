import {EntityRepository, Repository} from "typeorm";
import { RevenueCategory } from "../models/RevenueCategory";

@EntityRepository(RevenueCategory)
class RevenueCategoryRepository extends Repository<RevenueCategory> {

}

export { RevenueCategoryRepository }