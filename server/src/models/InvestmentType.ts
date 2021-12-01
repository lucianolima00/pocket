import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {IsCurrency, IsDate, IsDecimal} from "class-validator";
import {BankAccount} from "./BankAccount";

@Entity()
export class InvestmentType {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column({type: "varchar", nullable: false})
    name: string;

    @Column({type: "varchar", nullable: false})
    code: string;

    @Column()
    active: boolean;

    @CreateDateColumn()
    @IsDate()
    created_at: Date;

    @UpdateDateColumn()
    @IsDate()
    updated_at: Date;

    @OneToMany(() => BankAccount, bankAccount => bankAccount.investmentType)
    bankAccounts: BankAccount[];

    constructor() {
        this.active = this.active == undefined ? true : this.active;
    }
}
