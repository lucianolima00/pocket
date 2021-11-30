import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateTransference1638198427548 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.createTable(
            new Table(
                {
                    name: "transference",
                    columns: [
                        {
                            name: "id",
                            type: "int",
                            isGenerated: true,
                            generationStrategy: "increment",
                            isPrimary: true
                        },
                        {
                            name: "value",
                            type: "double",
                        },
                        {
                            name: "date",
                            type: "date",
                        },
                        {
                            name: "fromBankAccountId",
                            type: "int",
                        },
                        {
                            name: "toBankAccountId",
                            type: "int",
                        },
                        {
                            name: "userId",
                            type: "int",
                        }
                    ]
                }
            )
        , true);

        await queryRunner.createForeignKey("transference", new TableForeignKey(
            {
                name: "fkTransferenceToBankAccount",
                columnNames: ["fromBankAccountId"],
                referencedColumnNames: ["id"],
                referencedTableName: "bank_account",
                onUpdate: "CASCADE",
                onDelete: "CASCADE"
            }
        ));

        await queryRunner.createForeignKey("transference", new TableForeignKey(
            {
                name: "fkTransferenceToBankAccount2",
                columnNames: ["toBankAccountId"],
                referencedColumnNames: ["id"],
                referencedTableName: "bank_account",
                onUpdate: "CASCADE",
                onDelete: "CASCADE"
            }
        ));

        await queryRunner.createForeignKey("transference", new TableForeignKey(
            {
                name: "fkTransferenceToUser",
                columnNames: ["userId"],
                referencedColumnNames: ["id"],
                referencedTableName: "user",
                onUpdate: "CASCADE",
                onDelete: "CASCADE"
            }
        ));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const transference = await queryRunner.getTable("transference");
        const foreignKeys = transference.foreignKeys;
        await queryRunner.dropForeignKeys("transference", foreignKeys);

        await queryRunner.dropTable("transference");
    }

}
