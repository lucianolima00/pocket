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
                        isGenerated: true,
                        generationStrategy: 'increment',
                        isPrimary: true
                    },
                   {
                       name: "name",
                       type: "varchar",
                   },
                   {
                       name: "cpf_cnpj",
                       isUnique: true,
                       type: "varchar",
                   },
                   {
                       name: "email",
                       isUnique: true,
                       type: "varchar",
                   },
                   {
                       name: "password",
                       type: "varchar",
                   },
                   {
                       name: "birthdate",
                       type: "date",
                   },
                   {
                       name: "picture",
                       type: "varchar",
                   },
                   {
                       name: "active",
                       type: "tinyint",
                       default: 1
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
