import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateCategory1637662643704 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                    name: 'category',
                    columns: [
                        {
                            name: 'id',
                            type: 'int',
                            isGenerated: true,
                            generationStrategy: 'increment',
                            isPrimary: true,
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
            ), true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('category');
    }

}
