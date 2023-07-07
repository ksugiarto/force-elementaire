import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from '../db-config';
import ModelExtended from "../model-extended";
import Hotel from "../hotel/hotel.model";

interface HotelCategorySchema {
  id: number;
  isActive: boolean;
  name: string;
}

class HotelCategory extends ModelExtended<HotelCategory> implements HotelCategorySchema {
  public id!: number
  public isActive!: boolean
  public name!: string
}

HotelCategory.init({
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
});

// HotelCategory.hasMany(Hotel, {
//   foreignKey: {
//     name: 'hotelCategoryId'
//   }
// });

export interface HotelCategoryInput extends Optional<HotelCategorySchema, 'id'> {}
export interface HotelCategoryOutput extends Required<HotelCategorySchema> {}
export default HotelCategory;
