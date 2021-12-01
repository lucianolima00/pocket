import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {IsCurrency, IsDate, IsDecimal} from "class-validator";
import {RevenueCategory} from "./RevenueCategory";
import {BankAccount} from "./BankAccount";
import {User} from "./User";

@Entity()
export class Transference {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column({type: "double", nullable: false})
    @IsDecimal()
    @IsCurrency()
    value: number;

    @Column({type: "date", nullable: false})
    date: Date;

    @Column()
    active: boolean;

    @CreateDateColumn()
    @IsDate()
    created_at: Date;

    @UpdateDateColumn()
    @IsDate()
    updated_at: Date;

    @ManyToOne(() => BankAccount, bankAccount => bankAccount.fromTransferences)
    fromBankAccount: BankAccount;

    @ManyToOne(() => BankAccount, bankAccount => bankAccount.toTransferences)
    toBankAccount: BankAccount;

    @ManyToOne(() => User, user => user.transferences)
    user: User;

    constructor() {
        this.active = this.active == undefined ? true : this.active;
    }
}
