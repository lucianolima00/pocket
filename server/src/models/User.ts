import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    BeforeInsert,
    BeforeUpdate,
    OneToMany
} from "typeorm";
import {IsDate, IsEmail} from 'class-validator'
import bcrypt  from 'bcryptjs';
import { BankAccount } from "./BankAccount";
import {Expense} from "./Expense";
import {Revenue} from "./Revenue";

@Entity()
export class User {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({type: "varchar", nullable: false})
    name: string;

    @Column({type: "varchar", nullable: false, unique: true})
    cpf_cnpj: string;

    @Column({type: "varchar", nullable: false, unique: true})
    @IsEmail()
    email: string;

    @Column({type: "varchar", nullable: false})
    password: string;

    @Column()
    birthdate: string;

    @Column()
    picture: string;

    @Column()
    active: boolean;

    @CreateDateColumn()
    @IsDate()
    created_at: Date;

    @UpdateDateColumn()
    @IsDate()
    updated_at: Date;

    @OneToMany(() => BankAccount, bankAccount => bankAccount.user)
    bankAccounts: BankAccount[]

    @OneToMany(() => Expense, expense => expense.user)
    expenses: Expense[]

    @OneToMany(() => Revenue, revenue => revenue.user)
    revenues: Revenue[]

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword(){
        this.password = bcrypt.hashSync(this.password, 10);
    }

    constructor() {
        this.active = this.active == undefined ? true : this.active;
    }
}