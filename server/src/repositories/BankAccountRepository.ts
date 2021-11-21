import { EntityRepository, Repository } from "typeorm";
import { BankAccount } from "../models/BankAccount";

@EntityRepository(BankAccount)
class BankAccountRepository extends Repository<BankAccount> {

}

export { BankAccountRepository }