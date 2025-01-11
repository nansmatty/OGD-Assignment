import { QueryInterface, Sequelize } from 'sequelize';
import bcrypt from 'bcryptjs';

export default {
  async up(queryInterface: QueryInterface, _Sequelize: Sequelize) {
    const saltRound = 10;

    const hashedPassword1 = await bcrypt.hash('123456', saltRound);
    const hashedPassword2 = await bcrypt.hash('1234567', saltRound);

    await queryInterface.bulkInsert('users', [
      {
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: hashedPassword1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        password: hashedPassword2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'John Smith',
        email: 'john.smith@example.com',
        password: hashedPassword2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
        password: hashedPassword1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface: QueryInterface, _Sequelize: Sequelize) {
    await queryInterface.bulkDelete('users', {
      email: ['john.doe@example.com', 'jane.smith@example.com', 'john.smith@example.com', 'jane.doe@example.com'],
    });
  },
};
