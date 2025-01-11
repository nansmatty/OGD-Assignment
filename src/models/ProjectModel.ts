import { DataTypes, Model, Optional } from 'sequelize';
import { pgSequelize } from '../config/dbConnect';

interface ProjectAttributes {
  id: number;
  name: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}

type ProjectCreationAttributes = Optional<ProjectAttributes, 'id'>;

class ProjectModel extends Model<ProjectAttributes, ProjectCreationAttributes> implements ProjectAttributes {
  public id!: number;
  public name!: string;
  public description!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

ProjectModel.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: pgSequelize,
    modelName: 'Project',
    tableName: 'projects',
  }
);

export const Project = ProjectModel;
