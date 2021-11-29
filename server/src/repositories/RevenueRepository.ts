import {EntityRepository, Repository} from "typeorm";
import { Revenue } from "../models/Revenue";

@EntityRepository(Revenue)
export class RevenueRepository extends Repository<Revenue> {
}