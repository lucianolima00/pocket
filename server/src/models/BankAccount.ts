import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {Bank} from "./Bank";
import {User} from "./User";
import {IsCurrency, IsDate, IsDecimal} from "class-validator";
import {Expense} from "./Expense";
import {Revenue} from "./Revenue";
import {Transference} from "./Transference";
import {Investment} from "./Investment";

@Entity()
export class BankAccount {
    @PrimaryGeneratedColumn("increment")
    id: string;

    @Column({type: "varchar", nullable: false})
    name: string;

    @Column({type: "varchar", nullable: false})
    type: string;

    @ManyToOne(() => Bank, bank => bank.bankAccounts)
    bank: Bank;

    @Column({type: "varchar", nullable: false})
    agency: string;

    @Column({type: "varchar", nullable: false})
    account: string;

    @Column({type: "double", nullable: false})
    @IsDecimal()
    @IsCurrency()
    credit_limit: number;

    @Column({type: "double", nullable: false})
    @IsDecimal()
    @IsCurrency()
    balance: number;

    @ManyToOne(() => User, user => user.bankAccounts)
    user: User;

    @Column()
    active: boolean;

    @CreateDateColumn()
    @IsDate()
    created_at: Date;

    @UpdateDateColumn()
    @IsDate()
    updated_at: Date;

    @OneToMany(() => Expense, expense => expense.bankAccount)
    expenses: Expense[]

    @OneToMany(() => Revenue, revenue => revenue.bankAccount)
    revenues: Revenue[]

    @OneToMany(() => Transference, fromTransferences => fromTransferences.fromBankAccount)
    fromTransferences: Transference[]

    @OneToMany(() => Transference, toTransferences => toTransferences.fromBankAccount)
    toTransferences: Transference[]

    @OneToMany(() => Investment, investment => investment.bankAccount)
    investments: Investment[]

    constructor() {
        this.active = this.active == undefined ? true : this.active;
    }
}
