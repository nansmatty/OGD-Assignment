import { DataTypes, Model, Optional } from 'sequelize';
import { pgSequelize } from '../config/dbConnect';
import { User } from './UserModel';

interface ProjectAttributes {
  id: number;
  name: string;
  description: string;
  user_id: number;
  createdAt?: Date;
  updatedAt?: Date;
}

type ProjectCreationAttributes = Optional<ProjectAttributes, 'id'>;

class ProjectModel extends Model<ProjectAttributes, ProjectCreationAttributes> implements ProjectAttributes {
  public id!: number;
  public name!: string;
  public description!: string;
  public user_id!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

ProjectModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
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
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
  },
  {
    sequelize: pgSequelize,
    modelName: 'Project',
    tableName: 'projects',
  }
);

ProjectModel.belongsTo(User, { foreignKey: 'user_id' });

export const Project = ProjectModel;
