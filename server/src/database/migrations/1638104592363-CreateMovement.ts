import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateMovement1638104592363 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table(
                {
                    name: "movement",
                    columns: [
                        {
                            name: "id",
                            type: "int",
                            isGenerated: true,
                            generationStrategy: "increment",
                            isPrimary:true,
                        },
                        {
                            name: "type",
                            type: "varchar",
                        },
                        {
                            name: "date",
                            type: "date"
                        },
                        {
                            name: "value",
                            type: "double"
                        },
                        {
                            name: "description",
                            type: "varchar"
                        },
                        {
                            name: "billingType",
                            type: "int",
                        },
                        {
                            name: "paymentMode",
                            type: "int",
                        },
                        {
                            name: "installmentNumber",
                            type: "int",
                        },
                        {
                            name: 'categoryId',
                            type: 'int'
                        },
                        {
                            name: 'bankAccountId',
                            type: 'int'
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
                        }
                    ]
                }
            ),
        true);

        await queryRunner.createForeignKey("movement", new TableForeignKey(
            {
                columnNames: ["bankAccountId"],
                referencedColumnNames: ["id"],
                referencedTableName: "bank_account",
                onUpdate: "CASCADE",
                onDelete: "CASCADE"
            }
        ));

        await queryRunner.createForeignKey("movement", new TableForeignKey(
            {
                columnNames: ["categoryId"],
                referencedColumnNames: ["id"],
                referencedTableName: "category",
                onUpdate: "CASCADE",
                onDelete: "CASCADE"
            }
        ));

        await queryRunner.createForeignKey("movement", new TableForeignKey(
            {
                columnNames: ["userId"],
                referencedColumnNames: ["id"],
                referencedTableName: "user",
                onUpdate: "CASCADE",
                onDelete: "CASCADE"
            }
        ));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const movement = await queryRunner.getTable("movement");
        const foreignKeys = movement.foreignKeys;
        await queryRunner.dropForeignKeys("movement", foreignKeys);

        await queryRunner.dropTable("movement");
    }
}
