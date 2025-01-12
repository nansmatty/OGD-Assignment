import { ProjectAssociation } from './ProjectAssociationModel';
import { Project } from './ProjectModel';
import { Task } from './TaskModel';
import { User } from './UserModel';

User.belongsToMany(Project, { through: ProjectAssociation, onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Project.belongsToMany(User, { through: ProjectAssociation, onDelete: 'CASCADE', onUpdate: 'CASCADE' });

Project.hasMany(Task, { foreignKey: 'project_id' });
Task.belongsTo(Project, { foreignKey: 'project_id' });

export { User, Project, Task, ProjectAssociation };
