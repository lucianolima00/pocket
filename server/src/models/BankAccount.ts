import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {Bank} from "./Bank";
import {User} from "./User";
import {IsCurrency, IsDate, IsDecimal} from "class-validator";

@Entity('bank_account')
export class BankAccount {
    @PrimaryGeneratedColumn("increment")
    id: string;

    @Column({type: "varchar", nullable: false})
    name: string

    @Column({type: "varchar", nullable: false})
    type: string

    @ManyToOne(() => Bank, bank => bank.bankAccounts)
    bank: Bank

    @Column({type: "varchar", nullable: false})
    agency: string

    @Column({type: "varchar", nullable: false})
    account: string

    @Column({type: "double", nullable: false})
    @IsDecimal()
    @IsCurrency()
    credit_limit: number

    @ManyToOne(() => User, user => user.bankAccounts)
    user: User

    @Column()
    active: boolean;

    @CreateDateColumn()
    @IsDate()
    created_at: Date;

    @UpdateDateColumn()
    @IsDate()
    updated_at: Date;

    constructor() {
        this.active = this.active == undefined ? true : this.active;
    }
}