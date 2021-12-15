import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateInvestmentType1638284211959 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.createTable(
            new Table(
                {
                    name: "investment_type",
                    columns: [
                        {
                            name: "id",
                            type: "int",
                            isGenerated: true,
                            generationStrategy: "increment",
                            isPrimary: true
                        },
                        {
                            name: "name",
                            type: "varchar",
                        },
                        {
                            name: "code",
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
                        }
                    ]
                }
            )
            , true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("investment_type");
    }
}
