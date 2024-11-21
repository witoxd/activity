import { Model, DataTypes } from 'sequelize';
import { database } from '../database/db';
import { User } from './User';
export class Activity extends Model {

  public date_act!: Date;
  public description!: string;
  public name!: string;
  public UserId!: number;

}

export interface ActivityI {
  date_act: Date;
  description: string;
  name: string;
  UserId: number;
}

Activity.init(
  {

    date_act: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'Activitys',
    sequelize: database,
    timestamps: false,
  }
);

Activity.belongsTo(User,{foreignKey:"UserId"})
