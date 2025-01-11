import { QueryInterface, Sequelize, DataTypes } from 'sequelize';

export default {
  async up(queryInterface: QueryInterface, _sequelize: Sequelize) {
    await queryInterface.createTable('UserProject', {
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      project_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'projects',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
    });

    await queryInterface.addConstraint('tasks', {
      fields: ['project_id'],
      type: 'foreign key',
      name: 'tasks_project_id_fkey',
      references: {
        table: 'projects',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  },
  async down(queryInterface: QueryInterface, _sequelize: Sequelize) {
    await queryInterface.dropTable('UserProject');
    await queryInterface.removeColumn('tasks', 'project_id');
  },
};
