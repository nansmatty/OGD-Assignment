import { QueryInterface, Sequelize } from 'sequelize';

export default {
  async up(queryInterface: QueryInterface, _Sequelize: Sequelize) {
    await queryInterface.bulkInsert(
      'tasks',
      [
        {
          title: 'Task 1 Alpha Project',
          description: 'Description 1',
          status: 'TODO',
          project_id: 1, // Assuming project_id 1 exists
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Task 2 Beta Project',
          description: 'Description 2',
          status: 'TODO',
          project_id: 2, // Assuming project_id 2 exists
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Task 3 Alpha Project',
          description: 'Description 3',
          status: 'IN-PROGRESS',
          project_id: 1, // Assuming project_id 1 exists
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Task 4 Beta Project',
          description: 'Description 2',
          status: 'IN-PROGRESS',
          project_id: 2, // Assuming project_id 2 exists
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Task 5 Alpha Project',
          description: 'Description 3',
          status: 'DONE',
          project_id: 1, // Assuming project_id 1 exists
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Task 6 Delta Project',
          description: 'Description 2',
          status: 'IN-PROGRESS',
          project_id: 3, // Assuming project_id 3 exists
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Task 7 Delta Project',
          description: 'Description 3',
          status: 'DONE',
          project_id: 3, // Assuming project_id 3 exists
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface: QueryInterface, _Sequelize: Sequelize) {
    await queryInterface.bulkDelete('tasks', {
      title: ['Task 1 Alpha Project', 'Task 2 Beta Project', 'Task 3 Alpha Project', 'Task 4 Beta Project', 'Task 5 Alpha Project', 'Task 6 Delta Project', 'Task 7 Delta Project'],
    });
  },
};
