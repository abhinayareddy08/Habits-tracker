import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddStreakToUsers1712400000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE users ADD COLUMN currentStreak INT NOT NULL DEFAULT 0`,
    );
    await queryRunner.query(
      `ALTER TABLE users ADD COLUMN longestStreak INT NOT NULL DEFAULT 0`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE users DROP COLUMN currentStreak`);
    await queryRunner.query(`ALTER TABLE users DROP COLUMN longestStreak`);
  }
}
