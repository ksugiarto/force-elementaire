import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from '../db-config';
import ModelExtended from "../model-extended";
import ActivityType from "../activity-type/activity-type.model";

// interface ActivitySchema {
//   id: number;
//   isActive: boolean;
//   name: string;
// }

class Activity extends ModelExtended<Activity> {
  public id!: number
  public isActive!: boolean
  public name!: string
}

// class Activity extends ModelExtended<Activity> implements ActivitySchema {
//   public id!: number
//   public isActive!: boolean
//   public name!: string
// }

Activity.init({
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

// HOOKS

Activity.beforeCreate((x: Activity) => {
  if (x.name === 'test') {
    x.name = 'Updated in beforeCreate';
  }
})

// ASSOCIATIONS

Activity.belongsToMany(ActivityType, {
  through: 'ActivityHasType',
  onDelete: 'RESTRICT'
});

export type ActivityInput = Omit<Activity, 'id'>;
// export interface ActivityInput extends Optional<ActivitySchema, 'id'> {}
// export interface ActivityOutput extends Required<ActivitySchema> {}
export default Activity;
