# Project Management System

## Description

A backend API for a Project Management System that allows managing users, projects, and tasks. The system supports authentication, authorization, and relationships between users, projects, and tasks. This API is fully documented and deployed.

## Key Features

- **User Authentication**: Register, login, and logout functionality with JWT-based authentication.
- **Project Management**: Create, update, delete, and view projects.
- **Task Management**: Create, update, delete, and view tasks.
- **User-Project Association**: Assign users to projects and remove them.
- **Role-based Access**: Only project owners can update or delete their projects.
- **Swagger API Documentation**: Comprehensive API documentation for all routes.

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL (Sequelize ORM)
- **Authentication**: JWT (stored in cookies)
- **API Documentation**: Swagger (Swagger UI Express and Swagger JSDoc)
- **Logging**: Winston
- **Development Tools**: TypeScript, ESLint, Prettier, Nodemon, Husky

## Installation

1. Clone the repository

```bash
git clone https://github.com/nansmatty/OGD-Assignment.git
cd project-name
```

2. Install dependencies

```bash
npm install
```

3. Set up environment variables
   Create a `.env` file in the root directory and add the following:

```bash
NODE_ENV=development
PORT=6001
BASE_URL=http://localhost:6001

# Database
DB_URL=your-database-url

# Swagger
SWAGGER_TITLE=Project Management System API
SWAGGER_DESCRIPTION=API documentation for managing users, projects, and tasks.
SWAGGER_SERVER_DESCRIPTION=Local development server.

# JWT
JWT_SECRET_KEY=your-secret-key
JWT_EXPIRES_IN=1h

# Cookies
JWT_COOKIE_EXPIRES_IN=3600
```

4. Run the application

```bash
npm run dev
```

This will start the server on `http://localhost:6001`.

5. Access API Documentation
   Once the server is running, you can access the Swagger API documentation at:

```bash
http://localhost:6001/api-docs
```

## Routes

### Health-Check

- `GET /api/v1/health-check` : Get the API health check

### Authentication

- `POST /api/v1/auth/register`: Register a new user.
- `POST /api/v1/auth/login`: Log in with email and password.
- `POST /api/v1/auth/logout`: Log out the user.

### Users

- `POST /api/v1/users/get-all-users`: Get all users.
- `POST /api/v1/users/:id`: Get user by id.

### Projects

- `GET /api/v1/projects`: Get all projects.
- `POST /api/v1/projects/create-project`: Create a new project.
- `GET /api/v1/projects/:id`: Get a specific project by ID.
- `PUT /api/v1/projects/:id`: Update an existing project.
- `DELETE /api/v1/projects/:id`: Delete a project.

### Tasks

- `GET /api/v1/tasks`: Get all tasks.
- `POST /api/v1/tasks/create-task`: Create a new task.
- `GET /api/v1/tasks/:id`: Get a specific task by ID.
- `PUT /api/v1/tasks/:id`: Update a task.
- `DELETE /api/v1/tasks/:id`: Delete a task.
- `DELETE /api/v1/tasks/getAllTask/:project_id`: Delete a task.

### Project-User Association

- `GET /api/v1/associations/get-users/:project_id`: Get all users assigned to a project.
- `POST /api/v1/associations/assign-users/:project_id`: Assign users to a project.
- `DELETE /api/v1/associations/remove-users/:project_id`: Remove users from a project.

## Database Setup

### Migrations

Run the following command to apply database migrations:

```bash
npm run migration:run
```

### Seed Data

You can populate the database with sample data using:

```bash
npm run seed:run
```

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to the branch (`git push origin feature-name`).
6. Create a new Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
