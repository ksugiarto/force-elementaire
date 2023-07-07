import Hotel from '../models/hotel/hotel.model';
import Activity from '../models/activity/activity.model';
import ActivityType from '../models/activity-type/activity-type.model';
import HotelCategory from './hotel-category/hotel-category.model';

const dbInit = () => {
  Hotel.sync({ alter: true });
  HotelCategory.sync({ alter: true });
  Activity.sync({ alter: true });
  ActivityType.sync({ alter: true });
}

export default dbInit;
