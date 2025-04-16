import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Processors1744435078794 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(
            new Table({
                name: "cpus",
                columns: [
                    {
                        name: "cpuId",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "product_name",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "cores",
                        type: "varchar",
                    },
                    {
                        name: "clock",
                        type: "float",
                    },
                    {
                        name: "tdp",
                        type: "float",
                        isNullable: false,
                    },
                    {
                        name: "release_date",
                        type: "date",
                        isNullable: false,
                    },
                ],
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("cpus");
    }

}
