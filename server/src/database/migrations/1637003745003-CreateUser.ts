import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUser1637003745003 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
               name: "user",
               columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true
                    },
                   {
                       name: "name",
                       type: "varchar",
                   },
                   {
                       name: "birthdate",
                       type: "date",
                   },
                   {
                       name: "cpf_cnpj",
                       type: "varchar",
                   },
                   {
                       name: "picture",
                       type: "varchar",
                   },
                   {
                       name: "active",
                       type: "tinyint",
                   },
                   {
                       name: "created_at",
                       type: "timestamp",
                       default: "now()"
                   },
                   {
                       name: "updated_at",
                       type: "timestamp",
                       default: "now()"
                   },
               ]
            }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('user');
    }

}
