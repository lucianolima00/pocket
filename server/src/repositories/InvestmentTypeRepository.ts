import {EntityRepository, Repository} from "typeorm";
import { InvestmentType } from "../models/InvestmentType";

@EntityRepository(InvestmentType)
export class InvestmentTypeRepository extends Repository<InvestmentType> {
}