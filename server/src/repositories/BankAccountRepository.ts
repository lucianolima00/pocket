import { EntityRepository, Repository } from "typeorm";
import { BankAccount } from "../models/BankAccount";

@EntityRepository(BankAccount)
export class BankAccountRepository extends Repository<BankAccount> {

}