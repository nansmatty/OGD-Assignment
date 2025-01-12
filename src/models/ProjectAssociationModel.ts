import { DataTypes, Model, Optional } from 'sequelize';
import { pgSequelize } from '../config/dbConnect';

interface ProjectAssociationAttributes {
  user_id: number;
  project_id: number;
}

type ProjectAssociationCreationAttributes = Optional<ProjectAssociationAttributes, 'user_id' | 'project_id'>;

class ProjectAssociationModel extends Model<ProjectAssociationAttributes, ProjectAssociationCreationAttributes> implements ProjectAssociationAttributes {
  public user_id!: number;
  public project_id!: number;
}

ProjectAssociationModel.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    project_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'projects',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  },
  {
    sequelize: pgSequelize,
    modelName: 'ProjectAssociation',
    tableName: 'projectassociations',
    timestamps: false,
  }
);

export const ProjectAssociation = ProjectAssociationModel;
