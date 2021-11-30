import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class UpdateBankAccount1638287386068 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns('bank_account', [
            new TableColumn({
                name: "balance",
                type: "double",
                default: 0.0
            }),
            new TableColumn({
                name: "investmentTypeId",
                type: "int",
            }),
            new TableColumn({
                name: "percentage",
                type: "int",
            }),
        ]);

        await queryRunner.createForeignKey("bank_account", new TableForeignKey(
            {
                name: "fkBankAccountToInvestmentType",
                columnNames: ["investmentTypeId"],
                referencedColumnNames: ["id"],
                referencedTableName: "investment_type",
                onUpdate: "CASCADE",
                onDelete: "CASCADE"
            }
        ));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("bank_account", 'fkBankAccountToInvestmentType');

        await queryRunner.dropColumns("bank_account", [
            "balance",
            "investmentTypeId",
            "percentage"
        ]);
    }
}
