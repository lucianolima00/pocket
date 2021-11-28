import {Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {IsDate} from "class-validator";
import {Expense} from "./Expense";
import {Revenue} from "./Revenue";

@Entity("category")
export class Category {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({type: 'varchar', nullable: false})
    name: string;

    @Column({type: 'varchar', nullable: false})
    relatedTo: string;

    @Column()
    active: boolean;

    @CreateDateColumn()
    @IsDate()
    created_at: Date;

    @UpdateDateColumn()
    @IsDate()
    updated_at: Date;

    @OneToMany(() => Expense, expense => expense.category)
    expenses: Expense[]

    @OneToMany(() => Revenue, revenue => revenue.category)
    revenues: Revenue[]

    constructor() {
        this.active = this.active == undefined ? true : this.active;
    }
}
