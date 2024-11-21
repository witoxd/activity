import { Model, DataTypes } from "sequelize";
import {database} from "../database/db";
import { RoleUser } from "./RoleUser";
import { Permission } from "./Permission";

export class Role extends Model {
  public id!: number;
  public name!: string;
  public is_active!: boolean;
}

export interface RoleI {
    id?: number;
    name: string;
    is_active: boolean;
  }

Role.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  },
  {
    tableName: "roles",
    sequelize: database,
    timestamps: false
  }
);

// Relacion con RoleUser

Role.hasMany(RoleUser, {
  foreignKey: 'role_id',
  onDelete: 'RESTRICT',
  // onUpdate: 'RESTRICT'
});
RoleUser.belongsTo(Role, {
  foreignKey: 'role_id'
});

// Relacion con Permission

Role.hasMany(Permission, {
  foreignKey: 'role_id',
  onDelete: 'RESTRICT',
  // onUpdate: 'RESTRICT'
});
Permission.belongsTo(Role, {
  foreignKey: 'role_id'
});



