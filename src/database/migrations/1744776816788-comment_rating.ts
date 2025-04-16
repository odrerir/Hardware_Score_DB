import { MigrationInterface, QueryRunner, Table} from "typeorm";

export class CommentRating1744776816788 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "review_ratings",
                columns: [{
                        name: "commentid",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "userId",
                        type: "uuid"
                    },
                    {
                        name: "reviewId",
                        type: "uuid"
                    },
                    {
                        name: "rating",
                        type: "int"
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
                        name: "FK_review_rating_review",
                        columnNames: ["reviewId"],
                        referencedTableName: "reviews",
                        referencedColumnNames: ["reviewId"],
                        onDelete: "CASCADE",
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
