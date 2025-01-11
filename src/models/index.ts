import { Project } from './ProjectModel';
import { Task } from './TaskModel';
import { User } from './UserModel';

User.belongsToMany(Project, { through: 'UserProject' });
Project.belongsToMany(User, { through: 'UserProject' });

Project.hasMany(Task, { foreignKey: 'project_id' });
Task.belongsTo(Project, { foreignKey: 'project_id' });

export { User, Project, Task };
