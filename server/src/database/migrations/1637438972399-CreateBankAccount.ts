import {MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateBankAccount1637438972399 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                    name: 'bank_account',
                    columns: [
                        {
                            name: 'id',
                            type: 'int',
                            isGenerated: true,
                            generationStrategy: 'increment',
                            isPrimary: true
                        },
                        {
                            name: 'name',
                            type: 'varchar'
                        },
                        {
                            name: 'type',
                            type: 'varchar'
                        },
                        {
                            name: 'bankId',
                            type: 'int'
                        },
                        {
                            name: 'agency',
                            type: 'varchar'
                        },
                        {
                            name: 'account',
                            type: 'varchar'
                        },
                        {
                            name: 'credit_limit',
                            type: 'double'
                        },
                        {
                            name: 'userId',
                            type: 'int'
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
                }
            )
        ,true);

        await queryRunner.createForeignKey("bank_account", new TableForeignKey({
            columnNames:["bankId"],
            referencedColumnNames: ["id"],
            referencedTableName: "bank",
            onUpdate: "CASCADE",
            onDelete: "CASCADE"
        }));

        await queryRunner.createForeignKey("bank_account", new TableForeignKey({
            columnNames:["userId"],
            referencedColumnNames: ["id"],
            referencedTableName: "user",
            onUpdate: "CASCADE",
            onDelete: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const bankAccount = await queryRunner.getTable("bank_account");
        const foreignKeys = bankAccount.foreignKeys;
        await queryRunner.dropForeignKeys("bank_account", foreignKeys)

        await queryRunner.dropTable('bank_account');
    }

}
