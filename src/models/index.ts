import { Project } from './ProjectModel';
import { Task } from './TaskModel';
import { User } from './UserModel';

User.belongsToMany(Project, { through: 'projectassociation' });
Project.belongsToMany(User, { through: 'projectassociation' });

Project.hasMany(Task, { foreignKey: 'project_id' });
Task.belongsTo(Project, { foreignKey: 'project_id' });

export { User, Project, Task };
