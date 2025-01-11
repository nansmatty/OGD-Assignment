import { QueryInterface, Sequelize } from 'sequelize';

export default {
  async up(queryInterface: QueryInterface, _sequelize: Sequelize) {
    await queryInterface.bulkInsert('projectassociation', [
      {
        user_id: 1,
        project_id: 1,
      },
      {
        user_id: 2,
        project_id: 2,
      },
      {
        user_id: 1,
        project_id: 3,
      },
    ]);
  },
};
