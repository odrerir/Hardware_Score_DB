import { MigrationInterface, QueryRunner, Table } from "typeorm";

const TABLE_NAME = "favorites";

export class Favorites1744515730742 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "favorites",
                columns: [
                    {
                        name: "favoritesId",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "userId",
                        type: "uuid",
                    },
                    {
                        name: "gpuId",
                        type: "uuid",
                        isNullable: true,
                    },
                    {
                        name: "cpuId",
                        type: "uuid",
                        isNullable: true,
                    },
                ],
                foreignKeys: [
                    {
                    name: "FK_favorites_user",
                    columnNames: ["userId"],
                    referencedTableName: "users",
                    referencedColumnNames: ["userId"],
                    },
                    {
                    name: "FK_favorites_gpu_id",
                    columnNames: ["gpuId"],
                    referencedTableName: "gpus",
                    referencedColumnNames: ["gpuId"],
                    },
                    {
                    name: "FK_favorites_cpu_id",
                    columnNames: ["cpuId"],
                    referencedTableName: "cpus",
                    referencedColumnNames: ["cpuId"],
                    },
                ]
            }
            )
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("favorites");
    }

}
