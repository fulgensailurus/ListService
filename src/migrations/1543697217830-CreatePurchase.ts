import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

const TABLE_NAME = 'purchases';

export class CreatePurchase1543697217830 implements MigrationInterface {

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
          name: 'quantity',
          type: 'int',
        }, {
          name: 'amount',
          type: 'varchar',
          length: '32',
          isNullable: true,
        }, {
          name: 'itemId',
          type: 'varchar',
          length: '36',
        }, {
          name: 'listId',
          type: 'varchar',
          length: '36',
        },
      ],
    }));

    await queryRunner.createForeignKey(TABLE_NAME, new TableForeignKey({
      columnNames: ['itemId'],
      referencedColumnNames: ['id'],
      referencedTableName: 'items',
      onDelete: 'CASCADE',
    }));

    await queryRunner.createForeignKey(TABLE_NAME, new TableForeignKey({
      columnNames: ['listId'],
      referencedColumnNames: ['id'],
      referencedTableName: 'lists',
      onDelete: 'CASCADE',
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    const table = await queryRunner.getTable(TABLE_NAME);
    const listForeignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf('listId') !== -1);
    const itemForeignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf('itemId') !== -1);
    await queryRunner.dropForeignKey(TABLE_NAME, listForeignKey);
    await queryRunner.dropForeignKey(TABLE_NAME, itemForeignKey);
    await queryRunner.dropTable(TABLE_NAME);
  }
}
