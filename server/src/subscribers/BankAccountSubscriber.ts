import {EntitySubscriberInterface, EventSubscriber, getCustomRepository, InsertEvent, UpdateEvent} from "typeorm";
import {BankAccount} from "../models/BankAccount";
import {InvestmentRepository} from "../repositories/InvestmentRepository";
import {BankAccountRepository} from "../repositories/BankAccountRepository";

@EventSubscriber()
export class BankAccountSubscriber implements EntitySubscriberInterface {
    /**
     * This subscriber only listen to BankAccount events
     */
    listenTo() {
        return BankAccount;
    }

    /**
     * Create an investment for every BankAccount with an InvestmentType
     * @param event
     */
    async afterInsert(event: InsertEvent<BankAccount>) {
        const investmentRepository = event.manager.getCustomRepository(InvestmentRepository);

        const bankAccount = event.entity;
        const balance = bankAccount.balance;
        if (bankAccount.investmentType) {
            const investment = investmentRepository.create({
                date: new Date(),
                value: balance,
                bankAccount: bankAccount
            });

            await investmentRepository.save(investment);
        }
    }

    /**
     * Create an investment for every BankAccount with an InvestmentType
     * @param event
     */
    async beforeUpdate(event: UpdateEvent<BankAccount>) {
        const investmentRepository = event.manager.getCustomRepository(InvestmentRepository);
        const bankAccountRepository = event.manager.getCustomRepository(BankAccountRepository);

        const oldBankAccount = await bankAccountRepository.findOne(event.entity.id);
        const newBankAccount = event.entity;

        const balance = (newBankAccount.investmentType ? newBankAccount.balance : 0) - (oldBankAccount.investmentType ? oldBankAccount.balance : 0);

        if (balance !== 0) {
            const investment = investmentRepository.create({
                date: new Date(),
                value: balance,
                bankAccount: oldBankAccount
            });

            await investmentRepository.save(investment);
        }
    }
}