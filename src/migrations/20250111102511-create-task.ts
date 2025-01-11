import { DataTypes, QueryInterface, Sequelize } from 'sequelize';

export default {
  async up(queryInterface: QueryInterface, _Sequelize: Sequelize) {
    await queryInterface.createTable('tasks', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM('TODO', 'IN-PROGRESS', 'DONE'),
        allowNull: false,
        defaultValue: 'TODO',
      },
      project_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    });
  },

  async down(queryInterface: QueryInterface, _Sequelize: Sequelize) {
    await queryInterface.dropTable('tasks');
  },
};
