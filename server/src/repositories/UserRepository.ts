import {EntityRepository, Repository} from "typeorm";
import { User } from "../models/User";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    /**
     * Get User using email or cpf_cnpj
     * @param email
     * @param cpf_cnpj
     */
    findByEmailOrCpfCnpj(email: string, cpf_cnpj: string) {
        return this.findOne({email, cpf_cnpj});
    }
}