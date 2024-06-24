import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterStatusTable1719254123397 implements MigrationInterface {
    name = 'AlterStatusTable1719254123397'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`transaction\` ADD \`status\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`transaction\` DROP COLUMN \`status\``);
    }

}
