import { MigrationInterface, QueryRunner } from 'typeorm';

/* eslint-disable max-len */
export class Users1657672332904 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO users (uuid, firstname, lastname, email, username, password, status)
      VALUES ('ssssss', 'Alex', 'Serenko', 'alex@fafn.ru', 'alex@fafn.ru', '$2b$10$A4x21zZO7IKU59ScZNozee7ndO1MXcDXkaZ8h3oTI65D7qRPDatTO', 'verified');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM users WHERE email = 'alex@fafn.ru';`);
  }
}
