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
                }
                ,
                {
                    name: "core",
                    type: "varchar",
                },
                {
                    name: "threads",
                    type: "varchar",
                },
                {
                    name: "name",
                    type: "varchar",
                    isNullable: false,
                },
                {
                    name: "launch_date",
                    type: "varchar",
                    isNullable: false,
                },
            ]
        })
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
