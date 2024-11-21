import { Model, DataTypes } from "sequelize";
import { database } from "../database/db";

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from "./User";

export class RefreshToken extends Model {
  id!: number;
  public user_id!: number;
  public token!: string;
  public device_info!: string;
  public is_valid!: boolean;
  public expires_at!: Date;
  public created_at!: Date;
  public updated_at!: Date;
  
}

export interface RefreshTokenI {
  user_id?: number;
  token: string;
  device_info: string;
  is_valid: boolean;
  expires_at: Date;
  created_at: Date;
  updated_at: Date;
  
}

RefreshToken.init(
  {
    token: {
      type: DataTypes.STRING,
      allowNull: false
    },
    device_info: {
      type: DataTypes.STRING,
      allowNull: false
    },
    is_valid: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    expires_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  },
  {
    tableName: "refresh_tokens",
    sequelize:  database,
    timestamps: false,
    hooks: {
      beforeCreate: (refreshToken: RefreshToken) => {
        const currentDate = new Date();
        refreshToken.created_at = currentDate;
        refreshToken.updated_at = currentDate;
      },
      beforeUpdate: (refreshToken: RefreshToken) => {
        const currentDate = new Date();
        refreshToken.updated_at = currentDate;
      }
    }
  }
);

User.hasMany(RefreshToken, {
  foreignKey: 'user_id',
  onDelete: 'RESTRICT',
});
RefreshToken.belongsTo(User, {
  foreignKey: 'user_id'
});