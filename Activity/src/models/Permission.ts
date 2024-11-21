import { Model, DataTypes } from "sequelize";
import {database} from "../database/db";



export class Permission extends Model {
  public id!: number;
  public name!: string;
  public role_id!: number;
}

export interface PermissionI {
    id?: number;
    name: string;
    role_id: number;
  }
  
  Permission.init(
    {
        name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    tableName: "permissions",
    sequelize: database,
    timestamps: false
  }
);

