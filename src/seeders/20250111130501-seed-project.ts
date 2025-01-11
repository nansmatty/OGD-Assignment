import { QueryInterface, Sequelize } from 'sequelize';

export default {
  async up(queryInterface: QueryInterface, _Sequelize: Sequelize) {
    await queryInterface.bulkInsert('projects', [
      {
        name: 'Project Alpha',
        description: 'Description for project 1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Project Beta',
        description: 'Description for project 2',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Project Delta',
        description: 'Description for project 3',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface: QueryInterface, _Sequelize: Sequelize) {
    await queryInterface.bulkDelete('projects', {
      name: ['Project Alpha', 'Project Beta', 'Project Delta'],
    });
  },
};
