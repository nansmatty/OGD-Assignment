import { QueryInterface, Sequelize } from 'sequelize';
import { User } from '../models';

export default {
  async up(queryInterface: QueryInterface, _Sequelize: Sequelize) {
    const users = await User.findAll();
    await queryInterface.bulkInsert('projects', [
      {
        name: 'Project Alpha',
        description: 'Description for project 1',
        user_id: users[0].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Project Beta',
        description: 'Description for project 2',
        user_id: users[users.length - 3].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Project Gamma',
        description: 'Description for project 3',
        user_id: users[users.length - 2].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Project Delta',
        description: 'Description for project 4',
        user_id: users[users.length - 1].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface: QueryInterface, _Sequelize: Sequelize) {
    await queryInterface.bulkDelete('projects', {
      name: ['Project Alpha', 'Project Beta', 'Project Gamma', 'Project Delta'],
    });
  },
};
