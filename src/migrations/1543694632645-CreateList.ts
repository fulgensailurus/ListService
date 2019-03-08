import { MigrationInterface, QueryRunner, Table } from 'typeorm';

const TABLE_NAME = 'lists';

export class CreateList1543694632645 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(new Table({
      name: TABLE_NAME,
      columns: [
        {
          name: 'id',
          type: 'varchar',
          length: '36',
          isPrimary: true,
          generationStrategy: 'uuid',
        }, {
          name: 'owner',
          type: 'varchar',
          length: '36',
          isPrimary: false,
        },
      ],
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable(TABLE_NAME);
  }
}
