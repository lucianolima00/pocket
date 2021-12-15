import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {IsBoolean, isBoolean, IsCurrency, IsDate, IsDecimal} from "class-validator";
import {BankAccount} from "./BankAccount";

@Entity()
export class Investment {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column({type: "double", nullable: false})
    @IsDecimal()
    @IsCurrency()
    value: number;

    @Column({type: "date", nullable: false})
    @IsDate()
    date: Date;

    @ManyToOne(() => BankAccount, bankAccount => bankAccount.investments)
    bankAccount: BankAccount;

    @CreateDateColumn()
    @IsDate()
    created_at: Date;

    @UpdateDateColumn()
    @IsDate()
    updated_at: Date;
}
