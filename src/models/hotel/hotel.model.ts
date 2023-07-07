import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from '../db-config';
import ModelExtended from "../model-extended";
import HotelCategory from "../hotel-category/hotel-category.model";

interface HotelSchema {
  id: number;
  isActive: boolean;
  code: number;
  // hotelCategoryId: number;
}

class Hotel extends ModelExtended<Hotel> implements HotelSchema {
  public id!: number
  public isActive!: boolean
  public code!: number
  // public hotelCategoryId!: number;
}

Hotel.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  isActive: DataTypes.BOOLEAN,
  code: DataTypes.INTEGER,
  hotelCategoryId: {
    type: DataTypes.INTEGER,
    references: { model: 'HotelCategories', key: 'id' },
  }
}, {
  timestamps: true,
  sequelize: sequelizeConnection
})

Hotel.belongsTo(HotelCategory);

export interface HotelInput extends Optional<HotelSchema, 'id'> {}
export interface HotelOutput extends Required<HotelSchema> {}
export default Hotel;
