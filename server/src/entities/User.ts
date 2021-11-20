import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate } from "typeorm";
import { IsEmail } from 'class-validator'
import bcrypt  from 'bcryptjs';

@Entity("user")
export class User {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({type: "varchar", nullable: false})
    name: string;

    @Column({type: "varchar", nullable: false})
    cpf_cnpj: string;

    @Column({type: "varchar", nullable: false})
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
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword(){
        this.password = bcrypt.hashSync(this.password, 10);
    }

    constructor() {
        this.active = this.active == undefined ? this.active : true
    }
}