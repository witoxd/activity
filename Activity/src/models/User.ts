import { Model, DataTypes } from "sequelize";
import {database} from "../database/db";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { RoleUser } from "./RoleUser";

export class User extends Model {
  id!: number;
  public username!: string;
  public email!: string;
  public password!: string;
  public is_active!: boolean;
  public avatar!: string;

  public async checkPassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

  public generateToken(): string {
    return jwt.sign({ id: this.id }, process.env.JWT_SECRET || 'secret', {
      expiresIn: '1m',
    });
  }

  public generateRefreshToken(): { token: string, expiresAt: Date } {
    // const expiresIn = '24H';
    const expiresIn = '1m';
    const token = jwt.sign({ id: this.id }, process.env.JWT_SECRET || 'secret', {
      expiresIn,
    });
    const expiresAt = new Date(Date.now() + 1 * 60 * 1000); // 10 minutos
    // const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 horas
    return { token, expiresAt };
  }
}


export interface UserI {
  id?: number;
  username: string;
  email: string;
  password: string;
  is_active: boolean;
  avatar?: string;
}

User.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
  {
    tableName: "users",
    sequelize: database,
    timestamps: false,
    hooks: {
      beforeCreate: async (user: User) => {
        if (user.password) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
      beforeUpdate: async (user: User) => {
        if (user.password) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      }
    }
  }
);

User.hasMany(RoleUser, {
  foreignKey: 'user_id',
  onDelete: 'RESTRICT',
});
RoleUser.belongsTo(User, {
  foreignKey: 'user_id'
});