import { MigrationInterface, QueryRunner, Table } from "typeorm";

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
                ]
            }
            )
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
