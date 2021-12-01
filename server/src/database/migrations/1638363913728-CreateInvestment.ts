import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateInvestment1638363913728 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "investment",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isGenerated: true,
                        generationStrategy: "increment",
                        isPrimary: true
                    },
                    {
                        name: "date",
                        type: "date"
                    },
                    {
                        name: "value",
                        type: "double",
                    },
                    {
                        name: "bankAccountId",
                        type: "int",
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
                    }
                ]
            })
        , true);

        await queryRunner.createForeignKey("investment", new TableForeignKey(
            {
                name: "fkInvestmentToBankAccount",
                columnNames: ["bankAccountId"],
                referencedColumnNames: ["id"],
                referencedTableName: "bank_account",
                onUpdate: "CASCADE",
                onDelete: "CASCADE"
            }
        ));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("investment", 'fkInvestmentToBankAccount');

        await queryRunner.dropTable('investment');
    }

}
