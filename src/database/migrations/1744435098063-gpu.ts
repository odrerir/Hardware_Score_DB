import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Gpu1744435098063 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(
            new Table({
                name: "gpus",
                columns: [
                    {
                        name: "gpuId",
                        type: "uuid",
                        isPrimary: true,
                    }
                    ,
                    {
                        name: "Product_Name",
                        type: "varchar",
                    },
                    {
                        name: "Released",
                        type: "varchar",
                    },
                    {
                        name: "Memory",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "GPU_clock",
                        type: "varchar",
                        isNullable: false,
                    },
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
