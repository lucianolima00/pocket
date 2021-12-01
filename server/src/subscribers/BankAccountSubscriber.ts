import {EntitySubscriberInterface, EventSubscriber, InsertEvent} from "typeorm";
import {BankAccount} from "../models/BankAccount";
import {InvestmentRepository} from "../repositories/InvestmentRepository";

const investmentRepository = new InvestmentRepository();

@EventSubscriber()
export class BankAccountSubscriber implements EntitySubscriberInterface {
    /**
     * This subscriber only listen to BankAccount events
     */
    listenTo() {
        return BankAccount;
    }

    afterInsert(event: InsertEvent<BankAccount>) {
        const bankAccount = event.entity;
        if (bankAccount.investmentType) {
            const investment = investmentRepository.create({
                date: bankAccount.created_at
            });
        }
    }
}