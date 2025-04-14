import { MigrationInterface, QueryRunner , Table} from "typeorm";

export class Processors1744435078794 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        new Table({
            name: "processors",
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    isPrimary: true,
                },
                {
                    name: "name",
                    type: "varchar",
                    isNullable: false,
                },
                {
                    name: "cores",
                    type: "varchar",
                },
                {
                    name: "clock",
                    type: "varchar",
                },
                {
                    name: "tdp",
                    type: "varchar",
                    isNullable: false,
                },
                {
                    name: "release_date",
                    type: "varchar",
                    isNullable: false,
                },
            ]
        })
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
