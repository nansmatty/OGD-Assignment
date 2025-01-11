import { QueryInterface, Sequelize, DataTypes } from 'sequelize';

export default {
  async up(queryInterface: QueryInterface, _Sequelize: Sequelize) {
    await queryInterface.createTable('projects', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
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
    await queryInterface.dropTable('projects');
  },
};
