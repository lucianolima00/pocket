import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateInvestment1638198427548 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.createTable(
            new Table(
                {
                    name: "invesment",
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
                            type: "int",
                        }
                    ]
                }
            )
        , true)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
