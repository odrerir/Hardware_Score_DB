import { MigrationInterface, QueryRunner, Table} from "typeorm";

export class Reviews1744775462491 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "reviews",
                columns: [
                    {
                        name: "reviewId",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "userId",
                        type: "uuid",
                    },
                    {
                        name: "cpuId",
                        type: "uuid",
                    },
                    {
                        name: "gpuId",
                        type: "uuid",
                    },
                    {
                        name: "comment",
                        type: "text",
                    },
                    {
                        name: "rating",
                        type: "int",
                    },
                ],
                foreignKeys: [
                    {
                        name: "FK_reviews_user",
                        columnNames: ["userId"],
                        referencedTableName: "users",
                        referencedColumnNames: ["userId"],
                        onDelete: "CASCADE",
                    },
                    {
                        name: "FK_reviews_cpu",
                        columnNames: ["cpuId"],
                        referencedTableName: "cpus",
                        referencedColumnNames: ["cpuId"],
                        onDelete: "CASCADE",
                    },
                    {
                        name: "FK_reviews_gpu",
                        columnNames: ["gpuId"],
                        referencedTableName: "gpus",
                        referencedColumnNames: ["gpuId"],
                        onDelete: "CASCADE",
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("reviews");
    }

}
