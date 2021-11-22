import { EntityRepository, Repository } from "typeorm";
import { Bank } from "../models/Bank";

@EntityRepository(Bank)
class BankRepository extends Repository<Bank> {

}

export { BankRepository }