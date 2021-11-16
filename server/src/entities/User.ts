import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("user")
export class User {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column()
    cpf_cnpj: string;

    @Column()
    birthdate: string;

    @Column()
    picture: string;

    @Column()
    active: boolean;

    constructor() {
        this.active = this.active == undefined ? this.active : true
    }

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}