import { DataTypes, Model, Optional } from 'sequelize';
import { pgSequelize } from '../config/dbConnect';
import { Project } from './ProjectModel';

interface TaskAttributes {
  id: number;
  title: string;
  description: string;
  status: string;
  project_id: number;
  createdAt?: Date;
  updatedAt?: Date;
}

type TaskCreationAttributes = Optional<TaskAttributes, 'id'>;

class TaskModel extends Model<TaskAttributes, TaskCreationAttributes> implements TaskAttributes {
  public id!: number;
  public title!: string;
  public description!: string;
  public status!: string;
  public project_id!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

TaskModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('TODO', 'IN-PROGRESS', 'DONE'),
      allowNull: false,
      defaultValue: 'TODO',
    },
    project_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Project,
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  },
  {
    sequelize: pgSequelize,
    modelName: 'Task',
    tableName: 'tasks',
  }
);

export const Task = TaskModel;
