import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from '../db-config';
import ModelExtended from "../model-extended";
import Activity from "../activity/activity.model";

interface ActivityTypeSchema {
  id: number;
  isActive: boolean;
  name: string;
}

class ActivityType extends ModelExtended<ActivityType> implements ActivityTypeSchema {
  public id!: number
  public isActive!: boolean
  public name!: string
}

ActivityType.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  isActive: DataTypes.BOOLEAN,
  name: DataTypes.STRING
}, {
  timestamps: true,
  sequelize: sequelizeConnection
})

// ActivityType.belongsToMany(Activity, {
//   through: 'ActivityHasType',
//   onDelete: 'RESTRICT'
// });

export interface ActivityTypeInput extends Optional<ActivityTypeSchema, 'id'> {}
export interface ActivityTypeOutput extends Required<ActivityTypeSchema> {}
export default ActivityType;
