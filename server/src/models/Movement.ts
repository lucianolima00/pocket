import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    TableInheritance,
    UpdateDateColumn
} from "typeorm";
import {IsCurrency, IsDate, IsDecimal} from "class-validator";

export enum MovementType {
    CREDIT,
    DEBIT
}

@Entity()
@TableInheritance({column: { name: "relatedTo", type: "varchar"}})
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
        enum: MovementType,
        nullable: false
    })
    type: number;

    @Column()
    active: boolean;

    @CreateDateColumn()
    @IsDate()
    created_at: Date;

    @UpdateDateColumn()
    @IsDate()
    updated_at: Date;
}
