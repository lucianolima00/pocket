import {EntityRepository, Repository} from "typeorm";
import { Investment } from "../models/Investment";

@EntityRepository(Investment)
export class InvestmentRepository extends Repository<Investment> {
}