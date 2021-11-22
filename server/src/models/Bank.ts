import {Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {BankAccount} from "./BankAccount";
import {IsDate} from "class-validator";

@Entity('bank')
export class Bank {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({type: "varchar", nullable: false})
    name: string;

    @Column({type: "varchar", nullable: false, unique: true})
    number: string;

    @Column()
    active: boolean;

    @CreateDateColumn()
    @IsDate()
    created_at: Date;

    @UpdateDateColumn()
    @IsDate()
    updated_at: Date;

    @OneToMany(() => BankAccount, bankAccount => bankAccount.bank)
    bankAccounts: BankAccount[]

    constructor() {
        this.active = this.active == undefined ? true : this.active;
    }
}