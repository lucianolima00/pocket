import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    TableInheritance,
    UpdateDateColumn
} from "typeorm";
import {IsCurrency, IsDate, IsDecimal} from "class-validator";
import {ExpensePaymentMode, BillingType} from "../helpers/MovementEnums";

@Entity()
@TableInheritance({column: { name: "type", type: "varchar"}})
export class Movement {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column({type: "date", nullable: false})
    date: Date;

    @Column({type: "double", nullable: false})
    @IsDecimal()
    @IsCurrency()
    value: number;

    @Column({type: "varchar", nullable: false})
    description: string;

    @Column({
        type: "enum",
        enum: BillingType,
        nullable: false
    })
    billingType: BillingType;

    @Column({
        type: "enum",
        enum: ExpensePaymentMode,
        default: ExpensePaymentMode.IN_CASH
    })
    paymentMode: ExpensePaymentMode;

    @Column({type: "int", default: 1})
    installmentNumber: number;

    @Column()
    active: boolean;

    @CreateDateColumn()
    @IsDate()
    created_at: Date;

    @UpdateDateColumn()
    @IsDate()
    updated_at: Date;

    constructor() {
        this.paymentMode = this.paymentMode == undefined ? ExpensePaymentMode.IN_CASH : this.paymentMode;
        this.installmentNumber = this.installmentNumber == undefined ? 1 : this.installmentNumber;
        this.active = this.active == undefined ? true : this.active;
    }
}
